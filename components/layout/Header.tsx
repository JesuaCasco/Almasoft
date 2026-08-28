"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { brandAssets, siteConfig } from "@/config/site";
import { navigation } from "@/data/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.toggle("menu-open", open);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Link href="#main-content" className="skip-link">
        Saltar al contenido
      </Link>
      <div className="header-shell">
        <Link href="#inicio" className="brand-link" aria-label="Ir al inicio de AlmaSoft" onClick={() => setOpen(false)}>
          <Image src={brandAssets.logo} alt={siteConfig.name} width={240} height={64} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="#contacto">
          Solicitar demostración
        </Link>
        <button
          type="button"
          className="menu-button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`}>
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link href="#contacto" className="mobile-cta" onClick={() => setOpen(false)}>
          Solicitar demostración
        </Link>
      </div>
    </header>
  );
}
