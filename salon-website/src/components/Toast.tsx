import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const Toast: React.FC = () => {
  const { toast } = useAuth();
  return (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className={`fixed top-6 right-6 z-[130] px-5 py-4 rounded-md shadow-md border ${toast.type === 'success' ? 'bg-green-50 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200'}`}
        >
          <p className="text-sm font-semibold">{toast.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
