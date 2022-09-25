import React from 'react';

import { ExampleItem } from 'models/api';
import { IconButton } from '@mui/material';

import IconDisplay, {
  IconNames,
} from 'components/presentationals/IconDisplay/IconDisplay';

interface Props {
  data: ExampleItem;
  onDeleteClick?: () => void;
}

function ListItem({ data: { title, description }, onDeleteClick }: Props) {
  return (
    <li className="flex items-center justify-between w-full px-4 py-2 space-x-2 bg-blue-700 rounded-lg">
      <div className="space-y-1">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm italic">{description}</p>
      </div>
      <IconButton size="large" onClick={onDeleteClick}>
        <IconDisplay name={IconNames.Cross} className="dark:stroke-white" />
      </IconButton>
    </li>
  );
}

export default ListItem;
