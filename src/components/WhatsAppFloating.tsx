"use client";

import { usePathname } from "next/navigation";

export default function WhatsAppFloating() {
  const pathname = usePathname();
  const isArabic = pathname ? pathname.startsWith("/ar") : false;

  return (
    <a
      href="https://wa.me/96896680001"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 ${
        isArabic ? "left-6" : "right-6"
      } z-50 flex items-center gap-2 bg-secondary text-background hover:bg-secondary/90 transition-all duration-300 shadow-[0_4px_20px_rgba(233,193,118,0.3)] hover:shadow-[0_4px_25px_rgba(233,193,118,0.5)] px-4 py-3 border border-secondary/20 hover:scale-105 group`}
      style={{ borderRadius: "0px" }}
      id="whatsapp-floating-button"
    >
      {/* WhatsApp Premium Gold SVG Icon */}
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="currentColor"
        className="transition-transform duration-300 group-hover:rotate-12"
      >
        <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.459 3.479 1.332 5.002L2 22l5.161-1.353a9.923 9.923 0 0 0 4.851 1.258h.004c5.505 0 9.987-4.482 9.987-9.988C22 6.482 17.518 2 12.012 2zm5.787 14.414c-.237.669-1.378 1.282-1.906 1.357-.468.066-.991.135-3.089-.731-2.529-1.042-4.148-3.606-4.275-3.774-.126-.168-1.026-1.363-1.026-2.599 0-1.236.653-1.844.887-2.094.234-.251.514-.313.685-.313.171 0 .343.003.491.01.152.007.356-.057.556.425.2.482.685 1.668.746 1.791.061.123.1.267.018.432-.082.165-.164.267-.286.411-.123.143-.258.32-.367.429-.122.12-.25.251-.107.496.143.245.635 1.043 1.362 1.691.936.833 1.726 1.091 1.972 1.214.246.123.389.102.534-.065.145-.168.614-.716.779-.959.165-.244.331-.204.556-.122.226.082 1.431.676 1.678.8.246.123.411.183.472.286.061.103.061.597-.176 1.266z" />
      </svg>
      <span className="font-label-caps text-label-caps tracking-wider font-bold">
        {isArabic ? "تواصل معنا" : "Click to chat"}
      </span>
    </a>
  );
}
