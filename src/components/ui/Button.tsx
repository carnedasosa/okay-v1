import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";
import styles from "./Button.module.css";

type Variant = "ink" | "paper" | "red";

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: "m" | "l";
  icon?: IconName;
  iconPosition?: "start" | "end";
  className?: string;
  children: ReactNode;
};

const isExternal = (href: ComponentProps<typeof Link>["href"]) =>
  typeof href === "string" && /^(https?:|tel:|mailto:)/.test(href);

/**
 * The only CTA primitive. Internal routes use next/link, external links
 * (tel:, https:) render a plain anchor; https links open in a new tab.
 */
export function ButtonLink({
  variant = "ink",
  size = "m",
  icon,
  iconPosition = "start",
  className,
  children,
  href,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(styles.button, styles[variant], styles[size], className);
  const content = (
    <>
      {icon && iconPosition === "start" && <Icon name={icon} size={size === "l" ? 22 : 18} />}
      <span>{children}</span>
      {icon && iconPosition === "end" && <Icon name={icon} size={size === "l" ? 22 : 18} />}
    </>
  );

  if (isExternal(href)) {
    const url = href as string;
    const newTab = url.startsWith("http");
    return (
      <a
        href={url}
        className={classes}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as ComponentProps<"a">)}
      >
        {content}
        {newTab && <span className="sr-only"> (si apre in una nuova scheda)</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
