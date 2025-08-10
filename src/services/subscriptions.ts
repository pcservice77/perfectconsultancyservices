import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { Subscription } from '@/lib/types';

const subscriptionsCollection = collection(db, 'subscriptions');

export const addSubscription = async (subscription: Omit<Subscription, 'id' | 'subscribedAt'>): Promise<Subscription> => {
  const newSubscription = { ...subscription, subscribedAt: new Date() };
  const docRef = await addDoc(subscriptionsCollection, {
      ...subscription,
      subscribedAt: serverTimestamp()
  });
  return { id: docRef.id, ...newSubscription };
};
