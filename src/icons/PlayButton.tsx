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
      viewBox='0 0 477.175 477.175'
      xmlSpace='preserve'
      width={width}
      height={height}
      fill={color}
    >
      <path d='M96 52v408l320-204L96 52z' />
    </svg>
  );
};
