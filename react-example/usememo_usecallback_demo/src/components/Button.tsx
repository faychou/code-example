import React, { memo } from 'react';

interface IProps {
  onClick: () => void;
}

export const RedButton = memo(({onClick}: IProps) => {
  console.log('---RedButton render---');

  return <button onClick={() => onClick()}> + </button>;
});

export const BlueButton = memo(({onClick}: IProps) => {
  console.log('---BlueButton render---');

  return <button onClick={() => onClick()}> + </button>;
});