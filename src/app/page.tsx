import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Menu } from '@/components/Menu';
import { Gallery } from '@/components/Gallery';
import { Booking } from '@/components/Booking';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
