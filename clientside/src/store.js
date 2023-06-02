import { create } from 'zustand'
import { createPrimaryUserSlice } from './slice/createPrimaryUserSlice'


export const useBoundStore = create((...a) => ({
  ...createPrimaryUserSlice(...a),
//   ...createFishSlice(...a),
}))