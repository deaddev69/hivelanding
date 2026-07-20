"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  enableGlow?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type, onFocus, onBlur, enableGlow = true, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    return (
      <div className="relative w-full">
        {enableGlow && (
          <AnimatePresence>
            {isFocused && (
              <>
                {/* LEFT light trail */}
                <motion.div
                  aria-hidden
                  className="absolute -left-20 sm:-left-36 top-1/2 -translate-y-1/2 w-40 sm:w-60 h-12 blur-xl pointer-events-none z-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(245,166,35,0.45), rgba(245,166,35,0.12), rgba(0,0,0,0))",
                  }}
                  initial={{ opacity: 0, scaleX: 0.5 }}
                  animate={{ opacity: 0.85, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0.5 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />

                {/* RIGHT light trail */}
                <motion.div
                  aria-hidden
                  className="absolute -right-20 sm:-right-36 top-1/2 -translate-y-1/2 w-40 sm:w-60 h-12 blur-xl pointer-events-none z-0"
                  style={{
                    background:
                      "linear-gradient(270deg, rgba(245,166,35,0.45), rgba(245,166,35,0.12), rgba(0,0,0,0))",
                  }}
                  initial={{ opacity: 0, scaleX: 0.5 }}
                  animate={{ opacity: 0.85, scaleX: 1 }}
                  exit={{ opacity: 0, scaleX: 0.5 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.03 }}
                />

                {/* Top golden edge highlight */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute left-4 right-4 top-0 h-px bg-gradient-to-r from-transparent via-[#F5A623] to-transparent z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />

                {/* End hot-spots */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -left-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#F5A623]/60 blur-md z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#F5A623]/60 blur-md z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  exit={{ opacity: 0 }}
                />
              </>
            )}
          </AnimatePresence>
        )}

        <motion.div
          className="relative z-10 rounded-xl"
          animate={{
            boxShadow: isFocused
              ? "0 0 35px -5px rgba(245,166,35,0.45)"
              : "0 0 0px 0px rgba(245,166,35,0)",
          }}
          transition={{ duration: 0.2 }}
        >
          <input
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`flex h-10 w-full rounded-xl border border-hive-border bg-transparent px-3 py-2 text-sm ring-offset-hive-cream file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-hive-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-gold disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            ref={ref}
            {...props}
          />
        </motion.div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
