"use client";
import { useState, useEffect } from "react";
import Background from "@/components/Background";
import OpeningScreen from "@/components/screens/OpeningScreen";
import RealizationScreen from "@/components/screens/RealizationScreen";
import EmotionalPause from "@/components/screens/EmotionalPause";
import NewYearTransition from "@/components/screens/NewYearTransition";
import InteractiveScreen from "@/components/screens/InteractiveScreen";
import FinalApology from "@/components/screens/FinalApology";
import ClosingScreen from "@/components/screens/ClosingScreen";

const SCREENS = [
  "opening",
  "realization",
  "pause",
  "transition",
  "interactive",
  "apology",
  "closing",
] as const;

type Screen = (typeof SCREENS)[number];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("opening");
  const [fadeOut, setFadeOut] = useState(false);
  const [next, setNext] = useState<Screen | null>(null);

  function goNext(current: Screen) {
    const idx = SCREENS.indexOf(current);
    if (idx >= SCREENS.length - 1) return;
    const nextScreen = SCREENS[idx + 1];
    setFadeOut(true);
    setNext(nextScreen);
  }

  useEffect(() => {
    if (!fadeOut || !next) return;
    const t = setTimeout(() => {
      setScreen(next);
      setNext(null);
      setFadeOut(false);
    }, 600);
    return () => clearTimeout(t);
  }, [fadeOut, next]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0c0810",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      <Background />

      {screen === "opening" && (
        <OpeningScreen onNext={() => goNext("opening")} />
      )}
      {screen === "realization" && (
        <RealizationScreen onNext={() => goNext("realization")} />
      )}
      {screen === "pause" && <EmotionalPause onNext={() => goNext("pause")} />}
      {screen === "transition" && (
        <NewYearTransition onNext={() => goNext("transition")} />
      )}
      {screen === "interactive" && (
        <InteractiveScreen onNext={() => goNext("interactive")} />
      )}
      {screen === "apology" && (
        <FinalApology onNext={() => goNext("apology")} />
      )}
      {screen === "closing" && <ClosingScreen />}
    </main>
  );
}
