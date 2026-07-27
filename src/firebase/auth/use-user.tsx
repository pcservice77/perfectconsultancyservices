
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth, useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export interface ExtendedUser extends User {
  isAdmin?: boolean;
}

export function useUser() {
  const auth = useAuth();
  const db = useFirestore();
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const unsubscribeProfile = onSnapshot(
          userRef,
          (snapshot) => {
            const profileData = snapshot.data();
            setUser({
              ...firebaseUser,
              isAdmin: profileData?.isAdmin || false,
            });
            setLoading(false);
          },
          (err) => {
            // Handle permission errors gracefully, especially during new registration
            if (err.code === 'permission-denied') {
              // We don't always emit here because it's common for a profile to not exist yet
              // or for rules to take a second to propagate after auth.
              console.log('Profile permission restricted or missing document.');
            }
            
            // Still treat the user as logged in, just without admin privileges
            setUser({
              ...firebaseUser,
              isAdmin: false,
            });
            setLoading(false);
          }
        );
        return () => unsubscribeProfile();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, [auth, db]);

  return { user, loading };
}
