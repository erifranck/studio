import type React from 'react';

interface CvForgeLogoProps extends React.SVGProps<SVGSVGElement> {
  // no custom props needed for now
}

const CvForgeLogo: React.FC<CvForgeLogoProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 50"
    width="120"
    height="30"
    aria-label="CV Forge Logo"
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <style>
      {`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
        .logo-text {
          font-family: 'Montserrat', var(--font-sans), sans-serif;
          font-size: 30px;
          font-weight: 700;
          fill: url(#logoGradient);
        }
        .logo-icon-path {
          fill: hsl(var(--primary));
        }
      `}
    </style>
    <path
      className="logo-icon-path"
      d="M10 5 Q15 0 20 5 V45 Q15 50 10 45 Z M20 5 H30 V45 H20 Z"
    />
    <text x="40" y="35" className="logo-text">
      CV Forge
    </text>
  </svg>
);

export default CvForgeLogo;
