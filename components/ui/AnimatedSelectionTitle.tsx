"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type SelectionMetrics = {
  frameX: number;
  frameY: number;
  frameWidth: number;
  frameHeight: number;
  cursorStartX: number;
  cursorStartY: number;
  cursorTargetX: number;
  cursorTargetY: number;
};

type SelectionStyle = CSSProperties & Record<`--selection-${string}`, string>;

export function AnimatedSelectionTitle({ children }: { children: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [metrics, setMetrics] = useState<SelectionMetrics | null>(null);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const title = titleRef.current;
    if (!stage || !title) return;

    const stageRect = stage.getBoundingClientRect();
    const titleRect = title.getBoundingClientRect();
    const framePadding = 10;

    setMetrics({
      frameX: titleRect.left - stageRect.left - framePadding,
      frameY: titleRect.top - stageRect.top - framePadding,
      frameWidth: titleRect.width + framePadding * 2,
      frameHeight: titleRect.height + framePadding * 2,
      cursorStartX: Math.min(stageRect.width - 24, titleRect.width + 72),
      cursorStartY: titleRect.height + 64,
      cursorTargetX: titleRect.left - stageRect.left + titleRect.width * 0.72,
      cursorTargetY: titleRect.top - stageRect.top + titleRect.height * 0.62,
    });
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const title = titleRef.current;
    if (!stage || !title) return;

    const frame = requestAnimationFrame(measure);
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(stage);
    resizeObserver.observe(title);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [measure]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        measure();
        setIsActive(true);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, [measure]);

  const style: SelectionStyle | undefined = metrics
    ? {
        "--selection-frame-x": `${metrics.frameX}px`,
        "--selection-frame-y": `${metrics.frameY}px`,
        "--selection-frame-width": `${metrics.frameWidth}px`,
        "--selection-frame-height": `${metrics.frameHeight}px`,
        "--selection-cursor-start-x": `${metrics.cursorStartX}px`,
        "--selection-cursor-start-y": `${metrics.cursorStartY}px`,
        "--selection-cursor-target-x": `${metrics.cursorTargetX}px`,
        "--selection-cursor-target-y": `${metrics.cursorTargetY}px`,
      }
    : undefined;

  return (
    <div
      ref={stageRef}
      className={`custom-title-selection${isActive && metrics ? " is-active" : ""}`}
      style={style}
    >
      <h2 ref={titleRef}>{children}</h2>
      <div className="custom-title-selection-frame" aria-hidden="true">
        <i /><i /><i /><i />
      </div>
      <div className="custom-title-selection-cursor" aria-hidden="true">
        <svg viewBox="0 0 28 34" focusable="false">
          <path d="M2 2v25l7.2-6.2 4.7 10.1 5-2.4-4.7-9.7 9.8-.7L2 2Z" />
        </svg>
        <span />
      </div>
    </div>
  );
}
