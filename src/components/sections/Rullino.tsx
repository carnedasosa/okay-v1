import { feedPosts } from "@/data/club";
import { gallery } from "@/data/gallery";
import { venue } from "@/data/venue";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { SectionHead } from "@/components/ui/SectionHead";
import type { GalleryShot } from "@/types";
import styles from "./Rullino.module.css";

type Tile =
  { kind: "post"; post: (typeof feedPosts)[number] } | { kind: "photo"; shot: GalleryShot };

/** Like the Instagram feed: a graphic post every two photos. */
function buildFeed(): Tile[] {
  const tiles: Tile[] = [];
  const photos = [...gallery];
  feedPosts.forEach((post, index) => {
    tiles.push({ kind: "post", post });
    const take = index === feedPosts.length - 1 ? photos.length : 2;
    photos.splice(0, take).forEach((shot) => tiles.push({ kind: "photo", shot }));
  });
  return tiles.slice(0, 8);
}

export function Rullino() {
  const feed = buildFeed();

  return (
    <section id="rullino" className={styles.rullino} aria-labelledby="rullino-title">
      <div className="container">
        <SectionHead
          id="rullino-title"
          title="Il rullino"
          marker={`@${venue.social.instagram.handle}`}
          intro="Piatti, tavoli, facce note. Quello che succede da OKAY finisce qui, e su Instagram."
          action={
            <ButtonLink href={venue.social.instagram.url} variant="paper" icon="instagram">
              Seguici su Instagram
            </ButtonLink>
          }
        />

        <ul role="list" className={styles.grid}>
          {feed.map((tile, index) => (
            <Reveal
              as="li"
              key={tile.kind === "post" ? tile.post.id : tile.shot.id}
              delay={index % 4}
            >
              {tile.kind === "post" ? (
                <div className={styles.post}>
                  <p className={styles.postTitle}>{tile.post.title}</p>
                  {"answer" in tile.post && tile.post.answer ? (
                    <p className={styles.postAnswer}>{tile.post.answer}</p>
                  ) : (
                    <p className={cn("signature", styles.postSign)}>
                      OKAY® Social Food Club Company
                    </p>
                  )}
                </div>
              ) : (
                <PhotoSlot
                  shot={{ ...tile.shot, ratio: "1/1" }}
                  sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 45vw, 90vw"
                />
              )}
            </Reveal>
          ))}
        </ul>

        <p className={cn("caption", styles.tag)}>
          Tagga @{venue.social.instagram.handle}: finisci nel rullino.
        </p>
      </div>
    </section>
  );
}
