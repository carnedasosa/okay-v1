import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.wrap} aria-labelledby="nf-title">
      <div className={cn("container", styles.inner)}>
        <p className={cn("caption", styles.code)}>Errore 404 · comanda non trovata</p>
        <div className={styles.titleRow}>
          <h1 id="nf-title" className={styles.title}>
            Not okay.
          </h1>
          <span className="marker" aria-hidden="true">
            Ops
          </span>
        </div>
        <p className={styles.lead}>Questa pagina non è nel menu. Torniamo a cose più buone?</p>
        <div className={styles.actions}>
          <ButtonLink href="/" icon="arrow" iconPosition="end" size="l">
            Torna alla home
          </ButtonLink>
          <ButtonLink href="/menu" variant="paper" size="l">
            Il menu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
