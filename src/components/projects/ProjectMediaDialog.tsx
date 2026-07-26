import { useId, useRef, useState, type MouseEvent, type SyntheticEvent } from 'react';
import { Play, X } from 'lucide-react';
import styles from './ProjectMediaDialog.module.css';

export interface ProjectMediaDialogProps {
  projectTitle: string;
  videoSrc: string;
  triggerLabel: string;
  closeLabel: string;
  dialogTitle: string;
}

export function ProjectMediaDialog({
  projectTitle,
  videoSrc,
  triggerLabel,
  closeLabel,
  dialogTitle,
}: ProjectMediaDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const headingId = useId();
  const descriptionId = useId();

  const openDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    dialog.showModal();
    setIsOpen(true);
  };

  const closeDialog = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  };

  const handleClose = () => {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    closeDialog();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeDialog();
  };

  return (
    <>
      <button className={styles.trigger} ref={triggerRef} type="button" onClick={openDialog}>
        <Play aria-hidden="true" fill="currentColor" strokeWidth={1.7} />
        <span>{triggerLabel}</span>
      </button>

      <dialog
        className={styles.dialog}
        ref={dialogRef}
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        onCancel={handleCancel}
        onClose={handleClose}
        onClick={handleBackdropClick}
      >
        <div className={styles.player}>
          <header className={styles.playerHeader}>
            <div>
              <span aria-hidden="true">LOCAL_MEDIA / MP4</span>
              <h2 id={headingId}>{dialogTitle}</h2>
            </div>

            <button
              className={styles.closeButton}
              type="button"
              aria-label={closeLabel}
              onClick={closeDialog}
            >
              <span>{closeLabel}</span>
              <X aria-hidden="true" strokeWidth={1.7} />
            </button>
          </header>

          <div className={styles.mediaFrame}>
            {isOpen && (
              <video
                className={styles.video}
                controls
                playsInline
                preload="metadata"
                aria-label={`${dialogTitle}: ${projectTitle}`}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
          </div>

          <footer className={styles.playerFooter}>
            <strong id={descriptionId}>{projectTitle}</strong>
            <span aria-hidden="true">ON DEMAND / NO AUTOPLAY</span>
          </footer>
        </div>
      </dialog>
    </>
  );
}
