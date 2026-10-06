import { venue } from "@/data/venue";
import { cn } from "@/lib/cn";
import { formatDays, formatTimeRange, localPhone, telHref } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { DraftMark } from "@/components/ui/DraftMark";
import { SectionHead } from "@/components/ui/SectionHead";
import styles from "./Visit.module.css";

/** Closing call-to-action of the home: where, when, how to book. */
export function Visit() {
  return (
    <section className={styles.visit} aria-labelledby="visit-title">
      <div className={cn("container", styles.grid)}>
        <div className={styles.copy}>
          <SectionHead
            id="visit-title"
            title={
              <>
                Passa
                <br />a trovarci
              </>
            }
            marker={venue.address.neighbourhood}
            className={styles.head}
          />

          <dl className={styles.facts}>
            <div>
              <dt className="caption">Indirizzo</dt>
              <dd>
                <address>
                  {venue.address.street}
                  <br />
                  {venue.address.postalCode} {venue.address.city}
                </address>
              </dd>
            </div>
            <div>
              <dt className="caption">Aperti</dt>
              <dd>
                {venue.hours.value.map((slot) => (
                  <span key={slot.days.join()} className={styles.hoursLine}>
                    {formatDays(slot.days)}
                    <br />
                    {formatTimeRange(slot)}
                    <DraftMark
                      verified={venue.hours.verified}
                      note="Orari da confermare con il locale"
                    />
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="caption">Prenota</dt>
              <dd>
                <a href={telHref(venue.phone.value)}>{localPhone(venue.phone.value)}</a>
                <DraftMark verified={venue.phone.verified} />
              </dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <ButtonLink href={telHref(venue.phone.value)} variant="red" icon="phone" size="l">
              Chiama e prenota
            </ButtonLink>
            <ButtonLink href={venue.maps.google} icon="pin" size="l">
              Indicazioni
            </ButtonLink>
            <ButtonLink href="/info" variant="paper" icon="arrow" iconPosition="end" size="l">
              Tutte le info
            </ButtonLink>
          </div>
        </div>

        <a
          href={venue.maps.google}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.map}
          aria-label={`Apri ${venue.address.street}, ${venue.address.city} in Google Maps (si apre in una nuova scheda)`}
        >
          <svg
            viewBox="0 0 48 48"
            width="48"
            height="48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M24 43s14-12.5 14-24a14 14 0 0 0-28 0c0 11.5 14 24 14 24Z" />
            <circle cx="24" cy="19" r="5" />
          </svg>
          <span className="caption">Via Brancaccio 18 · Picone</span>
        </a>
      </div>
    </section>
  );
}
