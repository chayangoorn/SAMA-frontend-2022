import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StudentUser, TeacherUser } from "../type";
import { auth } from "../../Firebase/firebase";


interface UserState {
    user: StudentUser | TeacherUser
    loading: boolean
}

const initialState = {
    user : {},
    loading: false
} as UserState

export const fetchUserBytoken = createAsyncThunk<StudentUser | TeacherUser, Array<string|null|undefined>>(
    'users/fetchUserByToken',
    async ([email, school], thunkAPI) => {
        //const token = await auth.currentUser?.getIdToken()
        //const uid = auth.currentUser?.uid
        const respones: any = await axios.get('https://2r5zg4uzoh.execute-api.ap-northeast-2.amazonaws.com/Dev/data/'+email)
        if (respones.status === 200) {
            let data: StudentUser | TeacherUser
            let user = respones.data[0]
            if (user['type'] === "STD") {
                data = {
                    std_id: user['id'],
                    firstname: user['std_firstname'],
                    lastname: user['std_lastname'],
                    classroom: user['std_classroom'],
                    number: user['std_number'],
                    img_path: '',
                    school: user['school'],
                    email: user['std_email'],
                    flag: user['type'] 
                } 
            } else {
                data = {
                    firstname: user['tch_firstname'],
                    lastname: user['tch_lastname'],
                    img_path: '',
                    email: user['tch_email'],
                    school: user['school'],
                    flag: user['type'] 
                }
            }
            return data;
        } else {
            return thunkAPI.rejectWithValue(respones.statusText);
        }
    }
  );

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        changeData: (state, action: PayloadAction<StudentUser | TeacherUser>) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserBytoken.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchUserBytoken.fulfilled, (state, { payload }) => {
            state.loading = false
            state.user = payload
        });
        builder.addCase(fetchUserBytoken.rejected, (state) => {
            console.log('error')
            state.loading = false
            state = initialState
        });
    }
})

export const { changeData } = userDataSlice.actions

export default userDataSlice.reducer