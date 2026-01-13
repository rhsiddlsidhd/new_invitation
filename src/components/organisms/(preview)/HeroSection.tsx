import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import LoaderThumbnail from "@/components/atoms/LoaderThumbnail";
import { HeroSectionProps } from "./heroSection.mapper";

// LoaderThumbnail
/**
 * 이미지 Map 생성
 * keys= preview, createForm , updateForm ...
 * sizes = (max-width)...
 */

export function HeroSection({
  groomName,
  brideName,
  weddingDate,
  venueName,
  thumbnailImage,
}: HeroSectionProps) {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <LoaderThumbnail
          src={thumbnailImage}
          alt="inivitation main Thumbnail"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/65 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 text-center text-white">
        <div className="mb-8">
          <p className="mb-4 text-xs font-light tracking-[0.3em] opacity-90 md:text-sm">
            WEDDING INVITATION
          </p>
          <h1 className="mb-6 font-serif text-4xl text-balance md:text-6xl">
            {groomName} <span className="mx-2 text-2xl md:text-4xl">&</span>{" "}
            {brideName}
          </h1>
        </div>

        <div className="space-y-3 text-lg font-light">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {format(weddingDate, "yyyy년 M월 d일 EEEE a h시", { locale: ko })}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{venueName}</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-2">
            <div className="h-2 w-1 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
