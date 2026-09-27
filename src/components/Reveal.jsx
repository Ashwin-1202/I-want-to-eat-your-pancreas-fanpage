import useScrollReveal from "../hooks/useScrollReveal";

/**
 * Wraps children in a gentle fade + slide-up reveal that triggers
 * once, the first time the element enters the viewport.
 */
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, visible] = useScrollReveal();

  return (
    <Tag
      ref={ref}
      className={`${className} transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
