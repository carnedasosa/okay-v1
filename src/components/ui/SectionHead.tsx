import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./SectionHead.module.css";

type SectionHeadProps = {
  title: ReactNode;
  /** One word scribbled in red next to the title. Never a sentence. */
  marker?: string;
  kicker?: string;
  intro?: ReactNode;
  /** Right-hand slot, usually a ButtonLink. */
  action?: ReactNode;
  id?: string;
  as?: "h1" | "h2";
  size?: "l" | "xl";
  className?: string;
};

/** Display title in uppercase + optional marker word, kicker, intro and action. */
export function SectionHead({
  title,
  marker,
  kicker,
  intro,
  action,
  id,
  as: Heading = "h2",
  size = "l",
  className,
}: SectionHeadProps) {
  return (
    <header className={cn(styles.head, className)}>
      <div className={styles.main}>
        {kicker && <p className={cn("caption", styles.kicker)}>{kicker}</p>}
        <div className={styles.titleRow}>
          <Heading id={id} className={cn(styles.title, styles[size])}>
            {title}
          </Heading>
          {marker && (
            <span className={cn("marker", styles.marker, styles[size])} aria-hidden="true">
              {marker}
            </span>
          )}
        </div>
        {intro && <div className={styles.intro}>{intro}</div>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </header>
  );
}
