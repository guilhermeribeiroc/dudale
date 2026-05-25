'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Catalogo.module.css';
import WhatsAppModal from './WhatsAppModal';

export interface Product {
  id: number;
  name: string;
  price: string;
  src: string;
  tag?: string;
}

interface CatalogoProps {
  products: Product[];
}

export default function Catalogo({ products }: CatalogoProps) {
  const [waOpen, setWaOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: string } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* Entrada do header */
    gsap.set(headerRef.current, { opacity: 0, y: 40 });
    const stHeader = ScrollTrigger.create({
      trigger: headerRef.current,
      start: 'top 82%',
      onEnter: () => {
        gsap.to(headerRef.current, { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out' });
      },
    });

    /* Reveal cinematográfico por card: curtain clip-path + Ken Burns na imagem */
    const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card) => {
      const imgWrapper = card.querySelector(`.${styles.imageWrapper}`) as HTMLElement;
      const img = card.querySelector(`.${styles.image}`) as HTMLElement;
      const info = card.querySelector(`.${styles.info}`) as HTMLElement;
      if (!imgWrapper || !img || !info) return;

      gsap.set(imgWrapper, { clipPath: 'inset(0 0 100% 0)' });
      gsap.set(img, { scale: 1.14 });
      gsap.set(info, { opacity: 0, y: 28 });

      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 86%',
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
          tl.to(imgWrapper, { clipPath: 'inset(0 0 0% 0)', duration: 1.1 })
            .to(img, { scale: 1, duration: 1.6 }, '<')
            .to(info, { opacity: 1, y: 0, duration: 0.9 }, '-=0.55');
        },
      });
      triggers.push(st);
    });

    return () => {
      stHeader.kill();
      triggers.forEach((t) => t.kill());
    };
  }, { scope: sectionRef });

  return (
    <>
    <section ref={sectionRef} id="catalogo" className={styles.section}>
      <div ref={headerRef} className={styles.header}>
        <span className={styles.eyebrow}>Coleção Atual</span>
        <h2 className={styles.title}>Catálogo</h2>
        <p className={styles.subtitle}>
          Peças pensadas para o seu dia a dia com elegância e leveza.
        </p>
      </div>

      <div ref={gridRef} className={styles.grid}>
        {products.map((product) => (
          <article key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              {product.tag && (
                <span className={styles.badge}>{product.tag}</span>
              )}
              <img
                src={product.src}
                alt={product.name}
                className={styles.image}
                draggable={false}
              />
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>{product.name}</h3>
              <span className={styles.price}>{product.price}</span>
              <button
                className={styles.cta}
                onClick={() => {
                  setSelectedProduct({ name: product.name, price: product.price });
                  setWaOpen(true);
                }}
              >
                Ver Peça
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>

    <WhatsAppModal
      isOpen={waOpen}
      onClose={() => { setWaOpen(false); setSelectedProduct(null); }}
      productName={selectedProduct?.name}
      productPrice={selectedProduct?.price}
    />
    </>
  );
}
