import React from "react";
import { cn } from "~/utils/helpers";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  isExternal?: boolean;
}

export const AppLink: React.FC<LinkProps> = ({ href, children, className, isExternal, ...props }) => {
  return (
    <a
      href={href}
      className={cn("text-blue-600 hover:underline", className)}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
