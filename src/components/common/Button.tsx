import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  fullWidth?: boolean;
  iconLeft?: ReactNode;
};

export function Button({
  children,
  variant = "primary",
  fullWidth,
  iconLeft,
  className,
  ...rest
}: Props) {
  const base = "btn";
  const variants: Record<typeof variant, string> = {
    primary: "btn--primary",
    ghost: "btn--ghost",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${base} ${variants[variant]} ${width} ${className ?? ""}`}
      {...rest}
    >
      {iconLeft}
      {children}
    </button>
  );
}

