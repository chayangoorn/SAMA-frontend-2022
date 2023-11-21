import {
  IonIcon,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import { useEffect, useState } from "react";
import MenuPage from "../../pages/teacher/Menu";
import CheckPage from "../../pages/teacher/Check";
import ProfilePage from "../../pages/Profile";
import SearchPage from "../../pages/teacher/Search";
import SamadetailPage from "../../pages/Samadetail";

import SearchSvg from "../assets/search.svg";
import DocumentsSvg from "../assets/documents.svg";
import PersonSvg from "../assets/person.svg";
import "./tabs.css";

import {
  search,
  documents,
  person,
} from "ionicons/icons";
import "./tabs.css";
import ResultPage from "../../pages/teacher/Result";
import DetailPage from "../../pages/teacher/Detail";

const TeacherTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("/check");

  const tabs = [
    {
      label: "Activities",
      url: "/activities",
      icon: [search, SearchSvg],
      component: MenuPage,
    },
    {
      label: "Check",
      url: "/check",
      icon: [documents, DocumentsSvg],
      component: CheckPage,
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
        <Route path="/search" component={SearchPage} exact/>
        <Route path="/search/:id" component={ResultPage} exact/>
        <Route path="/search/result/:school/:form/:id" component={DetailPage} exact/>
        <Route path="/sama" component={SamadetailPage}/>
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
        <Route path="/" render={() => <Redirect to="/check" />} exact />
      </IonRouterOutlet>
      <IonTabBar
        slot="bottom"
        onIonTabsDidChange={(e) => setActiveTab(e.detail.tab)}
        className="bg"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === `${tab.url}`;
            return (
              <IonTabButton key={index} tab={`${tab.url}`} href={tab.url} style={{'--background': '#FFF'}}>
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
        })}
      </IonTabBar>
    </IonTabs>
  );
};

export default TeacherTabs;
