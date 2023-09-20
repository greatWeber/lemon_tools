/* eslint-disable import/prefer-default-export */
import { createContext, useContext } from 'react';
import System from './system';

const context = createContext({
  systemStore: new System(),
});

export const useStores = () => useContext(context);
