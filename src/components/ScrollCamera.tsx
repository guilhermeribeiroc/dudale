'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollCamera.module.css';

interface ScrollCameraProps {
  card1Src: string;
  card2Src: string;
  card3Src: string;
}

export default function ScrollCamera({ card1Src, card2Src, card3Src }: ScrollCameraProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(card1Ref.current, { x: -160, opacity: 0 });
    gsap.set(card2Ref.current, { y: 88, opacity: 0 });
    gsap.set(card3Ref.current, { x: 160, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stickyRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1.2,
      },
    });

    tl.to(card1Ref.current, { x: 0, opacity: 1, ease: 'power3.out', duration: 1 }, 0)
      .to(card2Ref.current, { y: 0, opacity: 1, ease: 'power3.out', duration: 1 }, 0.35)
      .to(card3Ref.current, { x: 0, opacity: 1, ease: 'power3.out', duration: 1 }, 0.65);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={stickyRef} className={styles.sticky}>

        <div className={styles.labelWrapper}>
          <span className={styles.labelBrand}>Dudalê</span>
          <span className={styles.labelSep}>|</span>
          <span className={styles.labelCity}>Morada Nova</span>
        </div>

        <div className={styles.grid}>
          <div ref={card1Ref} className={styles.card}>
            <img
              src={card1Src}
              alt="Coleção Dudalê"
              className={styles.cardImage}
              draggable={false}
            />
          </div>

          <div ref={card2Ref} className={`${styles.card} ${styles.cardMiddle}`}>
            <img
              src={card2Src}
              alt="Coleção Dudalê"
              className={styles.cardImage}
              draggable={false}
            />
          </div>

          <div ref={card3Ref} className={`${styles.card} ${styles.cardLast}`}>
            <img
              src={card3Src}
              alt="Coleção Dudalê"
              className={styles.cardImage}
              draggable={false}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
