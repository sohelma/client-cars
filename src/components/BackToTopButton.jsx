import React, { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300); // 300px scroll হলে button দেখাবে
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition"
      aria-label="Back to top"
    >
      ⬆️
    </button>
  );
};

export default BackToTopButton;
