import Link from "next/link";
import { navigation } from "@/data/navigation";
import { venue } from "@/data/venue";
import { cn } from "@/lib/cn";
import { formatDays, formatTimeRange, localPhone, telHref } from "@/lib/format";
import { DraftMark } from "@/components/ui/DraftMark";
import { Wordmark } from "@/components/ui/Wordmark";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={cn("container", styles.inner)}>
        <div className={styles.top}>
          <Wordmark size="xl" inverse />
          <p className={styles.sign}>Ci vediamo da OKAY.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.col}>
            <h2 className="caption">Dove</h2>
            <address className={styles.address}>
              {venue.address.street}
              <br />
              {venue.address.postalCode} {venue.address.city} ({venue.address.neighbourhood})
            </address>
            <a
              href={venue.maps.google}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Indicazioni<span className="sr-only"> (si apre in una nuova scheda)</span>
            </a>
          </div>

          <div className={styles.col}>
            <h2 className="caption">Quando</h2>
            <ul role="list">
              {venue.hours.value.map((slot) => (
                <li key={slot.days.join()}>
                  {formatDays(slot.days)} · {formatTimeRange(slot)}
                  <DraftMark
                    verified={venue.hours.verified}
                    note="Orari da confermare con il locale"
                  />
                </li>
              ))}
            </ul>
            <a href={telHref(venue.phone.value)} className={styles.link}>
              {localPhone(venue.phone.value)}
              <DraftMark verified={venue.phone.verified} />
            </a>
          </div>

          <nav className={styles.col} aria-label="Footer">
            <h2 className="caption">Naviga</h2>
            <ul role="list">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <h2 className="caption">Segui</h2>
            <ul role="list">
              <li>
                <a
                  href={venue.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Instagram @{venue.social.instagram.handle}
                  <span className="sr-only"> (si apre in una nuova scheda)</span>
                </a>
              </li>
              <li>
                <a
                  href={venue.social.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Linktree · merch
                  <span className="sr-only"> (si apre in una nuova scheda)</span>
                </a>
              </li>
              <li>
                <a
                  href={venue.ordering.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  App {venue.ordering.appName} · iOS
                  <span className="sr-only"> (si apre in una nuova scheda)</span>
                </a>
              </li>
              <li>
                <a
                  href={venue.ordering.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  App {venue.ordering.appName} · Android
                  <span className="sr-only"> (si apre in una nuova scheda)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="signature">OKAY® Social Food Club Company</p>

        <div className={styles.legal}>
          <p className="caption">
            © {year} {venue.name}
          </p>
          <p className="caption">Cucina internazionale veloce · Bari</p>
        </div>
      </div>
    </footer>
  );
}
