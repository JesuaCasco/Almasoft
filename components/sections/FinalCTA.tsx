"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import "./FinalCTA.css";

type Choice = "neutral" | "no" | "yes";

// Restored from the production deployment preceding the Microfinanzas changes.
export function FinalCTA() {
  const [choice, setChoice] = useState<Choice>("neutral");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const switchRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const getParts = useCallback(() => {
    const root = switchRef.current;
    if (!root) return null;
    const svg = root.querySelector("svg");
    const toggle = root.querySelector("#toggle");
    const bothHands = root.querySelector("#bothHands");
    const robotHands = Array.from(root.querySelectorAll(".robotHand"));
    const robotHand = root.querySelector("#robotHand");
    const robotHand2 = root.querySelector("#robotHand2");
    const robotThumb = root.querySelector("#robotThumb");
    if (!svg || !toggle || !bothHands || !robotHand || !robotHand2 || !robotThumb || !robotHands.length) return null;
    return { svg, toggle, bothHands, robotHands, robotHand, robotHand2, robotThumb };
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = switchRef.current;
    if (!root) return;
    const controller = new AbortController();
    let context: gsap.Context | undefined;
    fetch("/robot-switch.svg", { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error("Unable to load robot switch");
        return response.text();
      })
      .then(svg => {
        if (controller.signal.aborted) return;
        // This is a version-controlled SVG asset, not user-supplied markup.
        root.innerHTML = svg.replace(/fill="#ffe500"/gi, 'fill="#d9e2ea"');
        context = gsap.context(() => {
          const q = gsap.utils.selector(root);
          gsap.set(q("svg"), { visibility: "visible", attr: { viewBox: "110 180 520 240" } });
          gsap.set(q("#panel"), {
            attr: { fill: "#ffffff", stroke: "#dbe8f2", "stroke-width": 1.6 },
            filter: "drop-shadow(0 12px 22px rgba(6, 27, 42, 0.12))",
          });
          gsap.set(q("#toggle"), { x: -75, attr: { fill: "#d9e2ea" }, opacity: 1, visibility: "visible", transformOrigin: "50% 50%" });
          gsap.set(q("#bothHands"), { x: 0, rotation: 0, transformOrigin: "20% 50%" });
          gsap.set(q("#robotHand"), { opacity: 1 });
          gsap.set(q("#robotHand2"), { opacity: 0 });
          gsap.set(q("#robotThumb"), { rotation: 23, transformOrigin: "55% 95%" });
        }, root);
        setIsReady(true);
      })
      .catch(() => { if (!controller.signal.aborted) setIsReady(false); });
    return () => {
      controller.abort();
      timelineRef.current?.kill();
      timelineRef.current = null;
      context?.revert();
      root.innerHTML = "";
    };
  }, []);

  useLayoutEffect(() => {
    if (!isReady || isAnimating) return;
    const parts = getParts();
    if (!parts) return;
    const state = choice === "yes" ? { x: 0, fill: "#10b981" }
      : choice === "no" ? { x: -150, fill: "#f26b6b" } : { x: -75, fill: "#d9e2ea" };
    gsap.set(parts.toggle, { x: state.x, attr: { fill: state.fill }, opacity: 1, visibility: "visible" });
  }, [choice, getParts, isAnimating, isReady]);

  const select = (selected: "no" | "yes") => {
    if (isAnimating) return;
    if (reduceMotion) {
      setChoice("yes");
      setHasResult(true);
      return;
    }
    const parts = getParts();
    if (!parts) return;
    setChoice(selected);
    setHasResult(false);
    setIsAnimating(true);
    timelineRef.current?.kill();
    gsap.killTweensOf([parts.toggle, parts.bothHands, ...parts.robotHands, parts.robotThumb]);
    const timeline = gsap.timeline({
      defaults: { duration: 0.34, ease: "expo.inOut" },
      onComplete: () => {
        gsap.set(parts.toggle, { x: 0, attr: { fill: "#10b981" }, opacity: 1, visibility: "visible" });
        timelineRef.current = null;
        setChoice("yes");
        setIsAnimating(false);
        setHasResult(true);
      },
    });
    timelineRef.current = timeline;
    timeline
      .set(parts.svg, { visibility: "visible", attr: { viewBox: "110 180 520 240" } })
      .set(parts.toggle, { x: -75, attr: { fill: "#d9e2ea" }, opacity: 1, visibility: "visible", transformOrigin: "50% 50%" })
      .set(parts.robotHands, { opacity: gsap.utils.wrap([1, 0]) })
      .set(parts.bothHands, { x: 0, rotation: 0, transformOrigin: "20% 50%" })
      .set(parts.robotThumb, { rotation: 23, transformOrigin: "55% 95%" });
    if (selected === "no") {
      timeline.to(parts.toggle, { x: -150, attr: { fill: "#f26b6b" } })
        .add("fingerIn", "+=0.5")
        .to(parts.bothHands, { x: 30 }, "fingerIn")
        .to(parts.toggle, { x: -140, attr: { fill: "#f26b6b" }, duration: 0.43, ease: "elastic(0.3, 0.6)" }, "-=0.25")
        .add("handIn", "+=0.25")
        .to(parts.bothHands, { x: 169 }, "handIn")
        .to(parts.toggle, { x: 0, attr: { fill: "#10b981" } }, "handIn");
    } else {
      timeline.to(parts.toggle, { x: 0, attr: { fill: "#10b981" }, duration: 0.42 })
        .add("handIn", "+=0.18")
        .to(parts.bothHands, { x: 189 }, "handIn");
    }
    timeline.add("thumbsUp", "+=0.4")
      .to(parts.robotHands, { duration: 0.116, opacity: gsap.utils.wrap([0, 1]) }, "thumbsUp")
      .fromTo(parts.robotThumb, { rotation: 45 }, { rotation: 0, duration: 1.3, transformOrigin: "55% 95%", ease: "elastic(0.86, 0.3)" }, "thumbsUp")
      .to(parts.bothHands, { x: "+=20", duration: 0.3, ease: "power2.inOut" }, "thumbsUp")
      .to(parts.bothHands, { rotation: "-=20", duration: 0.2, transformOrigin: "20% 50%", ease: "power2.inOut" }, "thumbsUp")
      .to(parts.bothHands, { rotation: 0, duration: 0.4, transformOrigin: "20% 50%", ease: "elastic(0.86, 0.6)" }, "thumbsUp+=0.2")
      .add("handOut")
      .to(parts.bothHands, { x: 0, ease: "back.in(1)" }, "handOut")
      .to(parts.robotThumb, { rotation: 23, ease: "power2.in" }, "handOut");
  };

  return (
    <section id="vida-informacion" className={`final-cta robot-cta life-cta is-${choice}${isAnimating ? " is-animating" : ""}${hasResult ? " has-result" : ""}`}>
      <Container>
        <Reveal className="life-cta-card">
          <div className="life-cta-brand" aria-hidden="true">
            <Image src="/brand/almasoft-logo-tagline.png" alt="" width={274} height={88} />
          </div>
          <div className="life-cta-robot">
            <Image src="/brand/almasoft-robot.png" alt="Robot de AlmaSoft" width={1302} height={1208} sizes="(max-width: 760px) 72vw, 34vw" />
          </div>
          <div className="life-cta-content">
            <div className="life-cta-copy">
              <h2>¿Quieres darle vida a tu información?</h2>
              <p>Transforma tus datos en decisiones, eficiencia y crecimiento.</p>
            </div>
            <div className="life-switch" role="radiogroup" aria-label="Respuesta al CTA de AlmaSoft">
              <button type="button" className="life-switch-option life-switch-option-no" aria-checked={choice === "no"} disabled={isAnimating || !isReady} role="radio" onClick={() => select("no")}>NO</button>
              <div ref={switchRef} className="life-switch-svg" aria-hidden="true" />
              <button type="button" className="life-switch-option life-switch-option-yes" aria-checked={choice === "yes"} disabled={isAnimating || !isReady} role="radio" onClick={() => select("yes")}>SÍ</button>
            </div>
            <div className="life-cta-result" aria-live="polite">
              <span aria-hidden="true">✓</span>
              <div><strong>¡Excelente decisión!</strong><p>Hablemos de cómo llevar tu operación al siguiente nivel.</p></div>
              <Button href="#contacto">Solicitar demostración</Button>
            </div>
          </div>
          <div className="life-cta-benefits" aria-label="Beneficios">
            <span>Decisiones más inteligentes</span><span>Operaciones más eficientes</span>
            <span>Crecimiento sostenible</span><span>Información segura y confiable</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
