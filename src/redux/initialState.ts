import { ActData, ValidateAct } from "./type";

const initialActData:ActData = {
    act_id: 0,
    act_type: '',
    act_type_name: '',
    std_id: '',
    act_date: '',
    act_head: '',
    act_print: '',
    act_hours: 0,
    act_places: '',
    act_details: '',
    act_feels: '',
    act_time_starts: '',
    act_time_ends: '',
    std_firstname: '',
    std_lastname: '',
    std_classroom: '',
    std_number: 0,
    std_dormitory: '',
    act_advices: '',
    tch_firstname: '',
    tch_lastname: '',
    act_advices_date: '',
    act_created: '',
    act_updated: '',
    flag: 0
}

const initialvalidateAct:ValidateAct = {
    act_date: false,
    act_head: false,
    act_print: false,
    act_hours: false,
    act_places: false,
    act_details: false,
    act_feels: false,
    act_time_starts: false,
    act_time_ends: false
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