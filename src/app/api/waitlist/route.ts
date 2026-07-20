import { NextResponse } from 'next/server';

const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzltQlQlhnQFQQSwOuLuwxkxvau0ani_eSiQWJo56BCUw-5Fgv0pa638RtDNQJKEo_4/exec';

export async function POST(request: Request) {
  try {
    const { name, phone, email } = await request.json();

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const queryParams = new URLSearchParams({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
    }).toString();

    const targetUrl = `${SHEET_ENDPOINT}?${queryParams}`;

    // Step 1: Check if Google redirects to accounts.google.com (permission error)
    const initialResponse = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'manual',
    });

    const locationHeader = initialResponse.headers.get('location') || '';
    if (initialResponse.status === 302 && locationHeader.includes('accounts.google.com')) {
      console.error('Google Apps Script permission error: Redirected to Google login. Deployment must have "Who has access" set to "Anyone".');
      return NextResponse.json(
        {
          success: false,
          error: 'Google Sheet permission denied. Please update Apps Script "Who has access" setting to "Anyone".',
          permissionDenied: true,
        },
        { status: 502 }
      );
    }

    // Step 2: If redirect is to script.googleusercontent.com or 200 OK, follow it completely
    const finalResponse = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'follow',
    });

    const responseText = await finalResponse.text().catch(() => '');
    
    // Additionally, try sending a POST fallback just in case the Apps Script handles doPost
    try {
      await fetch(SHEET_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: queryParams,
      }).catch(() => {});
    } catch {
      // Ignore POST fallback errors if only doGet is implemented
    }

    return NextResponse.json({ success: true, message: responseText });
  } catch (error) {
    console.error('Waitlist API submission failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
