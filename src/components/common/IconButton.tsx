import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  children: ReactNode;
};

export function IconButton({ active, className, children, ...rest }: Props) {
  return (
    <button
      className={`icon-button ${
        active ? "icon-button--active" : ""
      } ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}

