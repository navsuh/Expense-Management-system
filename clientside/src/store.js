import { create } from 'zustand'
import { createPrimaryUserSlice } from './slice/createPrimaryUserSlice'

import { createUserLoginSlice } from './slice/createUserLoginSlice'

import { createExpenseTypeSlice } from './slice/createExpenseTypeSlice'
import { createHouseholdSlice } from './slice/createHouseholdSlice'
import { changepasswordSlice } from './slice/createChangePasswordSlice'
import {createMemberSlice} from './slice/createMemberSlice'

import { persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

export const useBoundStore = create(devtools (persist((...a) => ({
  ...createPrimaryUserSlice(...a),
  ...createUserLoginSlice(...a),
  ...createExpenseTypeSlice(...a),
  ...changepasswordSlice(...a),
...createHouseholdSlice(...a),
...createMemberSlice(...a)
}),{ name: 'bound-store' })

)
)