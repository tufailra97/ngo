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
          points='461.145,223.655 21.579,223.662 127.324,117.91 117.547,108.134 0,225.695 0,235.471 117.547,353.011 
		127.324,343.235 21.579,237.49 461.145,237.483 	'
        />
      </g>
    </svg>
  );
};
