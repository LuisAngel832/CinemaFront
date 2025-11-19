import React from "react";

const Footer = () => {
  return (
    <footer
      className="
        py-4 px-8
        border-t border-[#ddd]
        bg-white
        text-center
        text-[0.85rem]
      "
    >
      <p className="my-[0.15rem]">
        © 2025 CinePlus | Todos los derechos reservados
      </p>

      <p className="my-[0.15rem]">
        Contacto: soporte@cineplus.com
      </p>
    </footer>
  );
};

export default Footer;
