import { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";

const Toast = ({ type = "success", message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const types = {
    success: {
      bg: "bg-green-500",
      icon: <FaCheckCircle className="text-white text-xl" />,
    },
    error: {
      bg: "bg-red-500",
      icon: <FaTimesCircle className="text-white text-xl" />,
    },
    warning: {
      bg: "bg-yellow-500",
      icon: <FaExclamationTriangle className="text-white text-xl" />,
    },
  };

  return (
    <div className={`fixed top-5 right-5 z-50 ${types[type].bg} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in`}>
      {types[type].icon}
      <span className="font-medium">{message}</span>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/70 animate-progress w-full rounded-b-xl"></div>
    </div>
  );
};

export default Toast;