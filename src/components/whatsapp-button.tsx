"use client";

import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/13473066637"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300"
      aria-label="Chat with Visual Studio on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
