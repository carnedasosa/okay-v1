import Image from "next/image";
import { venue } from "@/data/venue";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
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
          <Image
            src="/photos/smash-vassoio.webp"
            alt="Okay Double: smash burger doppio con cheddar fuso sul vassoio con la carta OKAY"
            width={972}
            height={863}
            priority
            sizes="(min-width: 64rem) 50vw, 110vw"
            className={styles.burger}
          />
        </div>
      </div>
    </section>
  );
}
