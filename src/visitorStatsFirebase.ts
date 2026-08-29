import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const statsFirebaseConfig = {
  apiKey: process.env.REACT_APP_STATS_FIREBASE_API_KEY || 'AIzaSyAY4kA0AjRRVBQJS2VZnyyvvKQrwbFxHRE',
  authDomain: process.env.REACT_APP_STATS_FIREBASE_AUTH_DOMAIN || 'vuza-group-visit-count.firebaseapp.com',
  projectId: process.env.REACT_APP_STATS_FIREBASE_PROJECT_ID || 'vuza-group-visit-count',
  storageBucket: process.env.REACT_APP_STATS_FIREBASE_STORAGE_BUCKET || 'vuza-group-visit-count.firebasestorage.app',
  messagingSenderId: process.env.REACT_APP_STATS_FIREBASE_MESSAGING_SENDER_ID || '768692535732',
  appId: process.env.REACT_APP_STATS_FIREBASE_APP_ID || '1:768692535732:web:626580a9e3c6bca71db2e1',
};

const statsAppName = 'visitor-stats';
const statsApp: FirebaseApp = getApps().some((app) => app.name === statsAppName)
  ? getApp(statsAppName)
  : initializeApp(statsFirebaseConfig, statsAppName);

export const statsAuth = getAuth(statsApp);
export const statsDb = getFirestore(statsApp);

