import React from 'react';

// Define the types for the props, extending SVGProps to accept all standard SVG attributes
interface RecordingIconProps extends React.SVGProps<SVGSVGElement> {
  fillcolor?: string; // Optional 'fillcolor' prop to allow customization of the icon color
}

const RecordingIcon: React.FC<RecordingIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props} // Spread any additional props that might be passed to the component
  >
    <mask
      id="mask0_24_98"
      style={{ maskType: 'alpha' }}
      width="24"
      height="24"
      x="0"
      y="0"
      maskUnits="userSpaceOnUse"
    >
      <path fill="#D9D9D9" d="M0 0H24V24H0z"></path>
    </mask>
    <g mask="url(#mask0_24_98)">
      <circle cx="12" cy="12" r="5" fill={props.fillcolor || '#000'}></circle>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={props.fillcolor || '#000'}
        strokeWidth="2"
      ></circle>
    </g>
  </svg>
);

export default RecordingIcon;
