import React from 'react';
import { SwatchState } from "./Swatch";

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

export const reducer = (state: SwatchesState, action: Action): SwatchesState => {
  switch (action.type) {
    case ADD: {
      return {
        ...state,
        swatches: [...state.swatches, {color: ''}]
      };
    }
    case DELETE: {
      const swatches = [...state.swatches];
      swatches.splice(action.payload, 1);
      return {
        ...state,
        swatches
      };
    }
    case SET_COLOR: {
      const {
        color,
        index
      } = action.payload;
      return {
        ...state,
        swatches: state.swatches.map((swatch, i) => i === index ? {...swatch, color} : swatch)
      };
    }
    case SET_GRID: {
      return {
        ...state,
        gridWidth: action.payload
      };
    }
    default:
      return state;
  }
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
