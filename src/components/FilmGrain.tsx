export function FilmGrain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay">
      <svg className="h-full w-full">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}
