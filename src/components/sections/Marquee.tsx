import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import styles from "./Marquee.module.css";

type MarqueeProps = {
  words: string[];
  tone?: "ink" | "paper";
  reverse?: boolean;
  tilt?: boolean;
  label?: string;
};

/**
 * Infinite ticker, pure CSS. The list is rendered twice for a seamless loop;
 * the copy is hidden from assistive tech, which reads the label once.
 * A checkbox toggle stops the motion (WCAG 2.2.2) without any JavaScript.
 */
export function Marquee({
  words,
  tone = "ink",
  reverse = false,
  tilt = false,
  label,
}: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul role="list" className={styles.row} aria-hidden={hidden || undefined}>
      {words.map((word) => (
        <li key={word}>
          {word}
          <span className={styles.sep} aria-hidden="true">
            /
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(styles.marquee, styles[tone], reverse && styles.reverse, tilt && styles.tilt)}
      role="region"
      aria-label={label ?? words.join(", ")}
    >
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
      <label className={styles.pause}>
        <input type="checkbox" className="sr-only" />
        <Icon name="pause" size={18} className={styles.iconPause} />
        <Icon name="play" size={16} className={styles.iconPlay} />
        <span className="sr-only">Ferma lo scorrimento</span>
      </label>
    </div>
  );
}
