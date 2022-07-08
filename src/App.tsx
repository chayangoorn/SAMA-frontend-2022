import { IonApp, setupIonicReact } from "@ionic/react";
import Tabs from "./components/Tabs/tabs";
import { App } from '@capacitor/app'

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import AuthProvider from "./Firebase/AuthProvider";

setupIonicReact();

const AppIonic: React.FC = () => {

  App.addListener('backButton', (ev) => {
    if(['/home', '/manage', '/record', '/achieve', '/profile', '/check', '/activities'].includes(window.location.pathname)) {
      App.exitApp()
    }
  });

  return (
    <IonApp>
      <AuthProvider>
        <Tabs></Tabs>
      </AuthProvider>
    </IonApp>
  );
};

export default AppIonic;
