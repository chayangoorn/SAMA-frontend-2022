export interface ActData {
    act_id: number
    act_type: string
    act_type_name: string
    std_id: string
    act_date: string
    act_head: string
    act_print: string
    act_hours: number
    act_places: string
    act_details: string
    act_feels: string
    act_time_starts: string
    act_time_ends: string
    std_firstname: string
    std_lastname: string
    std_classroom: string
    std_number: number
    std_dormitory: string
    act_advices: string
    tch_firstname: string
    tch_lastname: string
    act_advices_date: string
    act_created: string
    act_updated: string
    flag: number
}

export interface ValidateAct {
    act_date: boolean
    act_head: boolean
    act_print: boolean
    act_hours: boolean
    act_places: boolean
    act_details: boolean
    act_feels: boolean
    act_time_starts: boolean
    act_time_ends: boolean
}

export interface StudentUser {
    std_id: string
    firstname: string
    lastname: string
    classroom: string
    number: number
    dormitory: "เขียว" | "ม่วง" | "ฟ้า" | "ชมพู" | "เหลือง" | "น้ำตาล"
    email: string
    img_path: string
    flag: number
}

export interface TeacherUser {
    tch_id: string
    firstname: string
    lastname: string
    img_path: string
    email: string
    flag:  number
}