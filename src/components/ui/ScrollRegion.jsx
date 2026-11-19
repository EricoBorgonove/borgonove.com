import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ScrollRegion({ as: element = "div", children, className = "", "aria-label": label, tabIndex, ...props }) {
  const { t } = useTranslation();
  const Container = element;
  const ref = useRef(null);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const node = ref.current;
    let frame;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollable(
        node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1
      ));
    };
    const resize = new ResizeObserver(measure);
    const observeContent = () => {
      resize.disconnect();
      resize.observe(node);
      for (const child of node.children) resize.observe(child);
      measure();
    };
    const mutations = new MutationObserver(observeContent);
    mutations.observe(node, { childList: true, subtree: true, characterData: true });
    observeContent();
    return () => {
      resize.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return <Container {...props} ref={ref} className={`ui-scroll-region ${className}`}
    tabIndex={tabIndex ?? (scrollable ? 0 : undefined)}
    role={scrollable ? "region" : undefined} aria-label={scrollable ? label || t("common.ui.scrollContent") : undefined}>
    {children}
  </Container>;
}
