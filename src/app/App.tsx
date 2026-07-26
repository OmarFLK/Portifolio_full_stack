import { useEffect, useRef } from 'react';
import { Header } from '../components/layout/Header';
import { DesktopEnhancements } from '../components/motion/DesktopEnhancements';
import { TornPaperDivider } from '../components/ui/Graphics';
import {
  About,
  Contact,
  Education,
  Experience,
  Footer,
  Hero,
  Laboratory,
  Projects,
  Results,
  Skills,
} from '../sections/PortfolioSections';
import { useLocale } from './locale';
import styles from './App.module.css';

export function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { text } = useLocale();

  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (!hash) return;

    let cancelled = false;
    let frame = 0;

    const scrollToHash = () => {
      if (cancelled) return;

      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const target = document.getElementById(hash);

        if (!target) return;

        const previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        target.scrollIntoView({ block: 'start' });
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
      });
    };

    scrollToHash();
    window.addEventListener('load', scrollToHash, { once: true });
    void document.fonts?.ready.then(scrollToHash);

    return () => {
      cancelled = true;
      window.removeEventListener('load', scrollToHash);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.app} id="top" ref={rootRef}>
      <a className="skip-link" href="#main-content">
        {text.skip}
      </a>
      <Header />
      <DesktopEnhancements scopeRef={rootRef} />

      <main id="main-content">
        <Hero />
        <TornPaperDivider variant="paperOnInk" />
        <About />
        <TornPaperDivider variant="inkOnPaper" />
        <Projects />
        <Results />
        <TornPaperDivider variant="paperOnInk" />
        <Experience />
        <TornPaperDivider variant="inkOnPaper" />
        <Skills />
        <TornPaperDivider variant="paperOnInk" />
        <Education />
        <TornPaperDivider variant="inkOnPaper" />
        <Laboratory />
        <TornPaperDivider variant="signalOnInk" />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
