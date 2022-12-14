import React from 'react';

import {
  Cross1Icon,
  Pencil1Icon,
  ViewHorizontalIcon,
} from '@radix-ui/react-icons';
import classNames from 'classnames';

export enum IconNames {
  Cross,
  Pencil,
  ViewHorizontal,
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
      {name === IconNames.Pencil && (
        <Pencil1Icon className={classNames(combinedClassNames)} />
      )}
      {name === IconNames.ViewHorizontal && (
        <ViewHorizontalIcon className={classNames(combinedClassNames)} />
      )}
    </>
  );
}

export default IconDisplay;
