import { destinations } from "@/data/destinations";
import { menu } from "@/data/menu";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { DraftMark } from "@/components/ui/DraftMark";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { SectionHead } from "@/components/ui/SectionHead";
import styles from "./Highlights.module.css";

const menuItems = new Map(menu.flatMap((section) => section.items).map((item) => [item.id, item]));

/** "Un piatto, un Paese": the signature dishes, each from somewhere else. */
export function Highlights() {
  return (
    <section className={styles.highlights} aria-labelledby="highlights-title">
      <div className="container">
        <SectionHead
          id="highlights-title"
          kicker="Il passaporto"
          title={
            <>
              Un piatto,
              <br />
              un Paese.
            </>
          }
          action={
            <ButtonLink href="/menu" variant="paper" icon="arrow" iconPosition="end">
              Tutto il menu
            </ButtonLink>
          }
        />

        <ul role="list" className={styles.grid}>
          {destinations.map((stop, index) => {
            const item = stop.menuItemId ? menuItems.get(stop.menuItemId) : undefined;
            const signature = item?.tags?.includes("firma");
            const veg = item?.tags?.includes("veg");
            return (
              <Reveal
                as="li"
                key={stop.id}
                className={cn(styles.card, index === 0 && styles.featured)}
                delay={index}
              >
                <PhotoSlot
                  shot={{ id: stop.id, ratio: "4/3", tone: "night", ...stop.photo }}
                  sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 45vw, 90vw"
                  className={styles.photo}
                />
                <div className={styles.body}>
                  <p className={cn("caption", styles.origin)}>{stop.origin}</p>
                  <h3 className={styles.dish}>{stop.dish}</h3>
                  <p className={styles.line}>{stop.line}</p>
                  <div className={styles.foot}>
                    {veg ? (
                      <span className={cn("pill", styles.veg)}>Veggie</span>
                    ) : signature ? (
                      <span className="pill">La firma</span>
                    ) : (
                      <span />
                    )}
                    {item?.price !== undefined ? (
                      <p className={styles.price}>
                        {formatPrice(item.price)} €
                        <DraftMark verified={item.verified} note="Prezzo da confermare" />
                      </p>
                    ) : (
                      <p className={cn("caption", styles.ask)}>Prezzo in sala</p>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
