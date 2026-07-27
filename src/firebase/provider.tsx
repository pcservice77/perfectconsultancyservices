
'use client';

import React, { createContext, useContext } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';

interface FirebaseContextType {
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export function FirebaseProvider({
  children,
  app,
  db,
  auth,
}: {
  children: React.ReactNode;
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
}) {
  return (
    <FirebaseContext.Provider value={{ app, db, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    // Fallback if hook is called outside provider - try to initialize directly
    // but warning: this might lead to inconsistent state if not careful.
    // In this app, we ensure it's wrapped in RootLayout.
    throw new Error('useFirebase must be used within FirebaseProvider');
  }
  return context;
}

export const useFirebaseApp = () => useFirebase().app;
export const useFirestore = () => useFirebase().db;
export const useAuth = () => useFirebase().auth;
