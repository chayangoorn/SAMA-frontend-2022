import { configureStore } from '@reduxjs/toolkit'
import ActDataReducer from './features/activityDataSlice'
import userDataReducer from './features/UserDataSlice'
import AchieveDataReducer from './features/achieveDataSlice'
import CheckActReducer from './features/activityCheckSlice'

export const store = configureStore({
    reducer: {
        actData: ActDataReducer,
        userData: userDataReducer,
        achieveData: AchieveDataReducer,
        checkAct: CheckActReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
