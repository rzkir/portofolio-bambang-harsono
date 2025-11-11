"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { useLoading } from "@/utils/context/LoadingContext";

const navLink = [
  { href: "/", label: "Home" },
  { href: "#achievements", label: "Achievements" },
  { href: "#projects", label: "Projects" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function useStateHeader() {
  const pathname = usePathname();
  const { isInitialLoading, isLoading } = useLoading();
  const isBusy = isInitialLoading || isLoading;
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateHash = () => setHash(window.location.hash || "");
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname !== "/") return;
    const ids = navLink
      .filter((l) => l.href.startsWith("#"))
      .map((l) => l.href.slice(1));

    const getCurrentSection = () => {
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el);
      if (sections.length === 0) {
        return;
      }
      const headerEl = document.querySelector("header") as HTMLElement | null;
      const headerOffset =
        (headerEl?.getBoundingClientRect().height ?? 80) + 20;
      const anchorY = window.scrollY + headerOffset;

      const firstTop = sections[0].getBoundingClientRect().top + window.scrollY;
      if (anchorY <= firstTop - 10) {
        setHash("");
        return;
      }

      let bestId: string | null = null;
      let bestDist = Number.POSITIVE_INFINITY;
      for (const el of sections) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        const dist = Math.abs(top - anchorY);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = `#${el.id}`;
        }
      }
      if (bestId) setHash(bestId);
    };

    getCurrentSection();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          getCurrentSection();
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return { pathname, isBusy, hash, setHash };
}
