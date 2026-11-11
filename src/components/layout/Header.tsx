import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocale } from '../../app/locale';
import { localeNames, type Locale } from '../../data/portfolio';
import styles from './Header.module.css';
import { BrandLogo } from '../ui/BrandLogo';

type SectionId =
  'about' | 'projects' | 'resultados' | 'experience' | 'skills' | 'education' | 'contact';

type NavLabelKey =
  'about' | 'projects' | 'results' | 'experience' | 'skills' | 'education' | 'contact';

const navItems = [
  { id: 'projects', labelKey: 'projects', index: '01' },
  { id: 'about', labelKey: 'about', index: '02' },
  { id: 'experience', labelKey: 'experience', index: '04' },
  { id: 'contact', labelKey: 'contact', index: '08' },
] as const satisfies ReadonlyArray<{
  id: SectionId;
  labelKey: NavLabelKey;
  index: string;
}>;

const locales: Locale[] = ['pt', 'en', 'es'];

const languageGroupLabels: Record<Locale, string> = {
  pt: 'Selecionar idioma',
  en: 'Select language',
  es: 'Seleccionar idioma',
};

const navigationLabels: Record<Locale, string> = {
  pt: 'Navegação principal',
  en: 'Primary navigation',
  es: 'Navegación principal',
};

function LanguageSwitcher({ className, onSelect }: { className?: string; onSelect?: () => void }) {
  const { locale, setLocale } = useLocale();

  const selectLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    onSelect?.();
  };

  return (
    <div
      className={`${styles.languageSwitcher} ${className ?? ''}`}
      role="group"
      aria-label={languageGroupLabels[locale]}
    >
      {locales.map((item) => (
        <button
          className={styles.languageButton}
          data-active={locale === item}
          type="button"
          key={item}
          lang={item === 'pt' ? 'pt-BR' : item}
          aria-label={`${item.toUpperCase()} — ${localeNames[item]}`}
          aria-pressed={locale === item}
          onClick={() => selectLocale(item)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function getHashSection(): SectionId | null {
  if (typeof window === 'undefined') return null;

  const hash = window.location.hash.slice(1);
  return navItems.some((item) => item.id === hash) ? (hash as SectionId) : null;
}

function useActiveSection(paused = false): SectionId | null {
  const [activeSection, setActiveSection] = useState<SectionId | null>(() => getHashSection());

  useEffect(() => {
    if (paused) return;

    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let frameId: number | null = null;

    const updateFromPosition = () => {
      frameId = null;
      const marker = window.innerHeight * 0.3;
      const currentSection =
        sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= marker && rect.bottom > marker;
        }) ??
        [...sections].reverse().find((section) => section.getBoundingClientRect().top <= marker);

      setActiveSection(currentSection ? (currentSection.id as SectionId) : null);
    };

    const schedulePositionUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateFromPosition);
      }
    };

    const handleHashChange = () => {
      const hashSection = getHashSection();
      if (hashSection) setActiveSection(hashSection);
      schedulePositionUpdate();
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', schedulePositionUpdate, { passive: true });
    window.addEventListener('resize', schedulePositionUpdate, { passive: true });

    const observer =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(schedulePositionUpdate, {
            rootMargin: '-22% 0px -62% 0px',
            threshold: 0.01,
          });

    sections.forEach((section) => observer?.observe(section));
    schedulePositionUpdate();

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      observer?.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', schedulePositionUpdate);
      window.removeEventListener('resize', schedulePositionUpdate);
    };
  }, [paused]);

  return activeSection;
}

function Navigation({
  activeSection,
  mobile = false,
  onNavigate,
}: {
  activeSection: SectionId | null;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const { locale, text } = useLocale();

  return (
    <nav
      className={mobile ? styles.mobileNavigation : styles.desktopNavigation}
      aria-label={navigationLabels[locale]}
    >
      <ol>
        {navItems.map(({ id, index, labelKey }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={activeSection === id ? 'location' : undefined}
              data-current={activeSection === id}
              onClick={onNavigate}
            >
              {mobile && <span aria-hidden="true">{index}</span>}
              {text.nav[labelKey]}
            </a>
          </li>
        ))}
        <li>
          <a href="/omaria" onClick={onNavigate}>
            {mobile && <span aria-hidden="true">09</span>}
            OmarIA
          </a>
        </li>
      </ol>
    </nav>
  );
}

export function Header() {
  const { locale, text } = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection(isMenuOpen);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const shouldRestoreMenuFocusRef = useRef(false);

  const closeMenu = useCallback((restoreFocus = false) => {
    shouldRestoreMenuFocusRef.current ||= restoreFocus;
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    if (isMenuOpen || !shouldRestoreMenuFocusRef.current) return;

    shouldRestoreMenuFocusRef.current = false;
    menuButtonRef.current?.focus();
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const initialFocusFrame = window.requestAnimationFrame(() => {
      menuPanelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== 'Tab' || !menuPanelRef.current) return;

      const panelElements = Array.from(
        menuPanelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );
      const focusableElements = [menuButtonRef.current, ...panelElements].filter(
        (element): element is HTMLElement =>
          element !== null && element.getClientRects().length > 0,
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(initialFocusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu, isMenuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 56.25rem)');
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    desktopQuery.addEventListener('change', handleDesktopChange);
    return () => desktopQuery.removeEventListener('change', handleDesktopChange);
  }, [closeMenu]);

  return (
    <header className={styles.header} data-menu-open={isMenuOpen}>
      <div className={styles.rail}>
        <a className={styles.brand} href="#top" onClick={() => closeMenu()}>
          <BrandLogo className={styles.brandMark} />
          <span className={styles.brandName}>
            Omar Saliba
            <small>Portfolio / 2026</small>
          </span>
        </a>

        <Navigation activeSection={activeSection} />

        <LanguageSwitcher className={styles.desktopLanguages} />

        <button
          className={styles.menuButton}
          ref={menuButtonRef}
          type="button"
          aria-label={isMenuOpen ? text.closeMenu : text.menu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => {
            setIsMenuOpen((current) => !current);
          }}
        >
          <span>{isMenuOpen ? text.closeMenu : text.menu}</span>
          {isMenuOpen ? (
            <X aria-hidden="true" strokeWidth={1.8} />
          ) : (
            <Menu aria-hidden="true" strokeWidth={1.8} />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.mobilePanel} id="mobile-menu" ref={menuPanelRef}>
          <div className={styles.panelIndex} aria-hidden="true">
            <span>INDEX</span>
            <span>
              {String(navItems.length + 1).padStart(2, '0')} ENTRIES / {locale.toUpperCase()}
            </span>
          </div>

          <Navigation activeSection={activeSection} mobile onNavigate={() => closeMenu(true)} />

          <div className={styles.panelFooter}>
            <LanguageSwitcher className={styles.mobileLanguages} onSelect={() => closeMenu(true)} />
            <span aria-hidden="true">OPEN / TO GOOD IDEAS</span>
          </div>
        </div>
      )}
    </header>
  );
}
