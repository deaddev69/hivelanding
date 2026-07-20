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

    // Step 1: Make EXACTLY ONE request to script.google.com so doGet runs only once
    const initialResponse = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'manual',
    });

    const locationHeader = initialResponse.headers.get('location') || '';

    // If Google redirected to login, permission is denied and nothing was saved
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

    // Step 2: If Google redirected to script.googleusercontent.com, doGet() already ran once and appended the row!
    // We fetch ONLY the echo output URL (script.googleusercontent.com) to get the text without re-running doGet() on script.google.com
    let responseText = '';
    if (initialResponse.status === 302 && locationHeader.includes('script.googleusercontent.com')) {
      const echoResponse = await fetch(locationHeader, { method: 'GET' });
      responseText = await echoResponse.text().catch(() => '');
    } else if (initialResponse.status === 200) {
      responseText = await initialResponse.text().catch(() => '');
    }

    return NextResponse.json({ success: true, message: responseText });
  } catch (error) {
    console.error('Waitlist API submission failed:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
