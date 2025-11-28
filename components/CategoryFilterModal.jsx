import React, { useEffect } from "react";
import { motion } from "framer-motion";

const CategoryFilterModal = ({ open, setOpen, categories, active, onSelect }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9999] flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-5 text-center">
          Pilih Kategori Tari
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onSelect(cat);
                setOpen(false);
              }}
              className={`px-5 py-2.5 rounded-full border font-medium transition-all text-sm ${
                active === cat
                  ? "bg-pink-600 text-white border-pink-600 shadow-md"
                  : "border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CategoryFilterModal;
