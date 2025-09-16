import Img from "@/components/atoms/Img";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import ClipboardBtn from "@/components/molecules/btns/ClipboardBtn";
import BlurWord from "@/components/molecules/typography/BlurWord";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const icons = [
    {
      id: "gitgub",
      location: "https://github.com/rhsiddlsidhd",
      img: "/assets/github.svg",
    },
    {
      id: "tistory",
      location: "https://endless-growth.tistory.com/",
      img: "/assets/tistory.svg",
    },
  ];

  const navs = [
    {
      id: "Home",
      path: "/",
    },
    {
      id: "Dashboard",
      path: "/dashboard",
    },
    {
      id: "Profile",
      path: "/profile",
    },
  ];
  return (
    <footer className="relative z-50 flex h-screen flex-col items-center justify-around gap-4 bg-black text-white">
      <section className="m-auto">
        <BlurWord word="contact" />
      </section>

      <section className="grid w-3/5 grid-cols-2 gap-2 p-2 max-sm:w-4/5 max-sm:grid-cols-1">
        <div className="space-y-2 max-sm:w-full max-sm:text-xs">
          <Label className="flex w-fit cursor-pointer gap-2 text-white">
            이메일
            <ClipboardBtn value="rhsiddlsidhd1@gmail.com" />
          </Label>
          <Input readOnly={true} value="rhsiddlsidhd1@gmail.com" />
          <Link
            href="mailto:rhsiddlsidhd1@gmail.com"
            className="text-blue-300 underline"
          >
            이메일로 문의
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 max-sm:justify-end">
          {icons.map((icon) => (
            <Link
              key={icon.id}
              className="relative h-8 w-8 rounded-2xl bg-white"
              href={icon.location}
              target="_blank"
            >
              <Img src={icon.img} />
            </Link>
          ))}
        </div>
      </section>

      <motion.ul className="grid w-3/5 max-w-xl grid-cols-1 justify-items-end gap-2 text-[3vw] text-gray-400 max-sm:w-4/5">
        {navs.map((nav) => (
          <motion.li
            key={nav.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
          >
            <Link href={nav.path}>{nav.id}</Link>
          </motion.li>
        ))}
      </motion.ul>

      <p className="m-auto p-4 text-xs text-gray-400">
        Copyright @ 2025, YoungJae. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
