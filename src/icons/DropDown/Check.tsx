import * as React from 'react';

// Define the types for the props, extending SVGProps to accept all standard SVG attributes
interface CheckIconProps extends React.SVGProps<SVGSVGElement> {}

const Check: React.FC<CheckIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    className="mt-1"
    {...props} // Spread any additional props that might be passed to the component
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16.667 5L7.5 14.167 3.333 10"
    ></path>
  </svg>
);

export default Check;
