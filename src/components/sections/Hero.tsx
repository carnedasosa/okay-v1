import { venue } from "@/data/venue";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={cn("container", styles.inner)}>
        <div className={styles.copy}>
          <p className={cn("caption", styles.kicker)}>
            Social food club · {venue.address.neighbourhood}, {venue.address.city}
          </p>

          <h1 id="hero-title" className={styles.title}>
            Dove
            <br />
            mangiamo
            <br />
            stasera?
            <span className="sr-only"> OKAY Bari Social Food Club.</span>
          </h1>

          <div className={styles.answer}>
            <span className={cn("marker", styles.marker)} aria-hidden="true">
              Okay.
            </span>
            <p className={styles.lead}>
              Smash burger, pastrami, gyoza, nachos e cheesecake. Cucina internazionale veloce: in
              sala, da asporto o a casa con l&apos;app {venue.ordering.appName}.
            </p>
          </div>

          <div className={styles.actions}>
            <ButtonLink href="/menu" icon="arrow" iconPosition="end" size="l">
              Guarda il menu
            </ButtonLink>
            <ButtonLink href="/info" variant="paper" size="l">
              Dove siamo
            </ButtonLink>
          </div>
        </div>

        <div className={styles.visual}>
          <PhotoSlot
            shot={{
              id: "hero",
              src: "/photos/double-smash-bacon.jpg",
              alt: "Smash burger doppio con cheddar fuso nella carta OKAY",
              brief: "Okay Double · da vicino · luce calda, fondo legno",
              ratio: "4/5",
              tone: "night",
            }}
            priority
            sizes="(min-width: 64rem) 40vw, 90vw"
            className={styles.photo}
          />
          <p className={cn("caption", styles.photoLabel)} aria-hidden="true">
            La firma · Okay Double
          </p>
        </div>
      </div>
    </section>
  );
}
