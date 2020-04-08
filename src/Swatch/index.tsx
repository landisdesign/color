import React from 'react';

import styles from './styles.module.scss';
import { SwatchDispatch, deleteSwatch } from '../reducer';

export type SwatchPosition = 'top' | 'right' | 'bottom' | 'left';

export interface SwatchState {
  color: string;
  position?: SwatchPosition;
}

export interface SwatchProps {
  index: number;
  state: SwatchState;
  dispatch: SwatchDispatch;
}

const Swatch: React.FC<SwatchProps> = (props: SwatchProps) => {

  const {
    state: {
      color = '',
      position = 'top'
    },
    index,
    dispatch
  } = props;

  return (
    <div className={`${styles.swatch} ${styles[position]}`}>
      <div className={styles.text}>#{color}</div>
      <div className={styles.color} style={{backgroundColor: color}}>
        <input type='text' />
        <button type='button' onClick={() => dispatch(deleteSwatch(index))}>Delete</button>
      </div>
    </div>
  );
};

export default Swatch;
