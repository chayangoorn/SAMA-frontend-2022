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
import SearchPage from "../../pages/teacher/Search";
import CheckPage from "../../pages/teacher/Check";
import ProfilePage from "../../pages/Profile";

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

const TeacherTabs: React.FC = () => {
  const path = window.location.pathname;
  const [activeTab, setActiveTab] = useState(path);

  const tabs = [
    {
      label: "Search",
      url: "/search",
      icon: [search, SearchSvg],
      component: SearchPage,
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
        <Route path="/" render={() => <Redirect to="/profile" />} exact />
      </IonRouterOutlet>
      <IonTabBar
        slot="bottom"
        onIonTabsDidChange={(e) => setActiveTab(e.detail.tab)}
        className="bg"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === `${tab.url}`;
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
        })}
      </IonTabBar>
    </IonTabs>
  );
};

export default TeacherTabs;
