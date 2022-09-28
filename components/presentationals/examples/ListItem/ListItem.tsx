import React from 'react';

import classNames from 'classnames';

import { ExampleItem } from 'models/api';
import { CircularProgress, IconButton } from '@mui/material';

import IconDisplay, {
  IconNames,
} from 'components/presentationals/IconDisplay/IconDisplay';

interface Props {
  data: ExampleItem;
  onDeleteClick?: () => void;
  onEditClick?: () => void;
  isLoading?: boolean;
  className?: string;
}

function ListItem({
  data: { title, description },
  onDeleteClick,
  onEditClick,
  isLoading,
  className,
}: Props) {
  const combinedClassNames = [
    'flex items-center justify-between w-full px-4 py-2 space-x-2 rounded-lg shadow-lg dark:text-white dark:bg-slate-600',
    className,
  ];

  return (
    <li className={classNames(combinedClassNames)}>
      <div className="space-y-1">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm italic">{description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <IconButton disabled={isLoading} size="large" onClick={onEditClick}>
          <IconDisplay name={IconNames.Pencil} className="dark:stroke-white" />
        </IconButton>
        <IconButton
          disabled={isLoading}
          size="large"
          onClick={onDeleteClick}
          className="dark:text-white disabled:text-white"
        >
          {isLoading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            <IconDisplay name={IconNames.Cross} className="stroke-current" />
          )}
        </IconButton>
      </div>
    </li>
  );
}

export default ListItem;
