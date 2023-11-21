import { ActData, ValidateAct } from "./type";

const initialActData:ActData = {
    act_id: '',
    act_type: '',
    act_done_time: 0,
    act_data: {
        act_date: '',
        act_head: '',
        act_print: '',
        act_hour: 0,
        act_place: '',
        act_detail: '',
        act_feel: '',
        act_time_start: '',
        act_time_end: ''
    },
    std_ID: '',
    std_firstname: '',
    std_lastname: '',
    std_classroom: '',
    std_number: 0,
    std_email: '',
    tch_firstname: '',
    tch_lastname: '',
    tch_email: '',
    act_create: '',
    act_update: '',
    school: '',
    flag: ''
}

const initialvalidateAct:ValidateAct = {
    act_date: false,
    act_head: false,
    act_print: false,
    act_hour: false,
    act_place: false,
    act_detail: false,
    act_feel: false,
    act_time_start: false,
    act_time_end: false
}

const headerCSV = [
    { label: "เลขที่", key: "std_number" },
    { label: "ชื่อจริง", key: "std_firstname" },
    { label: "นามสกุล", key: "std_lastname" },
    { label: "การบำเพ็ญประโยชน์ต่อสังคม", key: "01" },
    { label: "การบำเพ็ญประโยชน์ต่อโรงเรียน", key: "02" },
    { label: "การอ่านหนังสือ", key: "03" },
    { label: "การเข้าค่ายวิชาการ", key: "04" },
    { label: "การเข้าค่ายปฏิบัติธรรม", key: "05" },
    { label: "การศึกษาดูงานด้านคณิตศาสตร์ วิทยาศาสตร์และเทคโนโลยี", key: "06" },
    { label: "การศึกษาดูงานด้านสังคมศึกษา ภาษา ศาสนา ศิลปวัฒนธรรมและโบราณคดี", key: "07" },
    { label: "การฟังบรรยายด้านวิทยาศาสตร์และเทคโนโลยี", key: "08" },
    { label: "การฟังบรรยายด้านพัฒนาบุคลิกภาพและความฉลาดทางอารมณ์", key: "09" },
    { label: "การฟังบรรยายด้านสังคมศึกษา ภาษา ศาสนา ศิลปวัฒนธรรมและดนตรี", key: "10" },
    { label: "การเข้าร่วมกิจกรรมชุมนุม", key: "11" },
    { label: "การออกกำลังกายและการเล่นกีฬา", key: "12" },
    { label: "การเข้าร่วมกิจกรรมพบพ่อครู/แม่ครู", key: "13" }
];

export { initialvalidateAct, initialActData, headerCSV }