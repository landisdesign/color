import React, { useReducer } from 'react';
import { reducer, initialState, addSwatch } from './reducer';
import Swatch from './Swatch';

import styles from './styles.module.scss';

function App() {
  
  const [swatchState, swatchDispatch] = useReducer(reducer, initialState);

  const gridSize = {
    '--grid-size': swatchState.gridWidth,
    '--grid-width': swatchState.gridWidth === 2 ? '8rem' : '6rem'
  } as React.CSSProperties;

  return (
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
      <div>
        <button type='button' onClick={() => swatchDispatch(addSwatch())}>Add Swatch</button>
      </div>
    </div>
  );
}

export default App;
