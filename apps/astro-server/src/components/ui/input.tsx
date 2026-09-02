import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import styles from "./styles/input.module.css"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        styles.base,
        className
      )}
      {...props}
    />
  )
}

export { Input }
