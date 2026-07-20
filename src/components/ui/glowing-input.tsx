import React, { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
 
export function GlowingInput({
  placeholder = "Find linen kurtas near Fort Kochi under ₹4,000...",
  onSubmit,
  className = "w-full flex justify-center py-4",
}: {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  className?: string;
}) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimer = useRef<number | null>(null);

  const canSubmit = value.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit?.(value.trim());
    if (!onSubmit) console.log("Submitted prompt:", value.trim());
  };

  useEffect(() => {
    return () => {
      if (typingTimer.current) window.clearTimeout(typingTimer.current);
    };
  }, []);

  return (
    <div className={className}>
      <div className="relative w-full max-w-[760px] flex justify-center">
        {/* LEFT light trail — warm Hive Gold glow */}
        <motion.div
          aria-hidden
          className="absolute -left-32 sm:-left-60 top-1/2 -translate-y-1/2 w-64 sm:w-80 h-16 blur-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(245,166,35,0.45), rgba(245,166,35,0.12), rgba(0,0,0,0))",
          }}
          animate={{ opacity: isFocused ? 0.85 : 0.35 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        />

        {/* RIGHT light trail — warm Hive Gold glow */}
        <motion.div
          aria-hidden
          className="absolute -right-32 sm:-right-60 top-1/2 -translate-y-1/2 w-64 sm:w-80 h-16 blur-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, rgba(245,166,35,0.45), rgba(245,166,35,0.12), rgba(0,0,0,0))",
          }}
          animate={{ opacity: isFocused ? 0.85 : 0.35 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.05 }}
        />

        {/* PILL / PROMPT BAR — Luxury Charcoal with Gold ring & glow */}
        <motion.div
          className="group relative flex items-center w-full px-5 py-3 md:px-6 md:py-4 rounded-full bg-[#1A1200] border border-[#F5A623]/40 shadow-[0_0_60px_-15px_rgba(245,166,35,0.45)] transition-shadow"
          initial={{ boxShadow: "0 0 50px -20px rgba(245,166,35,0.35)" }}
          animate={{
            boxShadow: isFocused
              ? "0 0 90px -15px rgba(245,166,35,0.65)"
              : "0 0 60px -20px rgba(245,166,35,0.4)",
          }}
          whileHover={{ scale: 1.008 }}
        >
          {/* inner edge + top highlight */}
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/5" />
          <div aria-hidden className="pointer-events-none absolute left-6 right-6 top-1 h-px bg-gradient-to-r from-transparent via-[#F5A623]/50 to-transparent opacity-80" />

          {/* left icon chip */}
          <motion.div
            className="mr-3 grid h-10 w-10 place-items-center rounded-full bg-white/5 border border-[#F5A623]/30 shrink-0"
            animate={{
              scale: isFocused ? 1.05 : 1,
              filter: isFocused ? "drop-shadow(0 0 8px rgba(245,166,35,0.6))" : "none",
            }}
          >
            <Sparkles className="h-5 w-5 text-[#F5A623]" />
          </motion.div>

          {/* Accessible label */}
          <label htmlFor="ai-prompt" className="sr-only">
            Ask Hive AI
          </label>

          {/* INPUT */}
          <input
            id="ai-prompt"
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setIsTyping(true);
              if (typingTimer.current) window.clearTimeout(typingTimer.current);
              typingTimer.current = window.setTimeout(() => setIsTyping(false), 700);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            placeholder={placeholder}
            className="flex-1 bg-transparent placeholder:text-[#8C7A5A]/80 text-[#FFFDF5] outline-none text-[15px] md:text-[17px] font-medium caret-[#F5A623]"
            autoComplete="off"
            spellCheck={false}
          />

          {/* action button */}
          <motion.button
            type="button"
            aria-label="Search"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="relative cursor-pointer grid h-11 w-11 place-items-center rounded-full bg-[#F5A623] text-[#1A1200] shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 ml-2"
            whileHover={{ scale: canSubmit ? 1.06 : 1 }}
            whileTap={{ scale: canSubmit ? 0.96 : 1 }}
            animate={{
              boxShadow: canSubmit
                ? "0 0 24px rgba(245,166,35,0.5)"
                : "0 0 8px rgba(245,166,35,0.1)",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
          >
            <motion.span
              className="grid"
              animate={
                isTyping
                  ? { x: [0, 4, 8] }
                  : { x: 0 }
              }
              transition={
                isTyping
                  ? { duration: 0.8, repeat: Infinity, ease: "easeIn" }
                  : { duration: 0.2 }
              }
            >
              <ArrowRight className="h-5 w-5 stroke-[2.5]" />
            </motion.span>
            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/20" />
          </motion.button>

          {/* end hot-spots */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#F5A623]/70 blur-xl"
            animate={{ opacity: isFocused ? 0.9 : 0.5 }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-[#F5A623]/70 blur-xl"
            animate={{ opacity: isFocused ? 0.9 : 0.5 }}
          />
        </motion.div>
      </div>
    </div>
  );
}
