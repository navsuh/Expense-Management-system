import { create } from 'zustand'
import { createPrimaryUserSlice } from './slice/createPrimaryUserSlice'

import { createUserLoginSlice } from './slice/createUserLoginSlice'

import { createExpenseTypeSlice } from './slice/createExpenseTypeSlice'
import { createHouseholdSlice } from './slice/createHouseholdSlice'
import { changepasswordSlice } from './slice/createChangePasswordSlice'
import {createMemberSlice} from './slice/createMemberSlice'
import { createForgetPasswordSlice } from './slice/createForgetPasswordSlice'
import { createResetPasswordSlice } from './slice/createResetPasswordSlice'

import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

export const useBoundStore = create(devtools (persist((...a) => ({
  ...createPrimaryUserSlice(...a),
  ...createUserLoginSlice(...a),
  ...createExpenseTypeSlice(...a),
  ...changepasswordSlice(...a),
  ...createHouseholdSlice(...a),
  ...createMemberSlice(...a),
  ...createForgetPasswordSlice(...a),
  ...createResetPasswordSlice(...a)
}),{ name: 'boundstore',
partialize: (state) =>
Object.fromEntries(
  Object.entries(state).filter(([key]) => !['changepasswordresponse'].includes(key))
), })

)
)

// export const useBoundStore = create(devtools ((...a) => ({
//   ...createPrimaryUserSlice(...a),
//   ...createUserLoginSlice(...a),
//   ...createExpenseTypeSlice(...a),
//   ...changepasswordSlice(...a),
// })

// )
// )