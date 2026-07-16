import Image from "next/image";

interface AeviaLogoProps {
  className?: string;
  /**
   * @deprecated The real logo lockup (extracted from the official brand manual)
   * has no tagline text baked into the asset — this prop is now a no-op.
   * Kept in the signature for backward compatibility with existing callers;
   * no caller currently passes `showTagline={true}`, so this is safe.
   */
  showTagline?: boolean;
  /** Render the isotype (star mark) alone, without the wordmark — for compact/icon-only contexts (e.g. collapsed mobile nav). */
  iconOnly?: boolean;
}

// Real lockup, extracted from the AEVIA brand manual: transparent background,
// silver/white gradient star isotype + "AEVIA" wordmark. Native 1253x370.
const LOGO_ASPECT = 1253 / 370;
// Isotype alone (star mark), native 385x377 — for icon-only contexts.
const ISOTYPE_ASPECT = 385 / 377;

const DISPLAY_HEIGHT = 36;

export function AeviaLogo({ className = "", showTagline, iconOnly = false }: AeviaLogoProps) {
  void showTagline; // intentionally ignored — see deprecation note above

  if (iconOnly) {
    return (
      <Image
        src="/brand/aevia-isotype.png"
        alt="Aevia"
        width={Math.round(DISPLAY_HEIGHT * ISOTYPE_ASPECT)}
        height={DISPLAY_HEIGHT}
        priority
        className={className}
      />
    );
  }

  return (
    <Image
      src="/brand/aevia-logo.png"
      alt="Aevia"
      width={Math.round(DISPLAY_HEIGHT * LOGO_ASPECT)}
      height={DISPLAY_HEIGHT}
      priority
      className={className}
    />
  );
}
