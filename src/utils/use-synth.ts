import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { Synth } from "tone";

interface Ref {
  synth?: Synth;
}

export const useSynth = () => {
  const ref = useRef<Ref>({ synth: undefined });
  useEffect(() => {
    const current = ref.current;
    current.synth = new Tone.Synth().toDestination();
    return () => {
      current.synth?.dispose();
    };
  }, []);
  return ref.current.synth;
};
