import * as React from "react";

// Define the types for the props, extending SVGProps to accept all standard SVG attributes
interface PipIconProps extends React.SVGProps<SVGSVGElement> {
  fillcolor?: string; // Optional 'fillcolor' prop to allow customization of the icon color
}

const PipIcon: React.FC<PipIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    viewBox="0 96 960 960"
    fill="none"
    {...props} // Spread any additional props that might be passed to the component
  >
    <path
      d="M80 536v-60h178L57 276l43-43 200 200V256h60v280H80Zm60 360q-24 0-42-18t-18-42V606h60v230h340v60H140Zm680-280V316H430v-60h390q24 0 42 18t18 42v300h-60ZM540 896V676h340v220H540Z"
      fill={props.fillcolor || "#000"} // Apply fillcolor prop if provided, default to black
    />
  </svg>
);

export default PipIcon;
