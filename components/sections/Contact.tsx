"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

const organizationTypes = [
  "Microfinanciera",
  "Cooperativa",
  "Comercio",
  "Empresa de servicios",
  "Restaurante / Cafetería",
  "Otro",
];

type FormState = Record<string, string>;

const initialForm: FormState = {
  nombre: "",
  empresa: "",
  correo: "",
  telefono: "",
  organizacion: "",
  necesidad: "",
};

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const contactLinks = useMemo(
    () =>
      [
        siteConfig.email ? { label: "Correo", href: `mailto:${siteConfig.email}`, value: siteConfig.email } : null,
        siteConfig.phone ? { label: "Teléfono", href: `tel:${siteConfig.phone}`, value: siteConfig.phone } : null,
        siteConfig.whatsapp ? { label: "WhatsApp", href: siteConfig.whatsapp, value: "Abrir conversación" } : null,
      ].filter(Boolean) as { label: string; href: string; value: string }[],
    [],
  );

  function updateField(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contacto" className="contact-section">
      <Container className="contact-grid">
        <Reveal className="contact-copy">
          <p className="eyebrow">CONTACTO</p>
          <h2>Hablemos del proceso que necesitas resolver.</h2>
          <p>
            Este formulario deja preparada la información para una futura conexión con backend. Por ahora no simula un
            envío ni muestra confirmaciones que todavía no existen.
          </p>
          {contactLinks.length ? (
            <div className="contact-links">
              {contactLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  <span>{link.label}</span>
                  <strong>{link.value}</strong>
                </a>
              ))}
            </div>
          ) : null}
        </Reveal>
        <Reveal>
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="field-grid">
              <label>
                Nombre
                <input required value={form.nombre} onChange={(event) => updateField("nombre", event.target.value)} />
              </label>
              <label>
                Empresa
                <input required value={form.empresa} onChange={(event) => updateField("empresa", event.target.value)} />
              </label>
              <label>
                Correo
                <input
                  required
                  type="email"
                  value={form.correo}
                  onChange={(event) => updateField("correo", event.target.value)}
                />
              </label>
              <label>
                Teléfono
                <input
                  required
                  type="tel"
                  value={form.telefono}
                  onChange={(event) => updateField("telefono", event.target.value)}
                />
              </label>
            </div>
            <label>
              Tipo de organización
              <select
                required
                value={form.organizacion}
                onChange={(event) => updateField("organizacion", event.target.value)}
              >
                <option value="">Selecciona una opción</option>
                {organizationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Cuéntanos qué necesitas resolver
              <textarea
                required
                rows={5}
                value={form.necesidad}
                onChange={(event) => updateField("necesidad", event.target.value)}
              />
            </label>
            <button type="submit">Enviar solicitud</button>
            {submitted ? (
              <p className="form-note" role="status">
                La conexión de envío aún no está configurada. Revisa los datos y agrega el endpoint cuando el backend
                esté definido.
              </p>
            ) : null}
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
