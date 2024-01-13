import { IonPage, IonContent, IonRefresher, IonRefresherContent, RefresherEventDetail, useIonViewWillEnter
 } from '@ionic/react'
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

    useEffect(() => {
        dispatch(fetchCheckActivitiesByName([teacher.email, teacher.school]))
    }, [])

    useIonViewWillEnter(() => {
        dispatch(fetchCheckActivitiesByName([teacher.email, teacher.school]))
    }, [])

    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        setTimeout(() => {
          dispatch(fetchCheckActivitiesByName([teacher.email, teacher.school]))
          event.detail.complete();
        }, 1000);
    }

    return (
        <IonPage>
            <IonContent>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent 
                refreshingSpinner="dots"
                ></IonRefresherContent>
            </IonRefresher>
            <div className="bg-pccp-light-blue w-full h-44">
          <div className="mx-auto container py-5 px-8">
            <div className="font-bold text-4xl mt-5">กิจกรรมที่ต้องตรวจ</div>
            <div className="font-bold text-lg mb-10">Activities for check</div>
            <div className="mt-3">
                {data?.data.map((value, index) => {
                    return <ListBackground key={index} act={value.act_type} teacher={true} data={value} check={true}></ListBackground>
                })} 
            </div>
          </div>
        </div>
        {data.data.length ? "" : <div className='text-center text-xl mt-10'>ไม่มีกิจกรรมที่ต้องตรวจ</div>}
            </IonContent>
        </IonPage>
    )
}

export default CheckPage