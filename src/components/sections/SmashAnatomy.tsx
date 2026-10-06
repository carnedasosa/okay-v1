import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./SmashAnatomy.module.css";

const steps = [
  {
    id: "piastra",
    title: "La piastra",
    body: "Rovente. Più è calda, più il bordo diventa croccante.",
  },
  {
    id: "smash",
    title: "Lo smash",
    body: "La carne viene schiacciata sulla piastra: crosta fuori, cuore succoso dentro.",
  },
  {
    id: "cheddar",
    title: "Il cheddar",
    body: "Fuso sopra la carne ancora calda. Nel double, due volte.",
  },
  {
    id: "bun",
    title: "Il bun",
    body: "Morbido, a tenere insieme tutto. Single o double: decidi tu.",
  },
];

/** How a smash is made, in four steps, on the warm dark ground. */
export function SmashAnatomy() {
  return (
    <section className={styles.section} aria-labelledby="smash-title">
      <div className={cn("container", styles.inner)}>
        <header className={styles.head}>
          <h2 id="smash-title" className={styles.title}>
            Schiacciato
            <br />
            sulla piastra.
          </h2>
          <span className={styles.marker} aria-hidden="true">
            Croccante
          </span>
        </header>

        <ol role="list" className={styles.steps}>
          {steps.map((step, index) => (
            <Reveal as="li" key={step.id} className={styles.step} delay={index}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p>{step.body}</p>
            </Reveal>
          ))}
        </ol>

        <div>
          <ButtonLink href="/menu#smash" variant="paper" icon="arrow" iconPosition="end">
            Tutti gli smash
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
