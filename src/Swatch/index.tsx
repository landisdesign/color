import React, { useState, useRef, useEffect, FormEventHandler } from 'react';

import styles from './styles.module.scss';
import { SwatchDispatch, deleteSwatch, setColor } from '../reducer';

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

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState(color);
  const [priorColor, setPriorColor] = useState(color);
  if (priorColor !== color) {
    setPriorColor(color);
    setInputValue(color);
  }

  const submit: FormEventHandler = e => {
    e.preventDefault();
    setFocused(false);
    dispatch(setColor(index, inputValue));
  };

  const cancel = () => {
    setFocused(false);
    setInputValue(color);
  };

  const activate = () => {
    setFocused(true);
  }

  useEffect(() => {
    if (isFocused) {
      inputRef.current!.focus();
    }
  }, [isFocused]);

  return (
    <div className={`${styles.swatch} ${styles[position]}`} onClick={activate}>
      <div className={styles.text}><span>#{color}</span></div>
      <div className={styles.color} style={{backgroundColor: `#${inputValue}`}}>
        <div className={isFocused ? styles.focused : undefined}>
          <form onSubmit={submit}>
            <input type='text' value={inputValue} onChange={e => setInputValue(e.currentTarget.value)} ref={inputRef} />
            <button type='submit'>Update</button>
            <button type='button' onClick={cancel}>Cancel</button>
          </form>
          <button type='button' onClick={() => dispatch(deleteSwatch(index))}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Swatch;
