"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "../atoms/Logo";
import Card from "../atoms/Card";
import Img from "../atoms/Img";
import { motion } from "framer-motion";
import { useModalStore } from "@/store/modalStore";
import { useRouter } from "next/navigation";

const TemplateGallery = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const { setModalOpen } = useModalStore();
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  const cardList = [
    {
      id: "blue",
      thumnail: "/wedding-1430.jpg",
      title: "블루 스타일",
      des: "산뜻한 블루",
    },
    {
      id: "pink",
      thumnail: "/wedding-1850.jpg",
      title: "핑크 스타일",
      des: "러블리 핑크",
    },
  ];

  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.success) {
          setUser(data.userId);
        }
      })
      .catch(() => setUser(null));
  }, []);

  const handleNavigation = (query: string) => {
    if (!user) {
      setModalOpen({ isOpen: true, type: "login" });

      return;
    }
    router.push(`/detail/${user}?t=${query}`);
  };

  return (
    <motion.div
      className="relative top-0 left-1/2 z-10 w-11/12 -translate-x-1/2 bg-white"
      ref={listContainerRef}
    >
      <div className="pt-4 sm:pt-8">
        <div className="w-full">
          <Logo className="m-auto block" />
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {cardList.map((card, i) => {
            return (
              <Card
                key={i}
                className="aspect-[5/8] max-h-[45vh] w-full cursor-pointer"
                ref={cardRef}
                onClick={() => handleNavigation(card.id)}
              >
                <div className="relative h-3/4 w-full">
                  <Img src={card.thumnail} />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{card.des}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateGallery;
