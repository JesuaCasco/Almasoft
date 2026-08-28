"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { brandAssets } from "@/config/site";

type HeroModule = {
  key: string;
  label: string[];
  iconSrc: string;
  x: number;
  y: number;
  width: number;
  height: number;
  anchor: "right" | "left" | "top-right" | "top-left" | "top";
  delay: string;
};

const heroModules: HeroModule[] = [
  {
    key: "microfinance",
    label: ["AS", "Microfinanzas"],
    iconSrc: "/brochure/solution-microfinance.png",
    x: 76,
    y: 102,
    width: 242,
    height: 74,
    anchor: "right",
    delay: "0s",
  },
  {
    key: "coop",
    label: ["AS", "Cooperativas"],
    iconSrc: "/brochure/solution-coop.png",
    x: 682,
    y: 102,
    width: 242,
    height: 74,
    anchor: "left",
    delay: "0.85s",
  },
  {
    key: "payroll",
    label: ["AS", "Planilla"],
    iconSrc: "/brochure/solution-payroll.png",
    x: 76,
    y: 328,
    width: 222,
    height: 74,
    anchor: "right",
    delay: "1.7s",
  },
  {
    key: "accounting",
    label: ["AS", "Contabilidad"],
    iconSrc: "/brochure/solution-accounting.png",
    x: 702,
    y: 328,
    width: 222,
    height: 74,
    anchor: "left",
    delay: "2.55s",
  },
  {
    key: "billingInventory",
    label: ["Facturación", "e Inventario"],
    iconSrc: "/brochure/solution-billing-inventory.png",
    x: 364,
    y: 564,
    width: 272,
    height: 78,
    anchor: "top",
    delay: "3.4s",
  },
];

const heroCore = { cx: 500, cy: 350, radius: 78 };

function moduleAnchor(module: HeroModule) {
  if (module.anchor === "right") {
    return { x: module.x + module.width, y: module.y + module.height / 2 };
  }

  if (module.anchor === "left") {
    return { x: module.x, y: module.y + module.height / 2 };
  }

  if (module.anchor === "top-right") {
    return { x: module.x + module.width - 18, y: module.y };
  }

  if (module.anchor === "top") {
    return { x: module.x + module.width / 2, y: module.y };
  }

  return { x: module.x + 18, y: module.y };
}

function coreEdgePoint(start: { x: number; y: number }) {
  const dx = start.x - heroCore.cx;
  const dy = start.y - heroCore.cy;
  const length = Math.hypot(dx, dy);

  return {
    x: heroCore.cx + (dx / length) * heroCore.radius,
    y: heroCore.cy + (dy / length) * heroCore.radius,
  };
}

function connectionGeometry(module: HeroModule) {
  const start = moduleAnchor(module);
  const end = coreEdgePoint(start);

  if (module.anchor === "top") {
    return {
      start,
      c1: { x: start.x, y: start.y - 58 },
      c2: { x: end.x, y: end.y + 54 },
      end,
      path: `M ${start.x} ${start.y} C ${start.x} ${start.y - 58}, ${end.x} ${end.y + 54}, ${end.x} ${end.y}`,
    };
  }

  const side = start.x < heroCore.cx ? 1 : -1;
  const verticalBend = module.anchor.includes("top") ? -28 : 18;
  const c1 = {
    x: start.x + side * Math.min(Math.abs(heroCore.cx - start.x) * 0.38, 118),
    y: start.y + verticalBend,
  };
  const c2 = {
    x: end.x - side * Math.min(Math.abs(heroCore.cx - start.x) * 0.24, 92),
    y: end.y - verticalBend * 0.45,
  };

  return {
    start,
    c1,
    c2,
    end,
    path: `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`,
  };
}

function cubicPoint(
  t: number,
  start: { x: number; y: number },
  c1: { x: number; y: number },
  c2: { x: number; y: number },
  end: { x: number; y: number },
) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;

  return {
    x: mt2 * mt * start.x + 3 * mt2 * t * c1.x + 3 * mt * t2 * c2.x + t2 * t * end.x,
    y: mt2 * mt * start.y + 3 * mt2 * t * c1.y + 3 * mt * t2 * c2.y + t2 * t * end.y,
  };
}

function delayToMs(delay: string) {
  return Number.parseFloat(delay) * 1000;
}

export function BrandFlow() {
  const travelers = useMemo(
    () =>
      heroModules.map((module) => ({
        key: module.key,
        delayMs: delayToMs(module.delay),
        geometry: connectionGeometry(module),
      })),
    [],
  );
  const travelerRefs = useRef<Array<SVGCircleElement | null>>([]);

  useEffect(() => {
    const duration = 4200;
    let frame = 0;

    const tick = (timestamp: number) => {
      travelers.forEach((traveler, index) => {
        const node = travelerRefs.current[index];
        if (!node) return;

        const elapsed = (timestamp - traveler.delayMs) % duration;
        const progress = elapsed < 0 ? (elapsed + duration) / duration : elapsed / duration;
        const point = cubicPoint(
          progress,
          traveler.geometry.start,
          traveler.geometry.c1,
          traveler.geometry.c2,
          traveler.geometry.end,
        );
        const opacity = progress < 0.12 || progress > 0.82 ? 0 : 0.9;

        node.setAttribute("cx", point.x.toFixed(2));
        node.setAttribute("cy", point.y.toFixed(2));
        node.style.opacity = String(opacity);
      });

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [travelers]);

  return (
    <div className="brand-flow" aria-label="Flujo visual de información empresarial organizada por AlmaSoft">
      <svg className="flow-lines hero-flow-svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <filter id="hero-module-shadow" x="-20%" y="-40%" width="140%" height="180%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="rgba(6, 27, 42, 0.12)" />
          </filter>
          <filter id="hero-core-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="rgba(0, 91, 152, 0.22)" />
          </filter>
        </defs>

        {heroModules.map((module) => {
          const geometry = connectionGeometry(module);

          return (
            <g key={`${module.key}-connection`}>
              <path
                className={`draw connection-${module.key}`}
                d={geometry.path}
                fill="none"
                stroke="rgba(0, 113, 188, 0.45)"
                strokeWidth="1.8"
                strokeDasharray="8 8"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
            </g>
          );
        })}

        {travelers.map((traveler, index) => (
          <circle
            key={`${traveler.key}-traveler`}
            ref={(node) => {
              travelerRefs.current[index] = node;
            }}
            className="flow-traveler"
            cx={traveler.geometry.start.x}
            cy={traveler.geometry.start.y}
            r="5"
          />
        ))}

        {heroModules.map((module) => {
          const labelStartY = module.label.length > 1 ? module.y + module.height / 2 - 7 : module.y + module.height / 2 + 5;

          return (
            <g key={module.key} className="hero-flow-module" filter="url(#hero-module-shadow)">
              <rect
                x={module.x}
                y={module.y}
                width={module.width}
                height={module.height}
                rx="10"
                fill="rgba(255, 255, 255, 0.94)"
                stroke="rgba(0, 113, 188, 0.22)"
                strokeWidth="1"
              />
              <image
                href={module.iconSrc}
                x={module.x + 18}
                y={module.y + module.height / 2 - 20}
                width="40"
                height="40"
                preserveAspectRatio="xMidYMid meet"
              />
              <text x={module.x + 70} y={labelStartY} textAnchor="start">
                {module.label.map((line, index) => (
                  <tspan key={line} x={module.x + 70} dy={index === 0 ? 0 : 18}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}

        <g className="hero-flow-core" filter="url(#hero-core-shadow)">
          <circle cx={heroCore.cx} cy={heroCore.cy} r={heroCore.radius} fill="rgba(255, 255, 255, 0.96)" stroke="rgba(0, 113, 188, 0.24)" />
          <circle cx={heroCore.cx} cy={heroCore.cy} r={heroCore.radius - 9} fill="none" stroke="rgba(234, 245, 252, 0.92)" strokeWidth="12" />
          <image href={brandAssets.icon} x={heroCore.cx - 25} y={heroCore.cy - 48} width="50" height="62" preserveAspectRatio="xMidYMid meet" />
          <text x={heroCore.cx} y={heroCore.cy + 33} textAnchor="middle">
            ALMASOFT
          </text>
        </g>
      </svg>
    </div>
  );
}

export function SolutionMap({ concepts }: { concepts: string[] }) {
  return (
    <div className="solution-map" aria-hidden="true">
      <div className="solution-center">
        <Image src={brandAssets.icon} alt="" width={58} height={72} />
      </div>
      {concepts.map((concept, index) => (
        <span key={concept} className={`solution-node solution-node-${index + 1}`}>
          {concept}
        </span>
      ))}
    </div>
  );
}

export function MicrofinanceFlow({ concepts }: { concepts: string[] }) {
  const steps = concepts.slice(0, 5);

  return (
    <div className="operation-flow microfinance-flow" aria-hidden="true">
      <div className="operation-seal">
        <Image src={brandAssets.icon} alt="" width={42} height={52} />
      </div>
      <div className="operation-path">
        {steps.map((concept, index) => (
          <div key={concept} className="operation-step">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{concept}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CooperativeFlow({ concepts }: { concepts: string[] }) {
  const [
    socio = "Socios",
    ahorro = "Ahorros",
    credito = "Créditos",
    movimientos = "Movimientos",
    informacion = "Información",
  ] = concepts;

  return (
    <div className="cooperative-flow" aria-hidden="true">
      <svg className="cooperative-lines" viewBox="0 0 100 100">
        <path d="M50 39 L50 20" />
        <path d="M39 50 L23 50" />
        <path d="M61 50 L77 50" />
        <path d="M50 61 L50 80" />
        <circle cx="50" cy="20" r="1.3" />
        <circle cx="23" cy="50" r="1.3" />
        <circle cx="77" cy="50" r="1.3" />
        <circle cx="50" cy="80" r="1.3" />
      </svg>
      <div className="coop-node coop-top">{socio}</div>
      <div className="coop-node coop-left">{ahorro}</div>
      <div className="coop-node coop-right">{credito}</div>
      <div className="coop-node coop-bottom">{movimientos}</div>
      <div className="coop-core">
        <Image src={brandAssets.icon} alt="" width={54} height={67} />
        <span>{informacion}</span>
      </div>
    </div>
  );
}

export function CustomFlow() {
  const steps = ["Proceso", "Necesidad", "Diseño", "Software", "Operación"];

  return (
    <div className="custom-flow" aria-label="Proceso, necesidad, diseño, software y operación conectados">
      {steps.map((step, index) => (
        <div key={step} className="custom-flow-step">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step}</strong>
        </div>
      ))}
    </div>
  );
}
