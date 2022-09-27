import React from 'react';

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
}

function ListItem({
  data: { title, description },
  onDeleteClick,
  onEditClick,
  isLoading,
}: Props) {
  return (
    <li className="flex items-center justify-between w-full px-4 py-2 space-x-2 rounded-lg shadow-lg text-whiterounded-lg">
      <div className="space-y-1">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm italic">{description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <IconButton disabled={isLoading} size="large" onClick={onEditClick}>
          <IconDisplay name={IconNames.Pencil} />
        </IconButton>
        <IconButton disabled={isLoading} size="large" onClick={onDeleteClick}>
          {isLoading ? (
            <CircularProgress size={18} color="primary" />
          ) : (
            <IconDisplay name={IconNames.Cross} />
          )}
        </IconButton>
      </div>
    </li>
  );
}

export default ListItem;
