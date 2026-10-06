import type { Metadata } from "next";
import { venue } from "@/data/venue";
import { cn } from "@/lib/cn";
import { localPhone, telHref, weeklySchedule } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { DraftMark } from "@/components/ui/DraftMark";
import { SectionHead } from "@/components/ui/SectionHead";
import { HoursTable } from "./HoursTable";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Dove & quando",
  description:
    "OKAY Bari Social Food Club è in Via Francesco Maria Brancaccio 18, 70124 Bari (Picone). Orari, telefono per prenotare, indicazioni, delivery e asporto.",
  path: "/info",
});

const faq = [
  {
    q: "Si può prenotare?",
    a: "Sì, con una telefonata. Per i gruppi meglio chiamare con un po' di anticipo.",
  },
  {
    q: "Fate delivery e asporto?",
    a: `Sì, con l'app ufficiale ${venue.ordering.appName} (iOS e Android) oppure ordinando al telefono.`,
  },
  {
    q: "C'è qualcosa per chi non mangia carne?",
    a: "Gyoza di verdure, nachos con guacamole, patatine. Per tutto il resto, chiedi allo staff.",
  },
  {
    q: "E per allergie e intolleranze?",
    a: "Dillo quando ordini: lo staff ti spiega ingredienti e allergeni di ogni piatto.",
  },
];

export default function InfoPage() {
  const schedule = weeklySchedule(venue.hours.value);

  return (
    <>
      <section className={styles.hero} aria-labelledby="info-title">
        <div className="container">
          <SectionHead
            as="h1"
            size="xl"
            id="info-title"
            kicker={`${venue.address.neighbourhood}, ${venue.address.city}`}
            title={
              <>
                Dove
                <br />
                &amp; quando
              </>
            }
            marker="Stasera?"
            className={styles.head}
          />
        </div>
      </section>

      <div className={cn("container", styles.layout)}>
        <section className={styles.block} aria-labelledby="where-title">
          <h2 id="where-title" className="caption">
            Indirizzo
          </h2>
          <address className={styles.address}>
            {venue.address.street}
            <br />
            {venue.address.postalCode} {venue.address.city}
          </address>
          <p className={styles.muted}>
            Quartiere {venue.address.neighbourhood}. Coordinate {venue.geo.lat.toFixed(5)},{" "}
            {venue.geo.lng.toFixed(5)}.
          </p>
          <div className={styles.actions}>
            <ButtonLink href={venue.maps.google} icon="pin">
              Google Maps
            </ButtonLink>
            <ButtonLink href={venue.maps.apple} variant="paper" icon="pin">
              Apple Mappe
            </ButtonLink>
          </div>
        </section>

        <section className={styles.block} aria-labelledby="hours-title">
          <h2 id="hours-title" className="caption">
            Orari
            <DraftMark verified={venue.hours.verified} note="Orari da confermare con il locale" />
          </h2>
          <HoursTable schedule={schedule} />
          <p className={styles.muted}>
            Festivi ed eventi possono cambiare gli orari: gli aggiornamenti sono su Instagram{" "}
            <a href={venue.social.instagram.url} target="_blank" rel="noopener noreferrer">
              @{venue.social.instagram.handle}
              <span className="sr-only"> (si apre in una nuova scheda)</span>
            </a>
            .
          </p>
        </section>

        <section className={cn(styles.block, styles.contact)} aria-labelledby="contact-title">
          <h2 id="contact-title" className="caption">
            Prenota &amp; ordina
          </h2>
          <p>
            <a href={telHref(venue.phone.value)} className={styles.phone}>
              {localPhone(venue.phone.value)}
            </a>
            <DraftMark verified={venue.phone.verified} />
          </p>
          <p className={styles.muted}>Prenotazioni e ordini per l&apos;asporto al telefono.</p>
          <div className={styles.actions}>
            <ButtonLink href={telHref(venue.phone.value)} variant="red" icon="phone">
              Chiama
            </ButtonLink>
            <ButtonLink href={venue.ordering.ios} icon="apple">
              App iOS
            </ButtonLink>
            <ButtonLink href={venue.ordering.android} icon="play">
              App Android
            </ButtonLink>
          </div>
        </section>

        <section className={cn(styles.block, styles.faq)} aria-labelledby="faq-title">
          <h2 id="faq-title" className="caption">
            Domande frequenti
          </h2>
          {faq.map((item) => (
            <details key={item.q} className={styles.details}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>
      </div>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Dove & quando", path: "/info" },
        ])}
      />
    </>
  );
}
