import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Job } from '@/lib/types';

const jobsCollection = collection(db, 'jobs');

export const addJob = async (job: Omit<Job, 'id'>): Promise<Job> => {
  const docRef = await addDoc(jobsCollection, job);
  return { id: docRef.id, ...job };
};

export const getJobs = async (): Promise<Job[]> => {
  const snapshot = await getDocs(jobsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
};

export const updateJob = async (id: string, job: Partial<Job>): Promise<void> => {
  const jobDoc = doc(db, 'jobs', id);
  await updateDoc(jobDoc, job);
};

export const deleteJob = async (id: string): Promise<void> => {
  const jobDoc = doc(db, 'jobs', id);
  await deleteDoc(jobDoc);
};
