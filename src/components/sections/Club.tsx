import { clubRules } from "@/data/club";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import styles from "./Club.module.css";

export function Club() {
  return (
    <section id="club" className={styles.club} aria-labelledby="club-title">
      <div className="container">
        <SectionHead
          id="club-title"
          title={
            <>
              Le regole
              <br />
              del club
            </>
          }
          marker="Social"
          intro="Il nome dice «club», ma l'unico requisito è avere fame. Si mangia veloce, si sta bene, si condivide."
        />

        <ol role="list" className={styles.rules}>
          {clubRules.map((rule, index) => (
            <Reveal
              as="li"
              key={rule.id}
              className={cn(styles.rule, index === clubRules.length - 1 && styles.last)}
              delay={index % 3}
            >
              <span className={cn("caption", styles.number)}>
                Regola {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.title}>{rule.title}</h3>
              <p className={styles.body}>{rule.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
