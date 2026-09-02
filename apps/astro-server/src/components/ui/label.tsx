import * as React from "react"

import { cn } from "@/lib/utils"
import styles from "./styles/label.module.css"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        styles.base,
        className
      )}
      {...props}
    />
  )
}

export { Label }
