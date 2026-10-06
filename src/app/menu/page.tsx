import type { Metadata } from "next";
import { extras, menu, menuUpdatedAt } from "@/data/menu";
import { venue } from "@/data/venue";
import { cn } from "@/lib/cn";
import { formatPrice, telHref } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, menuJsonLd } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { DraftMark } from "@/components/ui/DraftMark";
import { SectionHead } from "@/components/ui/SectionHead";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Menu",
  description:
    "Il menu di OKAY Bari: smash burger, Truffle Smash, pastrami bun e toast, gyoza di verdure, nachos, patatine caciocavallo e tartufo, cheesecake. Anche da asporto e a domicilio.",
  path: "/menu",
});

const tagLabels = {
  firma: "Firma",
  veg: "Veggie",
  piccante: "Piccante",
  "da condividere": "To share",
} as const;

export default function MenuPage() {
  // A section without dishes would print a title over nothing: skip it, and
  // its tab, until the data has items.
  const sections = menu.filter((section) => section.items.length > 0);

  return (
    <>
      <section className={styles.hero} aria-labelledby="menu-title">
        <div className="container">
          <SectionHead
            as="h1"
            size="xl"
            id="menu-title"
            title="Il menu"
            marker="Fame?"
            intro="Cucina internazionale veloce: smash dagli Stati Uniti, deli da New York, gyoza dal Giappone, nachos dal Messico e il caciocavallo di casa."
            className={styles.head}
          />
          {siteConfig.draftMarkers && (
            <p className={cn("caption", styles.draftNote)} role="note">
              <DraftMark verified={false} note="Dato da confermare" /> Bozza aggiornata a{" "}
              {menuUpdatedAt}: piatti e prezzi da confermare con il locale
            </p>
          )}
        </div>
      </section>

      {sections.length > 0 && (
        <nav className={styles.tabs} aria-label="Sezioni del menu">
          <ul role="list" className="container">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title.replace(/\s+/g, " ")}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="checker" aria-hidden="true" />

      <div className={cn("container", styles.board)}>
        {sections.length === 0 && (
          <div className={styles.empty} role="status">
            <h2>Il menu si sta scrivendo.</h2>
            <p>
              Stiamo aggiornando piatti e prezzi. Nel frattempo chiamaci o passa in Via Brancaccio:
              in sala te lo raccontiamo a voce.
            </p>
          </div>
        )}

        {sections.map((section, sectionIndex) => (
          <section
            key={section.id}
            id={section.id}
            className={styles.section}
            aria-labelledby={`${section.id}-title`}
          >
            <header className={styles.sectionHead}>
              <p className={cn("caption", styles.tagline)}>
                {String(sectionIndex + 1).padStart(2, "0")} · {section.tagline}
              </p>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              {section.note && <p className={styles.note}>{section.note}</p>}
            </header>

            <div className={styles.listWrap}>
              <ul role="list" className={styles.items}>
                {section.items.map((item, index) => (
                  <Reveal
                    as="li"
                    key={item.id}
                    className={styles.item}
                    delay={index % 4}
                    variant="fade"
                  >
                    <div className={styles.itemText}>
                      <div className={styles.itemName}>
                        <h3>{item.name}</h3>
                        {item.tags && item.tags.length > 0 && (
                          <ul role="list" className={styles.tags}>
                            {item.tags.map((tag) => (
                              <li key={tag} className={cn("pill", tag === "veg" && styles.tagVeg)}>
                                {tagLabels[tag]}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {item.description && <p className={styles.itemDesc}>{item.description}</p>}
                    </div>
                    {item.price !== undefined ? (
                      <p className={styles.price}>
                        <span className="sr-only">Prezzo: </span>
                        {formatPrice(item.price)}
                        <span aria-hidden="true"> €</span>
                        <span className="sr-only"> euro</span>
                        <DraftMark verified={item.verified} note="Prezzo da confermare" />
                      </p>
                    ) : (
                      <p className={cn("caption", styles.ask)}>Chiedi in sala</p>
                    )}
                  </Reveal>
                ))}
              </ul>

              {section.id === "smash" && extras.length > 0 && (
                <p className={cn("caption", styles.extras)}>
                  Extra:{" "}
                  {extras
                    .map((extra) => `${extra.name} +${formatPrice(extra.price)} €`)
                    .join(" · ")}
                </p>
              )}
            </div>
          </section>
        ))}

        <aside className={styles.order} aria-labelledby="order-title">
          <div className={styles.orderHead}>
            <h2 id="order-title">Ho sempre fame.</h2>
            <span className="marker" aria-hidden="true">
              Anche tu
            </span>
          </div>
          <p>
            Ordina a domicilio o da asporto con l&apos;app {venue.ordering.appName}, oppure
            chiamaci.
          </p>
          <div className={styles.orderActions}>
            <ButtonLink href={venue.ordering.ios} icon="apple">
              App Store
            </ButtonLink>
            <ButtonLink href={venue.ordering.android} icon="play">
              Google Play
            </ButtonLink>
            <ButtonLink href={telHref(venue.phone.value)} variant="paper" icon="phone">
              Chiama
            </ButtonLink>
          </div>
          <p className={cn("caption", styles.allergens)}>
            Allergeni e intolleranze: chiedi allo staff, ti diciamo tutto su ogni piatto.
          </p>
        </aside>
      </div>

      <JsonLd
        data={[
          menuJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Menu", path: "/menu" },
          ]),
        ]}
      />
    </>
  );
}
