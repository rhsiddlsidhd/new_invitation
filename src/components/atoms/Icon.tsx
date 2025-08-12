"use client";

import {
  UserIcon as HeroUserIcon,
  Bars3Icon,
  ArrowRightEndOnRectangleIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/solid";

import { XMarkIcon } from "@heroicons/react/16/solid";

import React from "react";

interface IconProps {
  size?: number;
  onClick?: () => void;
  className?: string;
}

const createIcon = (
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>,
) => {
  const IconWrapper = ({
    size = 24,
    className,
    onClick,
    ...props
  }: IconProps) => {
    return (
      <IconComponent
        className={`${className} ${onClick ? "cursor-pointer" : ""}`}
        width={size}
        height={size}
        onClick={onClick}
        {...props}
      />
    );
  };

  return IconWrapper;
};

export const UserIcon = createIcon(HeroUserIcon);

export const SignOutIcon = createIcon(ArrowRightEndOnRectangleIcon);

export const HamburgerIcon = createIcon(Bars3Icon);

export const CloseIcon = createIcon(XMarkIcon);

export const DocArrowUpIcon = createIcon(DocumentArrowUpIcon);
