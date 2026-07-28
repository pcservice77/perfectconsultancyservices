
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

/**
 * TRIGGER RULES DEPLOYMENT (v3):
 * 1. Public (unauthenticated) CREATE for: /enquiries, /subscriptions, /applications.
 * 2. Authenticated user CREATE/READ/WRITE for: /users/{userId} (where userId matches auth.uid).
 * 3. Public (unauthenticated) READ for: /services, /staff, /jobs, /taxUpdates.
 * 4. Admin (isAdmin == true) full access (READ/WRITE/DELETE) to ALL collections.
 * 
 * Update log: Explicitly verified public CREATE permissions for application submissions.
 */

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

export function initializeFirebase() {
  if (typeof window !== 'undefined') {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  } else {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  }

  return { app, db, auth };
}

export * from './provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
