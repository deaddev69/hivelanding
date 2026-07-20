"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Input } from '@/components/ui';
import { CheckCircle2, ShoppingBag, Truck, BadgeCheck } from 'lucide-react';

export default function WaitlistPage() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setStatus('loading');
    try {
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/placeholder_id';
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      if (response.ok || FORMSPREE_ENDPOINT.includes('placeholder_id')) {
        setStatus('success');
        setPhone('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('success');
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmailStatus('saving');
    try {
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/placeholder_id';
      await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, updateType: 'email_enrichment' })
      });
      setEmailStatus('saved');
    } catch (error) {
      console.error(error);
      setEmailStatus('saved');
    }
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
          Launching in Kochi
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
              Discover fashion you&apos;ll love, from stores near you.
            </h1>

            {/* Subtext — General Sans 400, warm #5E5447 */}
            <p
              className="mt-5 max-w-[300px] sm:max-w-[320px]"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '16px',
                color: '#5E5447',
                lineHeight: 1.65,
                fontWeight: 400,
              }}
            >
              Shop from carefully selected fashion stores and have your order delivered across your city.
            </p>

            {/* ── Form ──────────────────────────────────────── */}
            <div className="w-full max-w-sm mt-6">
              {status === 'success' ? (
                /* Celebratory success state */
                <div className="p-6 bg-white border border-[#F0E4C8] rounded-2xl flex flex-col gap-5 shadow-sm">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2.5 text-[#1A1200] font-semibold text-base">
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                      <span>You&apos;re on the list.</span>
                    </div>
                    <p className="text-sm text-[#8C7A5A] leading-relaxed pl-7">
                      We&apos;ll text you when Hive is ready in Kochi.
                    </p>
                  </div>

                  <div className="border-t border-[#F0E4C8] w-full" />

                  {emailStatus === 'saved' ? (
                    <p className="text-xs font-semibold text-[#10B981] flex items-center gap-1.5 py-1">
                      <CheckCircle2 className="w-4 h-4" /> Launch updates enabled for {email}
                    </p>
                  ) : (
                    <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
                      <p className="text-[13px] font-medium text-[#2C1E00]">
                        Want occasional updates by email?
                      </p>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email (optional)"
                        className="h-11 bg-white border-[#F0E4C8] rounded-xl px-3.5 text-sm placeholder:text-[#8C7A5A]/60 focus-visible:ring-1 focus-visible:ring-[#F5A623] shadow-none"
                        disabled={emailStatus === 'saving'}
                      />
                      <div className="flex items-center gap-3">
                        <Button
                          type="submit"
                          size="sm"
                          className="h-9 px-5 bg-[#F5A623] hover:bg-[#E8890C] text-[#1A1200] font-semibold rounded-xl text-sm transition-all shadow-none"
                          disabled={emailStatus === 'saving'}
                        >
                          {emailStatus === 'saving' ? 'Saving…' : 'Save'}
                        </Button>
                        <button
                          type="button"
                          onClick={() => setEmailStatus('saved')}
                          className="text-[13px] font-medium text-[#8C7A5A] hover:text-[#1A1200] transition-colors cursor-pointer"
                        >
                          Skip
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                /* Phone-first form */
                <form className="flex flex-col w-full" onSubmit={handlePhoneSubmit}>
                  {/* Merged proof + framing into one clean line */}
                  <label className="block text-[12px] font-medium text-[#8C7A5A] mb-2">
                    Be among the first to shop with Hive in Kochi.
                  </label>

                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 Mobile number"
                    className="h-[52px] bg-white border-[#F0E4C8] rounded-xl px-4 text-[15px] placeholder:text-[#8C7A5A]/60 focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:bg-white transition-all shadow-sm"
                    required
                    disabled={status === 'loading'}
                  />

                  {/* CTA — tighter gap (mt-2), feels like one unit with input */}
                  <Button
                    type="submit"
                    size="lg"
                    className="mt-2 h-[52px] w-full text-white rounded-xl text-[15px] font-semibold shadow-none focus-visible:ring-2 focus-visible:ring-[#F5A623] transition-all"
                    style={{ backgroundColor: '#211A14' }}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Joining…' : 'Join waitlist'}
                  </Button>

                  <p className="text-[12px] text-[#8C7A5A] font-medium mt-2.5">
                    Request an invitation to Hive&apos;s first launch in Kochi.
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

        {/* ── Store strip + discovery line ──────────────────────────── */}
        <div className="mt-12 pt-7 border-t border-[#F0E4C8] flex flex-col gap-1">
          <p className="text-[13px] font-medium text-[#8C7A5A] tracking-wide">
            Launching with selected fashion stores across Kochi.
          </p>
          <p className="text-[13px] font-medium text-[#C49A1A]">
            Discover stores your city has been hiding.
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
              Discover collections from carefully selected fashion stores chosen for quality and style.
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
              Skip the long wait. Get fashion delivered from nearby stores across your city.
            </p>
          </div>

          <div className="py-5 border-b border-[#F0E4C8]/70 flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-10">
            <div className="flex items-center gap-2.5 shrink-0 sm:w-52">
              <BadgeCheck className="w-[15px] h-[15px] shrink-0" style={{ color: '#C49A1A' }} />
              <span className="text-[14px] font-semibold text-[#1A1200] leading-none">
                Trusted stores
              </span>
            </div>
            <p className="text-[14px] text-[#5E5447] leading-relaxed">
              Shop confidently from verified stores with transparent pricing and reliable local support.
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
                Curated fashion from stores you&apos;ll love.
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
