export const desktopNavItems = [
  { href: "/", label: "Início" },
  { href: "/mentores", label: "Mentores" },
  { href: "/pedidos", label: "Pedidos" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/perfil", label: "Perfil" },
];

export const mobileNavItems = [
  { href: "/", label: "Início", key: "home", icon: "⌂" },
  { href: "/mentores", label: "Buscar", key: "search", icon: "⌕" },
  { href: "/chat/123", label: "Chat", key: "chat", icon: "◔" },
  { href: "/perfil", label: "Perfil", key: "profile", icon: "◡" },
] as const;

export type MobileNavKey = (typeof mobileNavItems)[number]["key"];