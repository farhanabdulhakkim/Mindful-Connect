// src/components/BreathingCircle.jsx
import React, { useEffect, useRef, useState } from "react";

export default function BreathingCircle({ size = 220 }) {
  const [running, setRunning] = useState(false);
  const [phaseText, setPhaseText] = useState("Ready");
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      stopAudio();
      clearInterval(timerRef.current);
    };
  }, []);

  const startAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = "sine";
      osc.frequency.value = 220; // base note
      gain.gain.value = 0;
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
    }
  };

  const stopAudio = () => {
    if (oscRef.current) {
      try { oscRef.current.stop(); } catch {}
      oscRef.current.disconnect?.();
      gainRef.current?.disconnect?.();
      audioCtxRef.current?.close?.();
    }
    audioCtxRef.current = null;
    oscRef.current = null;
    gainRef.current = null;
  };

  const runBreathCycle = () => {
    // cycle: inhale 4s hold 2s exhale 6s (12s total)
    let step = 0;
    setPhaseText("Inhale");
    startAudio();
    setRunning(true);

    timerRef.current = setInterval(() => {
      step = (step + 1) % 12;
      if (step === 0) setPhaseText("Inhale");
      else if (step === 4) setPhaseText("Hold");
      else if (step === 6) setPhaseText("Exhale");
      else if (step === 12) setPhaseText("Inhale");

      // map step to volume & frequency for subtle tone
      if (gainRef.current && audioCtxRef.current) {
        const t = step;
        let vol = 0.01;
        if (t >= 0 && t < 4) vol = 0.04 * (t / 4); // inhale ramp
        else if (t >= 4 && t < 6) vol = 0.04;
        else vol = 0.04 * (1 - ((t - 6) / 6)); // exhale fade
        gainRef.current.gain.setTargetAtTime(vol, audioCtxRef.current.currentTime, 0.05);
        if (oscRef.current) {
          const freq = 220 + vol * 400;
          oscRef.current.frequency.setTargetAtTime(freq, audioCtxRef.current.currentTime, 0.05);
        }
      }
    }, 1000);
  };

  const stopBreathCycle = () => {
    setRunning(false);
    setPhaseText("Stopped");
    clearInterval(timerRef.current);
    // fade out audio
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
    }
    // stop after short delay
    setTimeout(() => stopAudio(), 300);
  };

  const toggle = () => {
    if (!running) runBreathCycle();
    else stopBreathCycle();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 100 100" className="mb-4">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.9"/>
          </linearGradient>
        </defs>
        <g transform="translate(50,50)">
          <circle r={running ? 28 : 22} fill="url(#g1)" opacity="0.9" style={{ transition: 'all 1s ease-in-out' }} />
          <circle r={running ? 44 : 36} fill="none" stroke="#a7f3d0" strokeWidth="1.5" style={{ transition: 'all 1s ease-in-out' }} />
        </g>
      </svg>

      <div className="flex items-center gap-3">
        <button onClick={toggle} className="px-4 py-2 bg-gradient-to-r from-[#4F83FF] to-[#9BD3FF] text-white rounded-2xl">
          {running ? "Stop" : "Start Breathing"}
        </button>
        <div className="text-sm text-gray-700 dark:text-gray-300">{phaseText}</div>
      </div>
    </div>
  );
}
