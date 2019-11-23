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
      <path d='M256 48C141.2 48 48 141.2 48 256s93.2 208 208 208 208-93.2 208-208S370.8 48 256 48zm21 312h-42V235h42v125zm0-166h-42v-42h42v42z' />{' '}
    </svg>
  );
};
