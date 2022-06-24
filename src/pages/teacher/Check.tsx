import { IonPage, IonContent } from '@ionic/react'
import ListBackground from '../../components/ListBackground'
import { RootState, AppDispatch } from '../../redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCheckActivitiesByName } from '../../redux/features/activityCheckSlice'
import React, { useEffect, useState } from 'react'
import { TeacherUser } from '../../redux/type'

const CheckPage: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>()
    const data = useSelector((state: RootState) => state.checkAct)
    const userData = useSelector((state: RootState) => state.userData.user)
    const teacher = userData as TeacherUser
    const [refresh,setRefresh] = useState(false)

    useEffect(() => {
        dispatch(fetchCheckActivitiesByName([teacher.firstname, teacher.lastname]))
    }, [])

    const onRefresh = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        dispatch(fetchCheckActivitiesByName([teacher.firstname, teacher.lastname]))
        setRefresh(false)
    }

    return (
        <IonPage>
            <IonContent>
            <div className="bg-pccp-light-blue w-full h-44">
          <div className="mx-auto container py-5 px-8">
            <div className="font-bold text-4xl mt-5">กิจกรรมที่ต้องตรวจ</div>
            <div className="font-bold text-lg mb-10">Activities for check</div>
            <div className="mt-3">
                {data?.data.map((value, index) => {
                    return <ListBackground key={index} act={value.act_type} teacher={true} data={value} refresh={onRefresh}></ListBackground>
                })}
                
            </div>
          </div>
        </div>
            </IonContent>
        </IonPage>
    )
}

export default CheckPage