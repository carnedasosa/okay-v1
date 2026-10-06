import { venue } from "@/data/venue";
import { cn } from "@/lib/cn";
import { localPhone, telHref } from "@/lib/format";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { DraftMark } from "@/components/ui/DraftMark";
import styles from "./Delivery.module.css";

const steps = [
  { id: "app", title: "Scarica OkayBari", body: "L'app ufficiale, per iOS e Android." },
  {
    id: "scegli",
    title: "Scegli il giro del mondo",
    body: "Smash, pastrami, gyoza, nachos, dolci.",
  },
  {
    id: "ritira",
    title: "Delivery o asporto",
    body: "Te lo portiamo, oppure passi tu in Via Brancaccio.",
  },
];

export function Delivery() {
  return (
    <section id="a-casa" className={styles.delivery} aria-labelledby="delivery-title">
      <div className="checker" aria-hidden="true" />
      <div className={cn("container", styles.grid)}>
        <div className={styles.copy}>
          <p className="caption">Asporto &amp; delivery</p>
          <h2 id="delivery-title" className={styles.title}>
            Okay anche
            <br />
            sul divano.
          </h2>
          <p className={styles.lead}>
            La stessa cucina, dove vuoi tu. Ordina con l&apos;app {venue.ordering.appName} o
            chiamaci: prepariamo, impacchettiamo, partiamo.
          </p>
          <div className={styles.actions}>
            <ButtonLink href={venue.ordering.ios} icon="apple" size="l">
              App Store
            </ButtonLink>
            <ButtonLink href={venue.ordering.android} icon="play" size="l">
              Google Play
            </ButtonLink>
          </div>
          <p className={styles.phone}>
            Oppure al telefono:{" "}
            <a href={telHref(venue.phone.value)}>{localPhone(venue.phone.value)}</a>
            <DraftMark verified={venue.phone.verified} />
          </p>
        </div>

        <div className={styles.card}>
          <p className="caption">Come funziona</p>
          <ol role="list" className={styles.steps}>
            {steps.map((step, index) => (
              <Reveal as="li" key={step.id} className={styles.step} delay={index}>
                <span className={styles.stepIndex} aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      <div className={styles.merch}>
        <div className={cn("container", styles.merchInner)}>
          <p>
            <strong>Ti è piaciuto? Indossalo.</strong> Le t-shirt OKAY sono nel nostro Linktree.
          </p>
          <ButtonLink href={venue.social.linktree} variant="paper" icon="arrow" iconPosition="end">
            Merch
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
