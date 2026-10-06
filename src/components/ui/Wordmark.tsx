import { cn } from "@/lib/cn";
import { logoFaces, logoFull, logoOutline, logoTransform, logoViewBox } from "./logoPaths";
import styles from "./Wordmark.module.css";

type WordmarkProps = {
  className?: string;
  size?: "m" | "xl";
  /** Dark grounds: paper letter faces and a paper outline around the shape. */
  inverse?: boolean;
  /** Accessible name; omit when the parent already carries it (e.g. a link). */
  label?: string;
};

/**
 * The official OKAY logo, drawn inline so it stays sharp at any size and
 * follows the ground: ink on paper as supplied, or with the letter faces and
 * an outline in paper on dark grounds. Never recolour or distort it.
 */
export function Wordmark({ className, size = "m", inverse = false, label }: WordmarkProps) {
  return (
    <svg
      viewBox={inverse ? "185 407 924 418" : logoViewBox}
      className={cn(styles.logo, styles[size], inverse && styles.inverse, className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <g transform={logoTransform}>
        {inverse && (
          <>
            <path
              d={logoOutline}
              fill="var(--c-paper)"
              stroke="var(--c-paper)"
              strokeWidth={60}
              strokeLinejoin="round"
            />
            <path d={logoFaces} fill="var(--c-paper)" fillRule="evenodd" />
          </>
        )}
        {logoFull.map((d) => (
          <path key={d.slice(0, 24)} d={d} fill="var(--c-ink)" />
        ))}
      </g>
    </svg>
  );
}
