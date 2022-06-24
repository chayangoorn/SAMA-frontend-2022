import {
  IonIcon,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import { useState } from "react";
import HomePage from "../../pages/student/Home";
import ManagePage from "../../pages/student/Manage";
import AchievePage from "../../pages/student/Achieve";
import ProfilePage from "../../pages/Profile";
import RecordPage from "../../pages/student/Record";
import FormPage from "../../pages/student/Form";
import SignupPage from "../../pages/student/Signup";
import ActivitiesPage from "../../pages/student/Activities";
import SelectTeacherPage from "../../pages/student/SelectTeacher";

import HomeSvg from "../assets/home.svg";
import DocumentTextSvg from "../assets/document-text.svg";
import BookmarksSvg from "../assets/bookmarks.svg";
import PersonSvg from "../assets/person.svg";
import AddCircleSvg from "../assets/add-circle-outline.svg";
import "./tabs.css";

import {
    home,
    documentText,
    bookmarks,
    person,
    addCircleOutline,
  } from "ionicons/icons";


const StudentTabs: React.FC = () => {
  const path = window.location.pathname;
  const [activeTab, setActiveTab] = useState(path);

  const tabs = [
    {
      label: "Home",
      url: "/home",
      icon: [home, HomeSvg],
      component: HomePage,
    },
    {
      label: "Manage",
      url: "/manage",
      icon: [documentText, DocumentTextSvg],
      component: ManagePage,
    },
    {
      label: "",
      url: "/record",
      icon: [addCircleOutline, AddCircleSvg],
      component: RecordPage,
    },
    {
      label: "Achieve",
      url: "/achieve",
      icon: [bookmarks, BookmarksSvg],
      component: AchievePage,
    },
    {
      label: "Profile",
      url: "/profile",
      icon: [person, PersonSvg],
      component: ProfilePage,
    },
  ];

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/record/:form" component={FormPage} exact />
        <Route path="/record/send/:id" component={SelectTeacherPage} exact />
        <Route path="/manage/:index" component={ActivitiesPage} exact />
        <Route path="/send/:id" component={SelectTeacherPage} exact />
        <Route path="/manage/edit/:form/:id" component={FormPage} exact />
        <Route path="/signup" component={SignupPage} exact />
        {tabs.map((tab, index) => {
          return (
            <Route
              key={index}
              exact
              path={tab.url}
              component={tab.component}
            ></Route>
          );
        })}
        <Route path="/" render={() => <Redirect to="/home" />} exact />
      </IonRouterOutlet>
      <IonTabBar
        slot="bottom"
        onIonTabsDidChange={(e) => setActiveTab(e.detail.tab)}
        className="bg"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === `${tab.url}`;

          if (index != 2) {
            return (
              <IonTabButton key={index} tab={`${tab.url}`} href={tab.url}>
                {isActive ? (
                  <IonIcon src={tab.icon[1]} />
                ) : (
                  <IonIcon src={tab.icon[0]} />
                )}
                <IonLabel className={isActive ? "active" : ""}>
                  {tab.label}
                </IonLabel>
              </IonTabButton>
            );
          } else {
            return (
              <IonTabButton key={index} tab={`${tab.url}`} href={tab.url}>
                {isActive ? (
                  <IonIcon src={tab.icon[1]} className="ion-icon" />
                ) : (
                  <IonIcon src={tab.icon[0]} className="ion-icon" />
                )}
              </IonTabButton>
            );
          }
        })}
      </IonTabBar>
    </IonTabs>
  );
};

export default StudentTabs;
