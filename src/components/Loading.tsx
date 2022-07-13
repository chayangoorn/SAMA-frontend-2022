import React, { useState } from 'react';
import { IonLoading, IonContent } from '@ionic/react';

const LoadingLogin: React.FC = () => {
  const [showLoading, setShowLoading] = useState(true);

  return (
    <IonContent>
      <IonLoading
        cssClass='my-custom-class'
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}
        duration={3000}
      />
    </IonContent>
  );
};

export default LoadingLogin