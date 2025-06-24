import { Toaster } from "react-hot-toast";
import { useTheme } from "../context/theme/ThemeContext";

export const ToasterProvider = () => {
  const { theme } = useTheme();
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: theme === "dark" ? "#fff" : "#333",
          color: theme === "dark" ? "#000" : "#fff",
        },
      }}
    />
  );
};
