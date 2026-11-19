import { Button } from "./ui/Patterns";
import { useNavigate } from "react-router-dom";

export default function BackButton({
  fallbackTo = "/",
  className = "inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition",
  children,
}) {
  const navigate = useNavigate();

  function handleBack() {
    const idx = window.history?.state?.idx;
    if (typeof idx === "number" && idx > 0) {
      navigate(-1);
      return;
    }
    navigate(fallbackTo);
  }

  return (
    <Button variant="custom" type="button" onClick={handleBack} className={className}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[1em] w-[1em] shrink-0">
        <path
          fill="currentColor"
          d="M10.7 5.3a1 1 0 0 1 0 1.4L6.42 11H20a1 1 0 1 1 0 2H6.41l4.3 4.3a1 1 0 1 1-1.42 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.41 0Z"
        />
      </svg>
      {children}
    </Button>
  );
}
