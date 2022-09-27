import React, { ReactNode } from 'react';

import classnames from 'classnames';
import { CircularProgress } from '@mui/material';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  className?: string;
  isDisabled?: boolean;
}

function Button({
  children,
  onClick,
  type = 'button',
  isLoading,
  className,
  isDisabled,
}: Props) {
  const combinedClassNames = [
    'text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800',
    {
      'cursor-default': isLoading,
    },
    className,
  ];

  const isLoadingButton = isLoading;
  const isRegularButton = !isLoadingButton;
  const isDisabledButton = isLoadingButton || isDisabled;

  return (
    <button
      type={type}
      onClick={onClick}
      className={classnames(combinedClassNames)}
      disabled={isDisabledButton}
    >
      {isRegularButton && children}
      {isLoadingButton && (
        <div className="flex items-center justify-center w-full space-x-2">
          <span>{children}</span>
          <span>
            <CircularProgress
              size={18}
              className="relative top-[3px]"
              color="inherit"
            />
          </span>
        </div>
      )}
    </button>
  );
}

export default Button;
