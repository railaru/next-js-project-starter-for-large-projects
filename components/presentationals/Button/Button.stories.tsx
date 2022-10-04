import Button from './Button';
import React from 'react';

export default {
  title: 'Components/Button',
  component: Button,
};

export function ButtonComponent() {
  return (
    <div className="space-y-8 max-w-[500px]">
      <Button onClick={() => null}>Regular</Button>
      <br />
      <Button type={'submit'} onClick={() => null}>
        Submit
      </Button>
      <br />
      <Button type={'submit'} onClick={() => null} isLoading>
        Loading
      </Button>
    </div>
  );
}
