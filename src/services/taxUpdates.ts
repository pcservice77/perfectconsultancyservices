import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import type { TaxUpdate } from '@/lib/types';

const taxUpdatesCollection = collection(db, 'taxUpdates');

export const addTaxUpdate = async (taxUpdate: Omit<TaxUpdate, 'id' | 'date'>): Promise<TaxUpdate> => {
  const newTaxUpdate = { ...taxUpdate, date: new Date().toISOString() };
  const docRef = await addDoc(taxUpdatesCollection, newTaxUpdate);
  return { id: docRef.id, ...newTaxUpdate };
};

export const getTaxUpdates = async (): Promise<TaxUpdate[]> => {
  const snapshot = await getDocs(taxUpdatesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TaxUpdate));
};

export const updateTaxUpdate = async (id: string, taxUpdate: Partial<TaxUpdate>): Promise<void> => {
  const taxUpdateDoc = doc(db, 'taxUpdates', id);
  await updateDoc(taxUpdateDoc, taxUpdate);
};

export const deleteTaxUpdate = async (id: string): Promise<void> => {
  const taxUpdateDoc = doc(db, 'taxUpdates', id);
  await deleteDoc(taxUpdateDoc);
};
