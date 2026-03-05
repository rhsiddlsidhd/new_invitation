"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import announcementData from "@/data/announcement.json";

export const AnnouncementBar = () => {
  // 활성화된 공지사항만 필터링
  const activeAnnouncements = announcementData.filter(item => item.isActive);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (activeAnnouncements.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAnnouncements.length);
    }, 4000); // 4초마다 전환

    return () => clearInterval(timer);
  }, [activeAnnouncements.length]);

  if (activeAnnouncements.length === 0) return null;

  const currentAnnouncement = activeAnnouncements[currentIndex];

  return (
    <div className="bg-slate-900 text-white overflow-hidden relative h-9 flex items-center justify-center text-xs font-medium tracking-tight">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAnnouncement.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            <span>{currentAnnouncement.text}</span>
            {currentAnnouncement.link && (
              <Link 
                href={currentAnnouncement.link} 
                className="group inline-flex items-center gap-1 underline underline-offset-2 hover:text-slate-300 transition-colors"
              >
                지금 확인
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
