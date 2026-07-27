
'use client';

import * as React from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  // Use a ref to ensure initializeFirebase is only called once on the client
  // and we don't rely on hooks that might fail during early hydration if React isn't ready.
  const firebaseRef = React.useRef<{ app: any, db: any, auth: any } | null>(null);

  if (!firebaseRef.current) {
    firebaseRef.current = initializeFirebase();
  }

  return (
    <FirebaseProvider 
      app={firebaseRef.current.app} 
      db={firebaseRef.current.db} 
      auth={firebaseRef.current.auth}
    >
      {children}
    </FirebaseProvider>
  );
}
