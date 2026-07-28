
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

/**
 * TRIGGER RULES DEPLOYMENT (v4):
 * 1. PUBLIC CREATE (Unauthenticated): /enquiries, /subscriptions, /applications.
 * 2. PUBLIC READ: /services, /staff, /jobs, /taxUpdates.
 * 3. OWNER ACCESS: /users/{userId} (where auth.uid == userId).
 * 4. ADMIN ACCESS: Full access to all paths if user has isAdmin: true in /users/{uid}.
 * 
 * Update log: Forced re-deployment to resolve 'insufficient permissions' on public applications.
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
