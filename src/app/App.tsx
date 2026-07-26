import { useRef } from 'react';
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
  Skills,
} from '../sections/PortfolioSections';
import { useLocale } from './locale';
import styles from './App.module.css';

export function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { text } = useLocale();

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
