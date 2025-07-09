import { useEffect, useState } from "react";
import { IoMoonOutline } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const [themeValue, setThemeValue] = useState("light");

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const defaultTheme = prefersDark ? "dark" : "light";
    setThemeValue(defaultTheme);
    document.documentElement.setAttribute("data-theme", defaultTheme);
  }, []);

  const handleToggle = () => {
    const newTheme = themeValue === "dark" ? "light" : "dark";
    setThemeValue(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <label className="swap swap-rotate text-xl btn btn-ghost btn-circle rounded-full">
      <input
        type="checkbox"
        checked={themeValue === "dark"}
        onChange={handleToggle}
      />

      {
        themeValue === "dark" ? (
          <IoMoonOutline className="swap-on text-2xl" />
        ) : (
          <MdOutlineLightMode className="swap-off text-2xl" />
        )
      }
    </label>
  );
}
