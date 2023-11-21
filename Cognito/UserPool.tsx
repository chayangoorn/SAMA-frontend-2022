import { Amplify } from '@aws-amplify/core'

const Auth = Amplify.configure({
  Auth: {
    userPoolId: 'ap-northeast-2_QuhBz57Jg',
    region: 'ap-northeast-2',
    userPoolWebClientId: '2516s1p6jav3ivipjggisqialf'
  }
});

export default Auth
