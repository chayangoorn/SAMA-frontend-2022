import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StudentUser, TeacherUser } from "../type";

interface UserState {
    user: StudentUser | TeacherUser
    loading: boolean
}

const initialState = {
    user : {},
    loading: false
} as UserState

export const fetchUserBytoken = createAsyncThunk<StudentUser | TeacherUser,string | null | undefined>(
    'users/fetchUserByToken',
    async (email , thunkAPI) => {
        const respones: any = await axios.post('http://www.zp11489.tld.122.155.167.85.no-domain.name/www/login.php', JSON.stringify({email: email}))
        if (respones.status === 200) {
            let data: StudentUser | TeacherUser
            if (respones.data['flag'] === '0') {
                data = {
                    user_id: respones.data['user_id'],
                    std_id: respones.data['std_ID'],
                    firstname: respones.data['std_firstname'],
                    lastname: respones.data['std_lastname'],
                    classroom: respones.data['std_classroom'],
                    number: respones.data['std_number'],
                    dormitory: respones.data['std_dormitory'],
                    img_path: respones.data['img_path'],
                    email: respones.data['std_email'],
                    flag: respones.data['flag'] 
                } 
            } else {
                data = {
                    user_id: respones.data['user_id'],
                    firstname: respones.data['tch_firstname'],
                    lastname: respones.data['tch_lastname'],
                    img_path: respones.data['tch_img'],
                    email: respones.data['tch_email'],
                    flag: respones.data['flag'] 
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