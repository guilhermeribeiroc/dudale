'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    /*
      Conecta o Lenis ao ticker do GSAP.
      Sem essa integração, o scrub do ScrollTrigger perde sincronia
      com o scroll suavizado e produz jitter.
    */
    lenis.on('scroll', ScrollTrigger.update);

    const rafFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    // @ts-ignore
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafFn);
      // @ts-ignore
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
