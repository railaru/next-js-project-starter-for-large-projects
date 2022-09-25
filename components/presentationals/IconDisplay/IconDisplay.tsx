import React from 'react';

import { Cross1Icon } from '@radix-ui/react-icons';
import classNames from 'classnames';

export enum IconNames {
  Cross,
}

export enum IconSizes {
  Small,
  Default,
  Medium,
  Large,
}

interface Props {
  name: IconNames;
  size?: IconSizes;
  className?: string;
}

function IconDisplay({ name, size = IconSizes.Default, className }: Props) {
  const combinedClassNames = [
    { 'transform scale-75': size === IconSizes.Small },
    { 'transform scale-125': size === IconSizes.Medium },
    { 'transform scale-150': size === IconSizes.Large },
    className,
  ];

  return (
    <>
      {name === IconNames.Cross && (
        <Cross1Icon className={classNames(combinedClassNames)} />
      )}
    </>
  );
}

export default IconDisplay;
