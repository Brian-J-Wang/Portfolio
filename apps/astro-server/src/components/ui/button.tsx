import styles from "./styles/button.module.css"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      default: styles.variant_default,
      outline: styles.variant_outline,
      secondary: styles.variant_secondary,
      ghost: styles.variant_ghost,
      destructive: styles.variant_destructive,
      link: styles.variant_link,
    },
    size: {
      default: styles.size_default,
      xs: styles.size_xs,
      sm: styles.size_sm,
      lg: styles.size_lg,
      icon: styles.size_icon,
      "icon-xs": styles.size_icon_xs,
      "icon-sm": styles.size_icon_sm,
      "icon-lg": styles.size_icon_lg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
