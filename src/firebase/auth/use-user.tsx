
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuth, useFirestore } from '../provider';

export interface ExtendedUser extends User {
  isAdmin?: boolean;
}

export function useUser() {
  const auth = useAuth();
  const db = useFirestore();
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Fetch custom profile data (isAdmin)
        const userRef = doc(db, 'users', firebaseUser.uid);
        const unsubscribeProfile = onSnapshot(userRef, (snapshot) => {
          const profileData = snapshot.data();
          setUser({
            ...firebaseUser,
            isAdmin: profileData?.isAdmin || false,
          });
          setLoading(false);
        });
        return () => unsubscribeProfile();
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, [auth, db]);

  return { user, loading };
}
