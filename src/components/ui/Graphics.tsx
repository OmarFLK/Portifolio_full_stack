import { useId, type ReactNode, type SVGProps } from 'react';
import styles from './Graphics.module.css';

type Tone = 'ink' | 'paper' | 'signal';

function joinClasses(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export interface SectionHeadingProps {
  index: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  as?: 'h2' | 'h3';
  tone?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({
  index,
  title,
  intro,
  id,
  as: Heading = 'h2',
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={joinClasses(
        styles.sectionHeading,
        tone === 'light' ? styles.headingLight : styles.headingDark,
        className,
      )}
    >
      <span className={styles.sectionIndex}>{index}</span>
      <Heading id={id} className={styles.sectionTitle}>
        {title}
      </Heading>
      {intro ? <div className={styles.sectionIntro}>{intro}</div> : null}
    </header>
  );
}

const cornerHandles = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const;
const middleHandles = ['topMiddle', 'rightMiddle', 'bottomMiddle', 'leftMiddle'] as const;
const boundingToneClasses: Record<Tone, string | undefined> = {
  ink: styles.boundingInk,
  paper: styles.boundingPaper,
  signal: styles.boundingSignal,
};

export interface BoundingBoxFrameProps {
  children: ReactNode;
  label?: ReactNode;
  measurement?: ReactNode;
  variant?: Tone;
  inline?: boolean;
  showMiddleHandles?: boolean;
  className?: string;
}

export function BoundingBoxFrame({
  children,
  label,
  measurement,
  variant = 'signal',
  inline = false,
  showMiddleHandles = false,
  className,
}: BoundingBoxFrameProps) {
  const classNames = joinClasses(
    styles.boundingBox,
    boundingToneClasses[variant],
    inline && styles.boundingInline,
    className,
  );
  const decoration = (
    <span className={styles.boundingDecoration} aria-hidden="true">
      {[...cornerHandles, ...(showMiddleHandles ? middleHandles : [])].map((position) => (
        <span key={position} className={joinClasses(styles.handle, styles[position])} />
      ))}
      {label ? <span className={styles.boundingLabel}>{label}</span> : null}
      {measurement ? <span className={styles.boundingMeasurement}>{measurement}</span> : null}
    </span>
  );

  if (inline) {
    return (
      <span className={classNames}>
        {decoration}
        {children}
      </span>
    );
  }

  return (
    <div className={classNames}>
      {decoration}
      {children}
    </div>
  );
}

export interface StaticSignalStarProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  title?: string;
}

export function StaticSignalStar({ title, className, ...svgProps }: StaticSignalStarProps) {
  const rawId = useId().replace(/:/g, '');
  const titleId = `${rawId}-title`;
  const metalId = `${rawId}-metal`;
  const shineId = `${rawId}-shine`;
  const clipId = `${rawId}-clip`;
  const starPath =
    'M120 7 L149 79 L228 82 L167 132 L190 212 L120 168 L50 212 L73 132 L12 82 L91 79 Z';

  return (
    <svg
      {...svgProps}
      className={joinClasses(styles.signalStar, className)}
      viewBox="0 0 240 240"
      role={title ? 'img' : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <linearGradient id={metalId} x1="31" y1="24" x2="207" y2="221">
          <stop offset="0" stopColor="#fffdf7" />
          <stop offset="0.18" stopColor="#fff1a6" />
          <stop offset="0.41" stopColor="#ffd400" />
          <stop offset="0.64" stopColor="#77776e" />
          <stop offset="0.83" stopColor="#24241f" />
          <stop offset="1" stopColor="#ffb800" />
        </linearGradient>
        <linearGradient id={shineId} x1="80" y1="29" x2="152" y2="175">
          <stop offset="0" stopColor="#fffdf7" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#fffdf7" stopOpacity="0.08" />
          <stop offset="1" stopColor="#0a0a08" stopOpacity="0.42" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={starPath} />
        </clipPath>
      </defs>
      <path className={styles.starDepth} d={starPath} transform="translate(5 7)" />
      <path className={styles.starBody} d={starPath} fill={`url(#${metalId})`} />
      <g clipPath={`url(#${clipId})`}>
        <path d="M120 7 L120 168 L73 132 L91 79 Z" fill={`url(#${shineId})`} />
        <path d="M120 168 L190 212 L167 132 L228 82 Z" fill="#0a0a08" opacity="0.3" />
        <path d="M12 82 L73 132 L50 212 L120 168" fill="#fffdf7" opacity="0.18" />
        <path
          className={styles.starFacet}
          d="M120 7 L149 79 L228 82 M120 7 L91 79 L12 82 M120 168 L73 132 L50 212 M120 168 L167 132 L190 212"
        />
        <path className={styles.starGlint} d="M88 84 C105 54 118 31 123 18" />
      </g>
    </svg>
  );
}

export type TornPaperVariant = 'paperOnInk' | 'inkOnPaper' | 'signalOnInk';

export interface TornPaperDividerProps {
  variant?: TornPaperVariant;
  flip?: boolean;
  className?: string;
}

export function TornPaperDivider({
  variant = 'paperOnInk',
  flip = false,
  className,
}: TornPaperDividerProps) {
  return (
    <div
      className={joinClasses(
        styles.tornDivider,
        styles[variant],
        flip && styles.tornFlip,
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1200 96" preserveAspectRatio="none" focusable="false">
        <path d="M0 31 L37 22 L82 30 L131 14 L176 24 L218 12 L265 28 L304 17 L351 31 L397 15 L445 25 L493 10 L538 29 L581 19 L626 34 L669 14 L713 27 L759 11 L805 31 L851 16 L899 29 L948 13 L994 27 L1042 17 L1089 32 L1139 12 L1200 24 L1200 96 L0 96 Z" />
      </svg>
    </div>
  );
}

export type ScribbleDirection = 'right' | 'left' | 'downRight' | 'downLeft';

export interface ScribbleArrowProps {
  direction?: ScribbleDirection;
  className?: string;
}

export function ScribbleArrow({ direction = 'right', className }: ScribbleArrowProps) {
  return (
    <svg
      className={joinClasses(styles.scribble, styles[direction], className)}
      viewBox="0 0 168 92"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 22 C35 5 65 11 84 28 C104 46 119 56 153 54" />
      <path d="M139 42 C146 46 151 50 158 55 C151 60 146 66 141 73" />
      <path className={styles.scribbleEcho} d="M10 27 C36 10 62 15 80 31" />
    </svg>
  );
}

export interface SystemNoticeProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  statusLabel?: ReactNode;
  tone?: 'dark' | 'light' | 'signal';
  className?: string;
  ariaLabel?: string;
}

export function SystemNotice({
  eyebrow,
  title,
  children,
  statusLabel,
  tone = 'dark',
  className,
  ariaLabel,
}: SystemNoticeProps) {
  return (
    <aside
      className={joinClasses(styles.systemNotice, styles[`notice${tone}`], className)}
      aria-label={ariaLabel}
    >
      <span className={styles.noticeRail} aria-hidden="true" />
      <div className={styles.noticeHeader}>
        {eyebrow ? <span className={styles.noticeEyebrow}>{eyebrow}</span> : null}
        {statusLabel ? (
          <span className={styles.noticeStatus}>
            <span className={styles.noticeStatusDot} aria-hidden="true" />
            {statusLabel}
          </span>
        ) : null}
      </div>
      {title ? <strong className={styles.noticeTitle}>{title}</strong> : null}
      {children ? <div className={styles.noticeBody}>{children}</div> : null}
    </aside>
  );
}
