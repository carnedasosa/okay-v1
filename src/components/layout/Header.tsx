"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { navigation } from "@/data/navigation";
import { venue } from "@/data/venue";
import { cn } from "@/lib/cn";
import { localPhone, telHref } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/ui/Wordmark";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the panel when the route (or hash) changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab" && panelRef.current) {
        // Keep focus inside the panel + the toggle button.
        const focusables = [
          toggle,
          ...panelRef.current.querySelectorAll<HTMLElement>("a, button"),
        ].filter(Boolean) as HTMLElement[];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const isCurrent = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header className={cn(styles.header, open && styles.open)}>
      <div className={cn("container", styles.bar)}>
        <Link href="/" className={styles.brand} aria-label="OKAY Social Food Club, home">
          <Wordmark />
        </Link>

        <nav className={styles.desktopNav} aria-label="Principale">
          <ul role="list">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.link}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a href={telHref(venue.phone.value)} className={styles.call}>
          <Icon name="phone" size={18} />
          <span>Prenota</span>
          <span className={styles.callNumber}>{localPhone(venue.phone.value)}</span>
        </a>

        <Link href="/#a-casa" className={styles.order}>
          Ordina ora
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Chiudi il menu" : "Apri il menu"}</span>
          <span className={styles.toggleLabel} aria-hidden="true">
            {open ? "Chiudi" : "Menu"}
          </span>
          <Icon name={open ? "close" : "menu"} size={22} />
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={styles.panel}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu di navigazione"
      >
        <nav aria-label="Principale mobile">
          <ol role="list" className={styles.panelList}>
            {[{ label: "Home", href: "/" }, ...navigation].map((item, index) => (
              <li key={item.href} style={{ "--i": index } as CSSProperties}>
                <Link
                  href={item.href}
                  className={styles.panelLink}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                >
                  <span className={styles.panelIndex} aria-hidden="true">
                    {String(index).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.panelFoot}>
          <p className="caption">
            {venue.address.street}
            <br />
            {venue.address.postalCode} {venue.address.city} · {venue.address.neighbourhood}
          </p>
          <a
            href={venue.social.instagram.url}
            className={cn("caption", styles.panelSocial)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="instagram" size={18} /> @{venue.social.instagram.handle}
            <span className="sr-only"> (si apre in una nuova scheda)</span>
          </a>
        </div>
      </div>
    </header>
  );
}
