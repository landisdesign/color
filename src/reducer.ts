import React from 'react';
import { SwatchState, SwatchPosition } from "./Swatch";

export interface SwatchesState {
  swatches: SwatchState[];
  gridWidth: number;
}

export interface Action {
  type: string;
  payload?: any;
}

export type SwatchDispatch = React.Dispatch<Action>;

export const initialState: SwatchesState = {
  swatches: [],
  gridWidth: 3
};

const ADD = 'ADD';
const DELETE = 'DELETE';
const SET_COLOR = 'SET_COLOR';
const SET_GRID = 'SET_GRID';
const RESET = 'RESET';

export const reducer = (state: SwatchesState, action: Action): SwatchesState => {
  const {
    gridWidth,
    swatches
  } = state;
  switch (action.type) {
    case ADD: {
      return {
        gridWidth,
        swatches: positionSwatches(gridWidth, [...swatches, {color: ''}])
      };
    }
    case DELETE: {
      const newSwatches = [...state.swatches];
      newSwatches.splice(action.payload, 1);
      return {
        gridWidth,
        swatches: positionSwatches(gridWidth, newSwatches)
      };
    }
    case SET_COLOR: {
      const {
        color,
        index
      } = action.payload;
      return {
        gridWidth,
        swatches: swatches.map((swatch, i) => i === index ? {...swatch, color} : swatch)
      };
    }
    case SET_GRID: {
      return {
        gridWidth: action.payload,
        swatches: positionSwatches(action.payload, swatches)
      };
    }
    case RESET: {
      return {
        gridWidth,
        swatches: []
      };
    }
    default:
      return state;
  }
};

const positionSwatches = (gridWidth: number, swatches: SwatchState[]): SwatchState[] => {
  const leftOrRight: SwatchPosition[] = ['left', 'right'];
  const topOrBottom: SwatchPosition[] = ['top', 'bottom'];

  if (gridWidth === 1) {
    return swatches.map(({color}) => ({color, position: 'right'}));
  }

  if (gridWidth === 2 ) {
    return swatches.map(({color}, i) => ({color, position: leftOrRight[i % 2]}));
  }

  return swatches.map(({color}, i) => ({color, position: topOrBottom[~~(i / gridWidth) % 2]}));
};

export const setColor = (index: number, color: string) => ({
  type: SET_COLOR,
  payload: {
    index,
    color
  }
});

export const addSwatch = () => ({ type: ADD });

export const deleteSwatch = (index: number) => ({
  type: DELETE,
  payload: index
});

export const setGrid = (size: number) => ({
  type: SET_GRID,
  payload: size
});

export const reset = () => ({ type: RESET });
