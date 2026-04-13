import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { fadeUp, fadeLeft, staggerContainer } from "../utils/animations";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const navLinks = [
    { label: t("navbar.accueil"), to: "/" },
    { label: t("navbar.about"), to: "/about" },
    { label: t("navbar.produits"), to: "/products" },
    { label: t("navbar.references"), to: "/references" },
    { label: t("navbar.contact"), to: "/contact" },
  ];

  return (
    <footer className="bg-[#0d0d0d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Main Footer ── */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeLeft} className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-sm bg-[#2E7D32] flex items-center justify-center">
                <span className="text-white font-black text-base">P</span>
              </div>
              <div>
                <div className="text-white font-bold text-base tracking-wider">
                  PINTAPLANA
                </div>
                <div className="text-[#FFC107] font-bold text-xs tracking-widest">
                  MAROC
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mt-6">
              {t("footer.desc")}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h3 className="text-white font-bold text-xs tracking-widest uppercase mb-5">
              {t("footer.nav_title")}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-[#FFC107] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-gray-600 group-hover:bg-[#FFC107] group-hover:w-6 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h3 className="text-white font-bold text-xs tracking-widest uppercase mb-5">
              {t("footer.contact_title")}
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a
                  href="tel:+212661180779"
                  className="text-gray-300 hover:text-[#FFC107] transition-colors"
                >
                  {t("footer.phone_mobile")}
                </a>
              </li>
              <li>contact@pintaplana.net</li>
              <li>Maroc</li>
              <li className="pt-1">
                <span className="inline-flex items-center gap-2 text-[#4CAF50] text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © {year}{" "}
            <span className="text-gray-300 font-semibold">
              PINTAPLANA MAROC
            </span>
            . {t("footer.rights")}
          </p>
          <p className="text-gray-600 text-xs">{t("footer.keywords")}</p>
        </div>
      </div>
    </footer>
  );
}
