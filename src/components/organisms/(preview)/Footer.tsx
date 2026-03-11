import {
  TypographyMuted,
  TypographySmall,
} from "@/components/atoms/typoqraphy";
import { FooterProps } from "./footer.mapper";

export function Footer({
  children,
  message,
}: FooterProps & {
  children: React.ReactNode;
}) {
  return (
    <footer className="relative min-h-[60vh] py-12 text-center">
      {/* Background/Overlay Content (Particles, Waves, etc.) */}
      {children}

      {message && (
        <div className="absolute top-1/4 left-0 w-full px-8 text-white drop-shadow-md">
          <TypographyMuted className="mx-auto max-w-xs text-base leading-relaxed text-white opacity-90 whitespace-pre-line">
            {message}
          </TypographyMuted>
        </div>
      )}

      <div className="relative z-20 mx-auto flex h-full max-w-2xl flex-col items-center justify-end pt-[40vh]">
        <div className="mb-6 space-y-1">
          <TypographyMuted className="text-sm tracking-[0.2em] text-white uppercase drop-shadow-sm">
            Mobile Wedding Invitation
          </TypographyMuted>
          <div className="mx-auto h-px w-8 bg-white/30" />
        </div>
        <TypographySmall className="text-[10px] text-white/60 drop-shadow-sm">
          © 2026 Wedding Invitation Service. All rights reserved.
        </TypographySmall>
      </div>
    </footer>
  );
}
