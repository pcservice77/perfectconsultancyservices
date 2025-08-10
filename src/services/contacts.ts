import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { Contact } from '@/lib/types';

const contactsCollection = collection(db, 'contacts');

export const addContactMessage = async (message: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact> => {
  const newMessage = { ...message, createdAt: new Date() };
  const docRef = await addDoc(contactsCollection, {
      ...message,
      createdAt: serverTimestamp()
  });
  return { id: docRef.id, ...newMessage };
};
