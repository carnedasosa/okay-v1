import type { SVGProps } from "react";

const paths = {
  phone: (
    <path d="M6.6 3.5h2.6l1.5 4-2 1.3a11 11 0 0 0 6.5 6.5l1.3-2 4 1.5v2.6a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 12.5H6L5 8Z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </>
  ),
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowDown: <path d="M12 4v15m-6-6 6 6 6-6" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  menu: <path d="M3.5 8h17M3.5 16h17" />,
  close: <path d="m5.5 5.5 13 13m0-13-13 13" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  apple: (
    <path
      d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5a4.3 4.3 0 0 0-3.4-1.8c-1.4-.2-2.8.8-3.5.8-.7 0-1.9-.8-3-.8a4.6 4.6 0 0 0-3.9 2.3c-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 3 2.4 1.2-.1 1.6-.8 3-.8s1.8.8 3 .8c1.3 0 2.1-1.2 2.9-2.3a10 10 0 0 0 1.3-2.7 4.1 4.1 0 0 1-2.6-3.9ZM14.2 5.8A4 4 0 0 0 15.1 3a4.1 4.1 0 0 0-2.7 1.4 3.8 3.8 0 0 0-1 2.7 3.4 3.4 0 0 0 2.8-1.3Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  pause: <path d="M8.5 5v14m7-14v14" />,
  play: (
    <path d="M5 3.8v16.4c0 .6.7 1 1.2.7L20.4 12.7a.8.8 0 0 0 0-1.4L6.2 3.1c-.5-.3-1.2.1-1.2.7Z" />
  ),
} as const;

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  /** Provide a label only when the icon carries meaning on its own. */
  label?: string;
};

export function Icon({ name, size = 20, label, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
