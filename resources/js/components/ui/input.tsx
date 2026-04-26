import * as React from "react"
import { cn } from "@/lib/utils"

// Extend props to include the icon
interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
}

function Input({ className, type, icon, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {/* React.cloneElement is used to ensure the icon has consistent sizing */}
          {React.isValidElement(icon) 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ? React.cloneElement(icon as React.ReactElement<any>, { 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                className: cn("h-4 w-4", (icon.props as any).className) 
              }) 
            : icon}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          icon ? "pl-10 pr-3" : "px-3", // Add padding-left if icon exists
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }
