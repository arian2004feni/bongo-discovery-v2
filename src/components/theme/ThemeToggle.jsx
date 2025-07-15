import { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const [themeValue, setThemeValue] = useState("light");

  // Load and apply saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const defaultTheme = savedTheme || (prefersDark ? "dark" : "light");

    setThemeValue(defaultTheme);
    document.documentElement.setAttribute("data-theme", defaultTheme);

    // Listen to custom theme-change event in same tab
    const handleThemeChange = () => {
      const newTheme = localStorage.getItem("theme");
      if (newTheme) {
        setThemeValue(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
      }
    };

    window.addEventListener("theme-change", handleThemeChange);

    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  const handleToggle = () => {
    const newTheme = themeValue === "dark" ? "light" : "dark";
    setThemeValue(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new Event("theme-change")); // Notify all instances
  };

  return (
    <button
      onClick={handleToggle}
      className="btn btn-ghost btn-circle text-xl"
      aria-label="Toggle Theme"
    >
      {themeValue === "dark" ? (
        <IoMoonOutline className="text-2xl" />
      ) : (
        <MdOutlineLightMode className="text-2xl" />
      )}
    </button>
  );
}
