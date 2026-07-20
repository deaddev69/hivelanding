"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Input } from '@/components/ui';
import { CheckCircle2, ShoppingBag, Truck, BadgeCheck } from 'lucide-react';

export default function WaitlistPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; phone?: boolean; email?: boolean }>({});

  const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzltQlQlhnQFQQSwOuLuwxkxvau0ani_eSiQWJo56BCUw-5Fgv0pa638RtDNQJKEo_4/exec';

  // Validation functions
  const validateName = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "Please enter your name.";
    if (trimmed.length < 2) return "Name must be at least 2 characters.";
    return "";
  };

  const validatePhone = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "Please enter your mobile number.";
    const digits = trimmed.replace(/\D/g, "");
    const phoneDigits = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
    if (phoneDigits.length !== 10) return "Please enter a valid 10-digit mobile number.";
    if (!/^[6-9]\d{9}$/.test(phoneDigits)) return "Please enter a valid Indian mobile number.";
    return "";
  };

  const validateEmail = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return "Please enter your email address.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return "Please enter a valid email address (e.g. name@domain.com).";
    return "";
  };

  const handleBlur = (field: 'name' | 'phone' | 'email') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let err = "";
    if (field === 'name') err = validateName(name);
    if (field === 'phone') err = validatePhone(phone);
    if (field === 'email') err = validateEmail(email);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateName(val) }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhone(val);
    if (touched.phone) {
      setErrors((prev) => ({ ...prev, phone: validatePhone(val) }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameErr = validateName(name);
    const phoneErr = validatePhone(phone);
    const emailErr = validateEmail(email);

    setTouched({ name: true, phone: true, email: true });
    setErrors({ name: nameErr, phone: phoneErr, email: emailErr });

    if (nameErr || phoneErr || emailErr) return;

    setStatus('loading');

    try {
      const queryParams = new URLSearchParams({ name: name.trim(), phone: phone.trim(), email: email.trim() }).toString();
      const targetUrl = `${SHEET_ENDPOINT}?${queryParams}`;

      // 1. Image Beacon (un-abortable background browser GET request)
      const beacon = new window.Image();
      beacon.src = targetUrl;

      // 2. Secondary fetch fallback
      fetch(targetUrl, { method: 'GET', mode: 'no-cors' }).catch(() => { });
    } catch (err) {
      console.error(err);
    }

    // Transition UI to success after request fires
    setTimeout(() => {
      setStatus('success');
      setName('');
      setPhone('');
      setEmail('');
      setErrors({});
      setTouched({});
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] flex flex-col overflow-x-hidden selection:bg-[#F5A623]/20 font-sans text-[#1A1200]">

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="w-full pt-6 pb-4 px-6 md:px-14 flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo — brand anchor, 110–120px wide on mobile */}
        <Image
          src="/logo.png"
          alt="Hive"
          width={320}
          height={224}
          priority
          className="h-[56px] w-auto object-contain"
        />
        <span className="text-[13px] font-medium text-[#8C7A5A] tracking-wide mt-2">
          Launching 5 August • Kochi
        </span>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-14 pt-6 pb-10">

        {/* Generous gap between columns (gap-14 lg:gap-16) + image pushed right via pl on its container */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left — copy + form (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start">

            {/* Headline — General Sans 600, 36→64px, -0.04em, 1.05 leading */}
            <h1
              className="text-[#1A1200] max-w-[360px] sm:max-w-[400px] lg:max-w-[460px]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 6.5vw, 64px)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
              }}
            >
              Premium fashion, delivered differently.
            </h1>

            {/* Subtext — General Sans 400, warm #5E5447 */}
            <p
              className="mt-5 max-w-[320px] sm:max-w-[340px]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                color: '#5E5447',
                lineHeight: 1.65,
                fontWeight: 400,
              }}
            >
              Discover carefully curated fashion, exclusive collections, and local favourites—all in one place.
            </p>

            {/* ── Form ──────────────────────────────────────── */}
            <div className="w-full max-w-sm mt-6">
              {status === 'success' ? (
                /* Clean success state — all data already captured */
                <div className="p-6 bg-white border border-[#F0E4C8] rounded-2xl flex flex-col gap-3 shadow-sm">
                  <div className="flex items-center gap-2.5 text-[#1A1200] font-semibold text-base">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                    <span>You&apos;re on the list.</span>
                  </div>
                  <p className="text-sm text-[#8C7A5A] leading-relaxed pl-7">
                    We&apos;ll reach out when Hive launches on 5 August in Kochi. Keep an eye on your phone and inbox.
                  </p>
                </div>
              ) : (
                /* Waitlist form — with inline validation */
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3" noValidate>
                  <label className="block text-[12px] font-medium text-[#8C7A5A] mb-0.5">
                    Be among the first to experience Hive on 5 August.
                  </label>

                  {/* Name */}
                  <div className="flex flex-col gap-1 w-full">
                    <Input
                      name="name"
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="Your name"
                      className={`h-[52px] bg-white border rounded-xl px-4 text-[15px] placeholder:text-[#8C7A5A]/60 transition-all shadow-sm ${
                        touched.name && errors.name
                          ? 'border-red-400 focus-visible:ring-red-400'
                          : 'border-[#F0E4C8] focus-visible:ring-[#F5A623] focus-visible:bg-white'
                      }`}
                      disabled={status === 'loading'}
                    />
                    {touched.name && errors.name && (
                      <span className="text-[12px] font-medium text-red-500 pl-1">{errors.name}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1 w-full">
                    <Input
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      onBlur={() => handleBlur('phone')}
                      placeholder="+91 Mobile number"
                      className={`h-[52px] bg-white border rounded-xl px-4 text-[15px] placeholder:text-[#8C7A5A]/60 transition-all shadow-sm ${
                        touched.phone && errors.phone
                          ? 'border-red-400 focus-visible:ring-red-400'
                          : 'border-[#F0E4C8] focus-visible:ring-[#F5A623] focus-visible:bg-white'
                      }`}
                      disabled={status === 'loading'}
                    />
                    {touched.phone && errors.phone && (
                      <span className="text-[12px] font-medium text-red-500 pl-1">{errors.phone}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1 w-full">
                    <Input
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="Email address"
                      className={`h-[52px] bg-white border rounded-xl px-4 text-[15px] placeholder:text-[#8C7A5A]/60 transition-all shadow-sm ${
                        touched.email && errors.email
                          ? 'border-red-400 focus-visible:ring-red-400'
                          : 'border-[#F0E4C8] focus-visible:ring-[#F5A623] focus-visible:bg-white'
                      }`}
                      disabled={status === 'loading'}
                    />
                    {touched.email && errors.email && (
                      <span className="text-[12px] font-medium text-red-500 pl-1">{errors.email}</span>
                    )}
                  </div>

                  {/* CTA */}
                  <Button
                    type="submit"
                    size="lg"
                    className="mt-1 h-[52px] w-full text-white rounded-xl text-[15px] font-semibold shadow-none focus-visible:ring-2 focus-visible:ring-[#F5A623] transition-all"
                    style={{ backgroundColor: '#211A14' }}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Joining…' : 'Join waitlist'}
                  </Button>

                  <p className="text-[12px] text-[#8C7A5A] font-medium mt-0.5">
                    Request early access to Hive&apos;s 5 August launch in Kochi.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Right — hero image (6 cols), desktop only */}
          <div className="hidden lg:flex lg:col-span-6 w-full justify-end pl-0 lg:pl-8">
            <div
              className="relative w-full rounded-2xl overflow-hidden bg-[#F0E4C8]/30 border border-[#F0E4C8]"
              style={{ height: '640px' }}
            >
              {/* Crop shifted left so phone isn't on the edge */}
              <img
                src="/hero.png"
                alt="Premium Indian fashion boutique interior with warm natural light, folded fabrics, phone and clothing rail"
                className="w-full h-full object-cover object-[45%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1200]/12 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </section>

        {/* ── Brand strip + discovery line ──────────────────────────── */}
        <div className="mt-12 pt-7 border-t border-[#F0E4C8] flex flex-col gap-1">
          <p className="text-[13px] font-medium text-[#8C7A5A] tracking-wide">
            Launching with curated fashion brands across Kochi.
          </p>
          <p className="text-[13px] font-medium text-[#C49A1A]">
            Discover collections your city has been hiding.
          </p>
        </div>

        {/* ── Benefits — icon + title as one unit, description beside */}
        <section className="w-full mt-3 flex flex-col">

          <div className="py-5 border-b border-[#F0E4C8]/70 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10">
            <div className="flex items-center gap-2.5 shrink-0 sm:w-52">
              <ShoppingBag className="w-[15px] h-[15px] shrink-0" style={{ color: '#C49A1A' }} />
              <span className="text-[14px] font-semibold text-[#1A1200] leading-none">
                Curated brands
              </span>
            </div>
            <p className="text-[14px] text-[#5E5447] leading-relaxed">
              Discover pieces chosen for exceptional craftsmanship, premium fabric, and enduring style.
            </p>
          </div>

          <div className="py-5 border-b border-[#F0E4C8]/70 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10">
            <div className="flex items-center gap-2.5 shrink-0 sm:w-52">
              <Truck className="w-[15px] h-[15px] shrink-0" style={{ color: '#C49A1A' }} />
              <span className="text-[14px] font-semibold text-[#1A1200] leading-none">
                Fast delivery
              </span>
            </div>
            <p className="text-[14px] text-[#5E5447] leading-relaxed">
              Skip the long wait. Experience rapid, same-day delivery right to your doorstep across the city.
            </p>
          </div>

          <div className="py-5 border-b border-[#F0E4C8]/70 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10">
            <div className="flex items-center gap-2.5 shrink-0 sm:w-52">
              <BadgeCheck className="w-[15px] h-[15px] shrink-0" style={{ color: '#C49A1A' }} />
              <span className="text-[14px] font-semibold text-[#1A1200] leading-none">
                Trusted & Verified
              </span>
            </div>
            <p className="text-[14px] text-[#5E5447] leading-relaxed">
              Shop confidently with transparent pricing, guaranteed authenticity, and dedicated local support.
            </p>
          </div>

        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <div>
        <div className="w-full bg-[#FAF6F0] h-6 border-t border-[#F0E4C8]/60 mt-10" />
        <footer className="w-full bg-[#181511] py-12 px-6 md:px-14">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-end gap-6">
            <div className="flex flex-col items-start gap-2">
              <Image
                src="/logo.png"
                alt="Hive"
                width={320}
                height={224}
                className="h-10 w-auto object-contain brightness-105"
              />
              <p className="text-[13px] text-[#FFFDF5]/50 font-medium tracking-wide">
                Curated fashion and exclusive collections, all in one place.
              </p>
            </div>
            {/* Copyright lower — sm:items-end pushes it to bottom of flex row */}
            <div className="text-[12px] text-[#FFFDF5]/30 font-medium tracking-wider pb-0.5">
              © {new Date().getFullYear()} Hive
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}
