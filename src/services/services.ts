import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Service } from '@/lib/types';

const servicesCollection = collection(db, 'services');

export const addService = async (service: Omit<Service, 'id'>): Promise<Service> => {
  const docRef = await addDoc(servicesCollection, service);
  return { id: docRef.id, ...service };
};

export const getServices = async (): Promise<Service[]> => {
  const snapshot = await getDocs(servicesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
};

export const updateService = async (id: string, service: Partial<Service>): Promise<void> => {
  const serviceDoc = doc(db, 'services', id);
  await updateDoc(serviceDoc, service);
};

export const deleteService = async (id: string): Promise<void> => {
  const serviceDoc = doc(db, 'services', id);
  await deleteDoc(serviceDoc);
};
