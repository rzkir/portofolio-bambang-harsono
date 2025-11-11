import { Home, Trophy, PanelsTopLeft, Images, Mail } from "lucide-react";

export const navLink = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "#achievements",
    label: "Achievements",
  },
  {
    href: "#projects",
    label: "Projects",
  },
  {
    href: "#gallery",
    label: "Gallery",
  },
  {
    href: "#contact",
    label: "Contact",
  },
];

export const mobileNav = [
  { href: "/", label: "Home", Icon: Home },
  { href: "#achievements", label: "Achievements", Icon: Trophy },
  { href: "#projects", label: "Projects", Icon: PanelsTopLeft },
  { href: "#gallery", label: "Gallery", Icon: Images },
  { href: "#contact", label: "Contact", Icon: Mail },
];
