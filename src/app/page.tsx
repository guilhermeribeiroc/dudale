import Hero from '@/components/Hero';
import ScrollCamera from '@/components/ScrollCamera';
import Vitrine, { type VitrineItem } from '@/components/Vitrine';
import Catalogo, { type Product } from '@/components/Catalogo';
import Footer from '@/components/Footer';

const vitrineItems: VitrineItem[] = [
  {
    imageSrc: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=85',
    tag: 'Vitrine do Dia',
    headline: 'Fluidez que veste a alma.',
    description:
      'Uma peça escolhida a dedo para hoje. Tecidos naturais, corte impecável e a leveza que só a Dudalê sabe entregar. Morada Nova nunca esteve tão elegante.',
  },
  {
    imageSrc: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=1200&q=85',
    tag: 'Nova Chegada',
    headline: 'Elegância que respira.',
    description:
      'Linho puro em corte impecável. Uma peça que transita entre o casual e o sofisticado, perfeita para cada momento do seu dia com conforto e estilo.',
  },
  {
    imageSrc: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=85',
    tag: 'Destaque da Semana',
    headline: 'O toque que transforma.',
    description:
      'Detalhes pensados para realçar sua essência. Cada peça Dudalê é uma declaração silenciosa de estilo, identidade e a elegância que você merece.',
  },
];

const products: Product[] = [
  {
    id: 1,
    name: 'Vestido Linho Puro',
    price: 'R$ 289,00',
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    tag: 'Novo',
  },
  {
    id: 2,
    name: 'Blusa Cetim Soft',
    price: 'R$ 149,00',
    src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80',
  },
  {
    id: 3,
    name: 'Calça Palazzo',
    price: 'R$ 219,00',
    src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    tag: 'Favorito',
  },
  {
    id: 4,
    name: 'Conjunto Linho',
    price: 'R$ 389,00',
    src: 'https://images.unsplash.com/photo-1548549557-dbe9946621da?w=600&q=80',
    tag: 'Novo',
  },
  {
    id: 5,
    name: 'Top Estruturado',
    price: 'R$ 119,00',
    src: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80',
  },
  {
    id: 6,
    name: 'Saia Midi Fluida',
    price: 'R$ 179,00',
    src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
  },
];

export default function Home() {
  return (
    <main>
      <Hero videoSrc="/videos/hero.mp4" />

      <ScrollCamera
        card1Src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
        card2Src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80"
        card3Src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
      />

      <Vitrine items={vitrineItems} />

      <Catalogo products={products} />

      <Footer />
    </main>
  );
}
