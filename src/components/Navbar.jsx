import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Story", href: "#story" },
  { label: "Memories", href: "#timeline" },
  { label: "Diary", href: "#diary" },
  { label: "Letters", href: "#letters" },
  { label: "Meaning", href: "#meaning" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHashNavigate = (href) => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }

    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "border-b border-warm-white/10 bg-bg/70 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link
          to="/"
          className="font-serif-jp text-sm tracking-[0.2em] text-cream/90 transition-colors hover:text-gold"
          onClick={() => setOpen(false)}
          aria-label="Go to the home page"
        >
          君の膵臓
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={location.pathname === "/" ? link.href : `/${link.href}`}
                onClick={(event) => {
                  event.preventDefault();
                  handleHashNavigate(link.href);
                }}
                className="text-xs uppercase tracking-[0.18em] text-warm-white/70 transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/characters"
              onClick={() => setOpen(false)}
              className={`text-xs uppercase tracking-[0.18em] transition-colors duration-300 hover:text-gold ${
                location.pathname === "/characters"
                  ? "text-gold"
                  : "text-warm-white/70"
              }`}
            >
              Characters
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="text-cream md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="h-6 w-6" strokeWidth={1.4} />
          ) : (
            <Menu className="h-6 w-6" strokeWidth={1.4} />
          )}
        </button>
      </nav>

      <div
        className={`overflow-hidden border-b border-warm-white/10 bg-bg/95 backdrop-blur-md transition-[max-height] duration-500 md:hidden ${
          open ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={location.pathname === "/" ? link.href : `/${link.href}`}
                onClick={(event) => {
                  event.preventDefault();
                  handleHashNavigate(link.href);
                }}
                className="block py-3 text-sm uppercase tracking-[0.18em] text-warm-white/80 transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}

          <li>
            <Link
              to="/characters"
              onClick={() => setOpen(false)}
              className="block py-3 text-sm uppercase tracking-[0.18em] text-warm-white/80 transition-colors duration-300 hover:text-gold"
            >
              Characters
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
