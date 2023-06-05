import { create } from 'zustand'
import { createPrimaryUserSlice } from './slice/createPrimaryUserSlice'

import { createUserLoginSlice } from './slice/createUserLoginSlice'

import { createExpenseTypeSlice } from './slice/createExpenseTypeSlice'
import { persist } from 'zustand/middleware'


export const useBoundStore = create(persist((...a) => ({
  ...createPrimaryUserSlice(...a),
  ...createUserLoginSlice(...a),
  ...createExpenseTypeSlice(...a),
}),{ name: 'bound-store' }

)
)