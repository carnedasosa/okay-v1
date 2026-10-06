import Image from "next/image";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";
import type { GalleryShot } from "@/types";
import styles from "./PhotoSlot.module.css";

type PhotoSlotProps = {
  shot: GalleryShot;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Renders the real photo when `shot.src` exists. Otherwise a placeholder on
 * a warm dark ground with the brief describing the photo that must replace
 * it (the brief is visible only in draft mode).
 */
export function PhotoSlot({
  shot,
  sizes = "(min-width: 64rem) 33vw, 90vw",
  priority = false,
  className,
}: PhotoSlotProps) {
  return (
    <figure
      className={cn(styles.slot, styles[shot.tone], className)}
      style={{ aspectRatio: shot.ratio }}
    >
      {shot.src ? (
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.image}
        />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={shot.alt}>
          <span className={cn("pill", styles.tag)} aria-hidden="true">
            Foto
          </span>
          {siteConfig.draftMarkers && (
            <span className={cn("caption", styles.brief)} aria-hidden="true">
              {shot.brief}
            </span>
          )}
        </div>
      )}
    </figure>
  );
}
