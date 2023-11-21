export interface ActData {
    act_id: string
    act_type: string
    act_done_time: number
    act_data: {
        act_date?: string
        act_head?: string
        act_print?: string
        act_hour?: number
        act_place?: string
        act_detail?: string
        act_feel?: string
        act_time_start?: string
        act_time_end?: string
    }
    std_ID: string 
    std_firstname: string
    std_lastname: string
    std_classroom: string
    std_number: number
    std_email: string
    tch_firstname: string
    tch_lastname: string
    tch_name?: string
    tch_email: string
    school: string
    act_create: string
    act_update: string
    flag: string
}

export interface ValidateAct {
    act_date: boolean
    act_head: boolean
    act_print: boolean
    act_hour: boolean
    act_place: boolean
    act_detail: boolean
    act_feel: boolean
    act_time_start: boolean
    act_time_end: boolean
}

export interface StudentUser {
    std_id: string
    firstname: string
    lastname: string
    classroom: string
    number: number
    email: string
    img_path: string
    school: string
    flag: string
}

export interface TeacherUser {
    firstname: string
    lastname: string
    img_path: string
    email: string
    school: string
    flag: string
}