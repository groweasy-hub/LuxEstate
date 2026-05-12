'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const [wobble, setWobble] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setWobble(true);
      setTimeout(() => setWobble(false), 900);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.a
      href="https://wa.me/919999999999?text=Hi%2C%20I%27m%20interested%20in%20a%20property"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-toast flex-center w-14 h-14 rounded-full shadow-xl ${wobble ? 'animate-wobble-periodic' : ''}`}
      style={{ background: '#25D366' }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
    >
      <MessageCircle size={26} color="#fff" fill="#fff" />
    </motion.a>
  );
}
