import { marqueeWords } from "@/data/club";
import { Club } from "@/components/sections/Club";
import { Delivery } from "@/components/sections/Delivery";
import { Events } from "@/components/sections/Events";
import { Hero } from "@/components/sections/Hero";
import { Highlights } from "@/components/sections/Highlights";
import { Marquee } from "@/components/sections/Marquee";
import { Rullino } from "@/components/sections/Rullino";
import { SmashAnatomy } from "@/components/sections/SmashAnatomy";
import { Visit } from "@/components/sections/Visit";
import { Voices } from "@/components/sections/Voices";

/**
 * Home narrative:
 * the question (hero) → what's on the plate (highlights) → the signature
 * (smash) → the people (club) → proof (voices) → the vibe (rullino)
 * → at home (delivery) → [nights, when announced] → come by (visit).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee
        words={marqueeWords}
        label="Smash, pastrami, gyoza, nachos, caciocavallo e tartufo, cheesecake, birre, asporto, delivery"
      />
      <Highlights />
      <SmashAnatomy />
      <Club />
      <Voices />
      <Marquee
        words={["Tagga @okay.bari", "Social food club", "Bari", "Picone"]}
        tone="paper"
        reverse
        label="Tagga @okay.bari"
      />
      <Rullino />
      <Delivery />
      <Events />
      <Visit />
    </>
  );
}
