import type { FC } from 'react';

export const InfoIcon: FC = (props) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="20" cy="20" r="20" fill="var(--background-paper)" />
    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="4" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.5 11C18.6716 11 18 11.6716 18 12.5V20.5C18 21.3284 18.6716 22 19.5 22H20.5C21.3284 22 22 21.3284 22 20.5V12.5C22 11.6716 21.3284 11 20.5 11H19.5ZM19.5 25C18.6716 25 18 25.6716 18 26.5V27.5C18 28.3284 18.6716 29 19.5 29H20.5C21.3284 29 22 28.3284 22 27.5V26.5C22 25.6716 21.3284 25 20.5 25H19.5Z"
      fill="currentColor"
    />
  </svg>
);

InfoIcon.displayName = 'InfoIcon';
