import React from 'react';

// Define types for the props
interface MicOnIconProps extends React.SVGProps<SVGSVGElement> {
  fillcolor?: string; // Optional 'fillcolor' prop to allow customization of the icon color
}

const MicOnIcon: React.FC<MicOnIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props} // Spread any additional props that might be passed to the component
    >
      <mask
        id="mask0_27_238"
        style={{ maskType: 'alpha' }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="#D9D9D9" d="M0 0H24V24H0z"></path>
      </mask>
      <g mask="url(#mask0_27_238)">
        <path
          fill={props.fillcolor ? props.fillcolor : '#fff'} // Apply fillcolor prop if provided, default to white
          fillRule="evenodd"
          d="M9.655 2.996A3.307 3.307 0 008.6 5.4v6.8c0 .902.38 1.767 1.055 2.404a3.71 3.71 0 002.545.996 3.71 3.71 0 002.546-.996A3.307 3.307 0 0015.8 12.2V5.4c0-.902-.38-1.767-1.054-2.404A3.71 3.71 0 0012.2 2a3.71 3.71 0 00-2.545.996zm-3.119 8.198c.17.16.264.376.264.601v.405c0 1.353.569 2.65 1.582 3.606A5.565 5.565 0 0012.2 17.3a5.565 5.565 0 003.818-1.494c1.013-.956 1.582-2.253 1.582-3.606v-.405c0-.225.095-.441.264-.6a.928.928 0 01.636-.25c.239 0 .468.09.636.25.17.159.264.375.264.6v.405c0 1.656-.64 3.256-1.8 4.498-1.16 1.243-2.76 2.043-4.5 2.25V20.7h1.8c.239 0 .468.09.636.249.17.16.264.376.264.601a.827.827 0 01-.264.601.928.928 0 01-.636.249H9.5a.928.928 0 01-.636-.249.827.827 0 01-.264-.601c0-.225.095-.442.264-.601A.928.928 0 019.5 20.7h1.8v-1.752C7.748 18.53 5 15.668 5 12.2v-.405c0-.225.095-.441.264-.6a.928.928 0 01.636-.25c.239 0 .468.09.636.25z"
          clipRule="evenodd"
        ></path>
      </g>
    </svg>
  );
};

export default MicOnIcon;