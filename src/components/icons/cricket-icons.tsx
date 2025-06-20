import type { SVGProps } from 'react';

export function BatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 10.5s-1-3-3.5-3-3.5 3-3.5 3L4 20l10-6Z" />
      <path d="m13.5 11.5 6 6" />
      <path d="M15 17c.9-.9.9-2.3 0-3.2s-2.3-.9-3.2 0c-.9.9-.9 2.3 0 3.2.9.9 2.3.9 3.2 0Z" />
    </svg>
  );
}

export function BallIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 0-8.66 5M12 22a10 10 0 0 0 8.66-5M2 12a10 10 0 0 0 5 8.66M22 12a10 10 0 0 0-5 8.66" />
    </svg>
  );
}

export function StadiumIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 10V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" />
      <path d="M2 10h20" />
      <path d="M4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10" />
      <path d="M10 10v5a2 2 0 0 1-2 2H6" />
      <path d="M14 10v5a2 2 0 0 0 2 2h2" />
      <path d="M8 22V10" />
      <path d="M16 22V10" />
    </svg>
  );
}

export function WhistleIcon(props: SVGProps<SVGSVGElement>) { // For Chennai Super Kings specific theme if needed, or general referee
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 16.5c0 .8-.7 1.5-1.5 1.5S7 17.3 7 16.5v-10S7 4 9.5 4s2.5 2.5 2.5 2.5" />
      <path d="M7 15.8c0 .9.9 1.7 2 1.7s2-.8 2-1.7" />
      <path d="M15.5 11.5c.8 0 1.5-.7 1.5-1.5S16.3 8.5 15.5 8.5 14 9.2 14 10s.7 1.5 1.5 1.5Z" />
      <path d="M14 18.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5" />
      <path d="M14 6.5S14 4 16.5 4s2.5 2.5 2.5 2.5" />
    </svg>
  )
}
