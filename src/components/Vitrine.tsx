'use client';

import { useRef, useState, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Vitrine.module.css';

export interface VitrineItem {
  imageSrc: string;
  headline: string;
  description: string;
  tag?: string;
}

interface VitrineProps {
  items: VitrineItem[];
}

export default function Vitrine({ items }: VitrineProps) {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(imageRef.current, { opacity: 0, x: -80 });
    gsap.set(contentRef.current, { opacity: 0, x: 56 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(navRef.current, { opacity: 0, y: 24 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
      defaults: { ease: 'power3.out' },
    });

    tl.to(imageRef.current, { opacity: 1, x: 0, duration: 1.2 })
      .to(lineRef.current, { scaleX: 1, duration: 0.8 }, '-=0.8')
      .to(contentRef.current, { opacity: 1, x: 0, duration: 1 }, '-=0.6')
      .to(navRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, { scope: sectionRef });

  const goTo = useCallback((index: number) => {
    if (isAnimating.current || index === current) return;
    isAnimating.current = true;
    const direction = index > current ? 1 : -1;

    gsap.to([imageRef.current, contentRef.current], {
      opacity: 0,
      x: (i: number) => (i === 0 ? direction * -60 : direction * 40),
      duration: 0.38,
      ease: 'power3.in',
      onComplete: () => {
        flushSync(() => setCurrent(index));
        gsap.set(imageRef.current, { x: direction * 60 });
        gsap.set(contentRef.current, { x: direction * -40 });
        gsap.to([imageRef.current, contentRef.current], {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          onComplete: () => { isAnimating.current = false; },
        });
      },
    });
  }, [current]);

  const prev = () => goTo(current > 0 ? current - 1 : items.length - 1);
  const next = () => goTo(current < items.length - 1 ? current + 1 : 0);

  const item = items[current];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={imageRef} className={styles.imageWrapper}>
        <img
          src={item.imageSrc}
          alt={item.headline}
          className={styles.image}
          draggable={false}
        />
      </div>

      <div ref={contentRef} className={styles.content}>
        <div className={styles.tagRow}>
          <span ref={lineRef} className={styles.tagLine} />
          <span className={styles.tag}>{item.tag ?? 'Vitrine do Dia'}</span>
        </div>
        <h2 className={styles.headline}>{item.headline}</h2>
        <p className={styles.description}>{item.description}</p>
        <a href="#catalogo" className={styles.cta}>Explorar Coleção</a>

        {items.length > 1 && (
          <div ref={navRef} className={styles.nav}>
            <button onClick={prev} className={styles.arrow} aria-label="Anterior">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={styles.dots}>
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={i === current ? `${styles.dot} ${styles.dotActive}` : styles.dot}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className={styles.arrow} aria-label="Próximo">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
