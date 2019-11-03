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
      viewBox='0 0 512 512'
      xmlSpace='preserve'
      width={width}
      height={height}
      fill={color}
    >
      <path d='M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z' />
    </svg>
  );
};
