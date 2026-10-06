import { formatEventDate, getUpcomingEvents } from "@/lib/events";
import { eventJsonLd } from "@/lib/schema";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { JsonLd } from "@/components/seo/JsonLd";
import styles from "./Events.module.css";

/**
 * Upcoming nights at OKAY. Renders nothing while src/data/events.ts is empty
 * (no public event was found during research).
 */
export function Events() {
  const upcoming = getUpcomingEvents();
  if (upcoming.length === 0) return null;

  return (
    <section id="serate" className={styles.events} aria-labelledby="events-title">
      <div className="checker" aria-hidden="true" />
      <div className={cn("container", styles.inner)}>
        <SectionHead id="events-title" kicker="In calendario" title="Le serate" marker="Okay" />
        <ol role="list" className={styles.list}>
          {upcoming.map((event, index) => {
            const { date, time } = formatEventDate(event.startDate);
            return (
              <Reveal as="li" key={event.id} className={styles.item} delay={index % 3}>
                <p className={cn("caption", styles.date)}>
                  <time dateTime={event.startDate}>
                    {date} · {time}
                  </time>
                </p>
                <h3 className={styles.title}>{event.title}</h3>
                <p className={styles.body}>{event.description}</p>
                {event.ticketUrl && (
                  <ButtonLink
                    href={event.ticketUrl}
                    variant="paper"
                    icon="arrow"
                    iconPosition="end"
                  >
                    {event.free ? "Info" : "Biglietti"}
                  </ButtonLink>
                )}
              </Reveal>
            );
          })}
        </ol>
      </div>
      <JsonLd data={upcoming.map(eventJsonLd)} />
    </section>
  );
}
