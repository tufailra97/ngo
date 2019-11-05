import React from 'react';
import { IconProps } from 'interfaces';

export default ({ width, height, color }: IconProps): React.ReactElement => {
  return (
    <svg
      version='1.1'
      id='Layer_1'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x='0px'
      y='0px'
      viewBox='0 0 461.145 461.145'
      xmlSpace='preserve'
      width={width}
      height={height}
      fill={color}
    >
      <g>
        <polygon
          points='343.598,108.13 333.821,117.907 439.566,223.645 0,223.651 0,237.48 439.566,237.473 333.821,343.238 
		343.598,353.015 461.145,235.447 461.145,225.67 	'
        />
      </g>
    </svg>
  );
};
