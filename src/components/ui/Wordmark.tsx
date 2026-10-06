import { cn } from "@/lib/cn";
import styles from "./Wordmark.module.css";

type WordmarkProps = {
  className?: string;
  size?: "m" | "xl";
  /** Paper outline on dark grounds. */
  inverse?: boolean;
};

/**
 * Typographic stand-in for the hand-drawn 3D "OKAY" lettering: outlined
 * Archivo with a solid offset extrusion. Replace the markup with the official
 * logo SVG when the files are supplied, keeping the accessible name.
 */
export function Wordmark({ className, size = "m", inverse = false }: WordmarkProps) {
  return (
    <span className={cn(styles.wordmark, styles[size], inverse && styles.inverse, className)}>
      <span className={styles.name}>OKAY</span>
      <span className={styles.reg} aria-hidden="true">
        ®
      </span>
    </span>
  );
}
