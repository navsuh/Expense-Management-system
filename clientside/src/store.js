import { create } from 'zustand'
import { PrimaryUserSlice } from './slice/PrimaryUserSlice'

import { UserLoginSlice } from './slice/UserLoginSlice'

import { ExpenseTypeSlice } from './slice/ExpenseTypeSlice'
import { AdminUsersSlice } from './slice/AdminUsersSlice'

import { HouseholdSlice } from './slice/HouseholdSlice'
import { changepasswordSlice } from './slice/ChangePasswordSlice'
import {MemberSlice} from './slice/MemberSlice'
import { ForgetPasswordSlice } from './slice/ForgetPasswordSlice'
import { ResetPasswordSlice } from './slice/ResetPasswordSlice'
import {DailyExpenseSlice} from "./slice/DailyexpenseSlice"
import {PeriodicExpenseSlice} from "./slice/PeridoicExpenseSlice"
import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

export const useBoundStore = create(devtools (persist((...a) => ({
  ...PrimaryUserSlice(...a),
  ...UserLoginSlice(...a),
  ...ExpenseTypeSlice(...a),
  ...AdminUsersSlice(...a),
  ...changepasswordSlice(...a),
  ...HouseholdSlice(...a),
  ...MemberSlice(...a),
  ...ForgetPasswordSlice(...a),
  ...ResetPasswordSlice(...a),
  ...DailyExpenseSlice(...a),
  ...PeriodicExpenseSlice(...a)
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