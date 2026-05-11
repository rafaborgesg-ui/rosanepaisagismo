import { useEffect } from "react";
import { X } from "lucide-react";

export default function KiwifyModal({ url, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-2xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-white rounded-full p-1.5 shadow-md hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5 text-stone-600" />
        </button>
        <iframe
          src={url}
          className="w-full flex-1 border-0"
          title="Checkout"
          allow="payment"
        />
      </div>
    </div>
  );
}
