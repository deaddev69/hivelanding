import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm' | 'lg' | 'icon'
  variant?: 'default' | 'glass' | 'outline' | 'ghost'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', size = 'default', variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hive-gold disabled:pointer-events-none disabled:opacity-50
        ${variant === 'default' ? 'bg-hive-dark text-white hover:bg-hive-dark/90' : ''}
        ${variant === 'glass' ? 'bg-white/50 backdrop-blur-md border border-hive-border/60 hover:bg-white/80 text-hive-dark' : ''}
        ${variant === 'outline' ? 'border border-hive-border bg-transparent hover:bg-hive-border/40 text-hive-dark' : ''}
        ${variant === 'ghost' ? 'hover:bg-hive-border/40 text-hive-dark' : ''}
        ${size === 'default' ? 'h-10 px-4 py-2 text-sm' : ''}
        ${size === 'sm' ? 'h-8 px-3 text-xs rounded-md' : ''}
        ${size === 'lg' ? 'h-12 px-8 text-base rounded-xl' : ''}
        ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
