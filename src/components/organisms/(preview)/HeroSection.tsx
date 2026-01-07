import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface HeroSectionProps {
  groomName: string;
  brideName: string;
  weddingDate: Date;
  venueName: string;
  thumbnailImage: string;
}

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
        <Image
          src={thumbnailImage || "/placeholder.svg?height=1200&width=800"}
          alt="Wedding main photo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
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

        <div className="space-y-3 text-xs font-light md:text-base">
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-2">
            <div className="h-2 w-1 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
