"use client";

import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type Ref } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type SelectedOption = "no" | "yes" | null;

export function FinalCTA() {
  const [selectedOption, setSelectedOption] = useState<SelectedOption>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const svgScopeRef = useRef<SVGSVGElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isNo = selectedOption === "no";
  const isYes = selectedOption === "yes";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useLayoutEffect(() => {
    const scope = svgScopeRef.current;

    if (!scope) {
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scope);
      const allRobotHands = q("#allRobotHands");
      const robotThumb = q("#robotThumb");
      const robotIndexFinger = q("#robotIndexFinger");
      const robotHand = q("#robotHand");
      const robotHandHorns = q("#robotHandHorns");
      const offDot = q("#offDot");
      const onDot = q("#onDot");
      const offRing = q("#offRing");
      const onRing = q("#onRing");
      const offText = q("#offText");
      const onText = q("#onText");
      const movingHand = [...allRobotHands, ...robotThumb];
      const movingHandAndOffDot = [...allRobotHands, ...robotThumb, ...offDot];
      const uiGrey = "#c7d2da";
      const uiNavy = "#061b2a";
      const uiBlue = "#0071bc";

      gsap.set(robotHandHorns, { opacity: 0 });
      gsap.set(robotHand, { opacity: 1 });
      gsap.set(robotThumb, { opacity: 1 });

      const timeline = gsap.timeline({
        defaults: { duration: 0.3 },
        paused: true,
        onComplete: () => {
          setSelectedOption("yes");
          setIsAnimating(false);
        },
      });

      timelineRef.current = timeline;

      timeline
        .add("offSelected")
        .to(onDot, { attr: { r: 0 } }, "offSelected")
        .to(onRing, { stroke: uiGrey }, "offSelected")
        .to(onText, { fill: uiGrey }, "offSelected")
        .to(offDot, { attr: { r: 14 }, duration: 0.6, ease: "elastic.out(0.6, 0.4)" }, "offSelected")
        .to(offRing, { stroke: uiNavy }, "offSelected")
        .to(offText, { fill: uiNavy }, "offSelected")
        .add("handIn", "+=1")
        .from(movingHand, { x: 60, y: -180, duration: 0.4, ease: "back.out(0.3)" }, "handIn")
        .from(robotThumb, { rotation: -20, transformOrigin: "20% 20%", duration: 0.4, ease: "expo.inOut" }, "handIn+=0.1")
        .from(robotIndexFinger, { rotation: 15, transformOrigin: "100% 0%", duration: 0.4, ease: "expo.inOut" }, "handIn+=0.1")
        .add("handAcross")
        .to(movingHand, { x: 120, y: 0, ease: "back.inOut(0.53)" }, "handAcross")
        .to(movingHandAndOffDot, { y: "-=50", duration: 0.15, ease: "sine.in" }, "handAcross")
        .to(movingHandAndOffDot, { y: "+=50", duration: 0.15, ease: "sine.out" }, "handAcross+=0.15")
        .to(offDot, { x: 120, ease: "back.inOut(0.3)" }, "handAcross")
        .to(robotThumb, { rotation: -10, transformOrigin: "20% 20%", duration: 0.4, ease: "expo.inOut" }, "handAcross+=0.3")
        .to(robotIndexFinger, { rotation: 5, transformOrigin: "100% 0%", duration: 0.4, ease: "expo.inOut" }, "handAcross+=0.3")
        .to(movingHand, { duration: 0.4, y: "-=20", ease: "sine.inOut" }, "handAcross+=0.3")
        .add("hornHands", "+=0.35")
        .to(movingHand, { duration: 0.166, y: "+=20" }, "hornHands")
        .to([...robotHand, ...robotHandHorns, ...robotThumb], { opacity: gsap.utils.wrap([0, 1, 0]), duration: 0.06 }, "hornHands")
        .to(allRobotHands, { rotation: "+=12", transformOrigin: "80% 30%", duration: 0.08, ease: "sine.inOut" }, "hornHands")
        .to(allRobotHands, { rotation: "-=12", scale: 1.1, transformOrigin: "100% 30%", repeat: 9, yoyo: true, duration: 0.08, ease: "sine.inOut" }, "hornHands+=0.166")
        .to(robotThumb, { rotation: 20, scaleY: 0.75, transformOrigin: "20% 20%", duration: 0.1, ease: "expo.in" }, "hornHands-=0.1")
        .add("handOut", "+=0")
        .to(movingHand, { x: 160, y: -200, ease: "sine.in" }, "handOut")
        .to(onRing, { stroke: uiBlue }, "hornHands-=0.5")
        .to(onText, { fill: uiBlue }, "hornHands-=0.5")
        .to(offRing, { stroke: uiGrey }, "hornHands-=0.5")
        .to(offText, { fill: uiGrey }, "hornHands-=0.5")
        .set([...onDot, ...offDot], { attr: { r: gsap.utils.wrap([14, 0]) }, x: 0 }, "handOut");
    }, scope);

    return () => {
      ctx.revert();
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, []);

  const selectNo = () => {
    if (isAnimating) {
      return;
    }

    if (reduceMotion) {
      setSelectedOption("yes");
      return;
    }

    setSelectedOption("no");
    setIsAnimating(true);
    timelineRef.current?.restart();
  };

  const selectYes = () => {
    if (isAnimating) {
      return;
    }

    setSelectedOption("yes");
  };

  const handleKeyDown = (event: KeyboardEvent<SVGGElement>, option: Exclude<SelectedOption, null>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (option === "no") {
        selectNo();
      } else {
        selectYes();
      }
    }
  };

  return (
    <section className={`final-cta robot-cta${isNo ? " is-no" : ""}${isYes ? " is-yes" : ""}${isAnimating ? " is-animating" : ""}${reduceMotion ? " reduce-motion" : ""}`}>
      <Container>
        <Reveal className="robot-cta-panel">
          <div className="robot-cta-copy">
            <p className="eyebrow">CTA interactivo</p>
            <h2>¿Quieres darle vida a tu información?</h2>
          </div>

          <div className="robot-cta-stage" aria-live="polite">
            <RobotSwitchSvg
              svgRef={svgScopeRef}
              isNo={isNo}
              isYes={isYes}
              isAnimating={isAnimating}
              onSelectNo={selectNo}
              onSelectYes={selectYes}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="robot-cta-result">
            <p>Ahora sí, dale vida a tu información.</p>
            <Button href="#contacto">Solicitar demostración</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

type RobotSwitchSvgProps = {
  svgRef: Ref<SVGSVGElement>;
  isNo: boolean;
  isYes: boolean;
  isAnimating: boolean;
  onSelectNo: () => void;
  onSelectYes: () => void;
  onKeyDown: (event: KeyboardEvent<SVGGElement>, option: Exclude<SelectedOption, null>) => void;
};

function RobotSwitchSvg({ svgRef, isNo, isYes, isAnimating, onSelectNo, onSelectYes, onKeyDown }: RobotSwitchSvgProps) {
  const neutralStroke = "#c7d2da";
  const noStroke = isNo ? "#061b2a" : neutralStroke;
  const yesStroke = isYes ? "#0071bc" : neutralStroke;
  const noFill = isNo ? "#061b2a" : "#6d7c86";
  const yesFill = isYes ? "#0071bc" : "#6d7c86";
  const noDotRadius = isNo ? 14 : 0;
  const yesDotRadius = isYes ? 14 : 0;

  return (
    <svg
      ref={svgRef}
      id="mainSVG"
      className="robot-cta-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Selector NO SÍ con mano robótica"
    >
      <defs>
        <clipPath id="handMask">
          <rect className="handMask" x="214.68" y="130" width="370.64" height="303.25" rx="51" ry="51" fill="red" stroke="none" strokeMiterlimit="10" strokeWidth="2" />
        </clipPath>
      </defs>
      <rect id="bg" x="214.68" y="130" width="370.64" height="303.25" rx="38" fill="#fff" stroke="#c7d2da" strokeMiterlimit="10" strokeWidth="3" />
      <g id="whole">
        <g
          id="offControl"
          className="robot-svg-control"
          role="radio"
          aria-checked={isNo}
          aria-disabled={isAnimating}
          tabIndex={isAnimating ? -1 : 0}
          onClick={onSelectNo}
          onKeyDown={(event) => onKeyDown(event, "no")}
        >
          <circle id="offRing" cx="340" cy="300" r="30" fill="#fff" stroke={noStroke} strokeMiterlimit="10" strokeWidth="3" />
          <text className="label" id="offText" x="340" y="372" fill={noFill}>
            NO
          </text>
        </g>
        <g
          id="onControl"
          className="robot-svg-control"
          role="radio"
          aria-checked={isYes}
          aria-disabled={isAnimating}
          tabIndex={isAnimating ? -1 : 0}
          onClick={onSelectYes}
          onKeyDown={(event) => onKeyDown(event, "yes")}
        >
          <circle id="onRing" cx="460" cy="300" r="30" fill="none" stroke={yesStroke} strokeMiterlimit="10" strokeWidth="3" />
          <text className="label" id="onText" x="462" y="372" fill={yesFill}>
            SÍ
          </text>
        </g>
        <g clipPath="url(#handMask)">
          <g id="robotThumb">
            <path d="m345.6,221.86l14.68,42.01-2.07,14.92c-.23,4.56-1.71,13.19-9.22,12.62-4.66-.36-7.4-4.02-6.92-7.55l2.09-14-13.94-36.13s2.53-10.42,15.38-11.87Z" fill="#adc4d9" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.56" />
            <path d="m343.67,268.69c7.37,2.01,12.83.25,16.6-4.82" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.56" />
          </g>
        </g>
        <circle id="offDot" cx="340" cy="300" r={noDotRadius} fill="#0071bc" />
        <circle id="onDot" cx="460" cy="300" r={yesDotRadius} fill="#0071bc" />
        <g clipPath="url(#handMask)">
          <g id="allRobotHands">
            <path id="palmBlock" d="m283.85,230.1c.72,19.66,17.24,35.01,36.89,34.29,5.9-.22,11.65-1.89,16.74-4.88,5.88-5.02,9.63-13.18,12.03-23.33h.01s-.05-.14-.05-.14c-1.94-4.18-2.76-8.79-2.39-13.38.65-4.82-1.8-9.52-6.12-11.75l-21.2-10.93c-5.16-2.66-11.51-.64-14.17,4.53,0,0,0,0,0,0-5.01,9.73-13.05,9.6-21.77,25.57l.02.03Z" fill="#fff" />
            <g id="robotHand">
              <g id="robotIndexFinger">
                <path d="m317.72,266.55l-4.03,22.24,6.69,13.83s2.93,7.1,9.82,5.76,4.83-7.53,4.35-9.24-4.15-12.12-4.15-12.12l6.97-27.99" fill="#fff" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
                <path d="m330.4,287.03c-3.72,5.5-9.48,5.57-16.71,1.76" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              </g>
              <path d="m276.02,261.19c-3.89-1.99-5.42-6.76-3.43-10.64,0,0,0-.02.01-.03l9.13-18.97c9.35-18.13,18.01-17.69,23.38-28.06,2.76-5.35,9.33-7.45,14.68-4.69,0,0,0,0,0,0l21.95,11.32c4.47,2.31,7.01,7.18,6.33,12.17-.38,4.75.47,9.53,2.48,13.85l-22.27,7.94c-3.65,7.18-17.06,35.3-17.06,35.3-2.01,3.88-6.8,5.4-10.68,3.39s-5.4-6.8-3.39-10.68l1.82-3.52c-2.01,3.89-6.78,5.42-10.67,3.41-3.89-2.01-5.42-6.78-3.41-10.67l1.82-3.52c-1.99,3.88-6.76,5.42-10.65,3.42-.01,0-.02-.01-.03-.02Z" fill="#fff" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m302.1,261.18l-3.16,7.39" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m289.76,250.54l-3.09,7.25" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m343.91,211.23l-24.65-12.71,5.66-10.99,24.65,12.71-5.66,10.99Z" fill="#6a7784" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m403.11,114.99c-2.51,21.87-19.99,48.22-28.49,59.59l-14.11,23.21c-2.2,3.46-6.67,4.67-10.31,2.79l-25.87-13.34c-3.66-1.87-5.28-6.23-3.72-10.03,0,0,4.55-19.44,6.99-24.56s15.03-34.74,33.46-59.07l42.05,21.41Z" fill="#fff" />
              <path d="m321.87,184.17l9.09,4.56c-2.48-1.77-3.3-5.47-1.87-8.93l10.78-24.9c4.56-13.38,16.14-42.73,31.18-58.22l-9.83-5.01c-12.59,17.7-27.97,45.3-32.53,58.68l-7.15,22.99c-1.57,3.78-2.58,7.76.34,10.82Z" fill="#f8f8f8" />
              <path d="m282.6,229.97c.74,20.35,17.85,36.25,38.2,35.51,6.11-.22,12.06-1.96,17.33-5.06l12.45-24.16h.01s-.05-.15-.05-.15c-2-4.33-2.86-9.1-2.48-13.85.68-4.99-1.86-9.86-6.33-12.17l-21.95-11.32c-5.35-2.76-11.92-.66-14.68,4.69,0,0,0,0,0,0-5.19,10.07-13.51,9.95-22.54,26.47l.03.03Z" fill="#fff" />
              <path d="m282.55,229.81l-.03-.02c4.52-8.26,8.85-12.36,12.71-15.66,3.86-3.29,7.24-5.79,9.83-10.82,2.76-5.35,9.34-7.45,14.68-4.69l7.69,3.97c-5.16-2.09-11.15.06-13.75,5.11-2.59,5.04-5.98,7.52-9.84,10.82s-8.19,7.39-12.71,15.66l.03.02c.45,12.13,6.69,22.68,15.97,29.06-13.86-4.89-24.02-17.86-24.59-33.45Z" fill="#f8f8f8" />
              <path d="m338.14,260.43l6.99-13.56h0s-6.99,13.56-6.99,13.56h0Z" fill="#f8f8f8" stroke="#585b56" strokeMiterlimit="10" strokeWidth="1.99" />
              <path d="m350.6,236.28h0s0,.02,0,.02v-.02Z" fill="#f8f8f8" stroke="#585b56" strokeMiterlimit="10" strokeWidth="1.99" />
              <path d="m282.6,229.97c.74,20.35,17.85,36.25,38.2,35.51,6.11-.22,12.06-1.96,17.33-5.06l12.45-24.16h.01s-.05-.15-.05-.15c-2-4.33-2.86-9.1-2.48-13.85.68-4.99-1.86-9.86-6.33-12.17l-21.95-11.32c-5.35-2.76-11.92-.66-14.68,4.69,0,0,0,0,0,0-5.19,10.07-13.51,9.95-22.54,26.47" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m403.11,114.99c-2.51,21.87-19.99,48.22-28.49,59.59l-14.11,23.21c-2.2,3.46-6.67,4.67-10.31,2.79l-25.87-13.34c-3.66-1.87-5.28-6.23-3.72-10.03,0,0,4.55-19.44,6.99-24.56s15.03-34.74,33.46-59.07l42.05,21.41Z" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
            </g>
            <g id="robotHandHorns">
              <g id="robotHornFinger">
                <path d="m317.72,266.55l-4.03,22.24s-2.22,11.59-2.55,13.65.48,8.63,7.17,9.56c5.91.82,8.27-5.33,9.13-9.59s3.43-15.39,3.43-15.39l7.27-27.99" fill="#fff" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              </g>
              <path d="m262.4,283.8c-6.35-3.45-2.9-9.9-.91-13.79,0,0,0-.02.01-.03l20.23-38.44c9.35-18.13,18.01-17.69,23.38-28.06,2.76-5.35,9.33-7.45,14.68-4.69,0,0,0,0,0,0l21.95,11.32c4.47,2.31,7.01,7.18,6.33,12.17-.38,4.75.47,9.53,2.48,13.85l-22.27,7.94c-3.65,7.18-17.06,35.3-17.06,35.3-2.01,3.88-6.8,5.4-10.68,3.39s-5.4-6.8-3.39-10.68l1.82-3.52c-2.01,3.89-6.78,5.42-10.67,3.41-3.89-2.01-3.63-10.3-1.62-14.19l-12.23,19.85c-1.99,3.88-5.69,9.61-12.04,6.16Z" fill="#fff" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m302.1,261.18l-3.16,7.39" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m289.76,250.54l-3.09,7.25" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m343.91,211.23l-24.65-12.71,5.66-10.99,24.65,12.71-5.66,10.99Z" fill="#6a7784" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m403.11,114.99c-2.51,21.87-19.99,48.22-28.49,59.59l-14.11,23.21c-2.2,3.46-6.67,4.67-10.31,2.79l-25.87-13.34c-3.66-1.87-5.28-6.23-3.72-10.03,0,0,4.55-19.44,6.99-24.56s15.03-34.74,33.46-59.07l42.05,21.41Z" fill="#fff" />
              <path d="m321.87,184.17l9.09,4.56c-2.48-1.77-3.3-5.47-1.87-8.93l10.78-24.9c4.56-13.38,16.14-42.73,31.18-58.22l-9.83-5.01c-12.59,17.7-27.97,45.3-32.53,58.68l-7.15,22.99c-1.57,3.78-2.58,7.76.34,10.82Z" fill="#f8f8f8" />
              <path d="m282.6,229.97c.74,20.35,17.85,36.25,38.2,35.51,6.11-.22,12.06-1.96,17.33-5.06,6.09-5.2,9.97-13.65,12.45-24.16h.01s-.05-.15-.05-.15c-2-4.33-2.86-9.1-2.48-13.85.68-4.99-1.86-9.86-6.33-12.17l-21.95-11.32c-5.35-2.76-11.92-.66-14.68,4.69,0,0,0,0,0,0-5.19,10.07-13.51,9.95-22.54,26.47l.03.03Z" fill="#fff" />
              <path d="m282.55,229.81l-.03-.02c4.52-8.26,8.85-12.36,12.71-15.66,3.86-3.29,7.24-5.79,9.83-10.82,2.76-5.35,9.34-7.45,14.68-4.69l7.69,3.97c-5.16-2.09-11.15.06-13.75,5.11-2.59,5.04-5.98,7.52-9.84,10.82s-8.19,7.39-12.71,15.66l.03.02c.45,12.13,6.69,22.68,15.97,29.06-13.86-4.89-24.02-17.86-24.59-33.45Z" fill="#f8f8f8" />
              <path d="m338.14,260.43h0" fill="#f8f8f8" stroke="#585b56" strokeMiterlimit="10" strokeWidth="1.99" />
              <path d="m350.6,236.28h0s0,.02,0,.02v-.02Z" fill="#f8f8f8" stroke="#585b56" strokeMiterlimit="10" strokeWidth="1.99" />
              <path d="m282.6,229.97c.74,20.35,17.85,36.25,38.2,35.51,6.11-.22,12.06-1.96,17.33-5.06,6.56-4.7,9.53-14.4,12.45-24.16h.01s-.05-.15-.05-.15c-2-4.33-2.86-9.1-2.48-13.85.68-4.99-1.86-9.86-6.33-12.17l-21.95-11.32c-5.35-2.76-11.92-.66-14.68,4.69,0,0,0,0,0,0-5.19,10.07-13.51,9.95-22.54,26.47" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m403.11,114.99c-2.51,21.87-19.99,48.22-28.49,59.59l-14.11,23.21c-2.2,3.46-6.67,4.67-10.31,2.79l-25.87-13.34c-3.66-1.87-5.28-6.23-3.72-10.03,0,0,4.55-19.44,6.99-24.56s15.03-34.74,33.46-59.07l42.05,21.41Z" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m313.19,291.43c4.27,4.39,9,6.75,16.05,2.74" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m316.58,275.11c4.27,4.39,9,6.75,16.05,2.74" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m263.86,265.51c2.22,6.11,6.12,9.68,12.71,8.67" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
              <path d="m271.72,250.54c2.22,6.11,6.12,9.68,12.71,8.67" fill="none" stroke="#585b56" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.99" />
            </g>
          </g>
        </g>
        <rect id="outline" x="214.68" y="130" width="370.64" height="303.25" rx="38" fill="none" stroke="#c7d2da" strokeMiterlimit="10" strokeWidth="2" />
      </g>
    </svg>
  );
}
