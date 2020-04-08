import React, { useReducer, useEffect, useRef } from 'react';
import { reducer, initialState, addSwatch, setGrid, SwatchesState, reset } from './reducer';
import Swatch from './Swatch';

import styles from './styles.module.scss';

function App() {
  
  const [swatchState, swatchDispatch] = useReducer(reducer, getStoredData());

  const gridSize = {
    '--grid-size': swatchState.gridWidth,
    '--grid-width': swatchState.gridWidth === 2 ? '11rem' : '8rem',
    '--grid-height': swatchState.gridWidth === 2 ? '8rem' : '11rem'
  } as React.CSSProperties;

  const stateRef = useRef(swatchState);
  stateRef.current = swatchState;

  useEffect(() => {
    const saveState = () => {
      window.localStorage.setItem(SWATCH_STATE, JSON.stringify(stateRef.current));
    }
    window.addEventListener('unload', saveState);
  });

  return (
    <>
      <form className={styles.gridForm}>
        <input type='number' value={swatchState.gridWidth} onChange={e => swatchDispatch(setGrid(+e.currentTarget.value))}/>
        <button type='button' onClick={() => swatchDispatch(reset())}>Reset</button>
      </form>
      <div style={gridSize} className={styles.grid}>
        {
          swatchState.swatches.map(
            (swatch, i) => (
              <Swatch
                key={`${swatch.color}-${i}`}
                index={i}
                state={swatch}
                dispatch={swatchDispatch}
              />)
          )
        }
        <div className={styles.add} onClick={() => swatchDispatch(addSwatch())}>
          Add Swatch
        </div>
      </div>
    </>
  );
}

export default App;

const SWATCH_STATE = 'SWATCH_STATE';

const getStoredData = (): SwatchesState => {
  const storedData = window.localStorage.getItem(SWATCH_STATE);
  return storedData ? JSON.parse(storedData) : initialState;
};
