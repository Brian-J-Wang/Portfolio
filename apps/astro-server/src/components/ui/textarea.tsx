import * as React from "react"

import { cn } from "@/lib/utils"
import styles from "./styles/textarea.module.css"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        styles.base,
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
