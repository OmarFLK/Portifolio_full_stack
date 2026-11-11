export function BrandLogo({ className }: { className?: string }) {
  return (
    <img
      className={className}
      src="/assets/brand/logo-512.png"
      width={512}
      height={512}
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}
