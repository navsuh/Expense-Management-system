import { create } from 'zustand'
import { createPrimaryUserSlice } from './slice/createPrimaryUserSlice'

import { createUserLoginSlice } from './slice/createUserLoginSlice'


export const useBoundStore = create((...a) => ({
  ...createPrimaryUserSlice(...a),
  ... createUserLoginSlice(...a),
}))