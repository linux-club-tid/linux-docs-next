import { useEffect, useState } from "react";

export const scrollToInnerPage = (
  e: React.MouseEvent<HTMLAnchorElement>,
  targetId: string,
) => {
  e.preventDefault();
  document
    .getElementById(targetId)
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
};

export const getText = (children: React.ReactNode): string => {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map((c) => getText(c)).join("");
  return "";
};

export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const value = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setProgress(value);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return progress;
};
