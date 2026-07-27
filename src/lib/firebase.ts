
// This file is now a proxy to the centralized Firebase initialization
import { initializeFirebase } from '@/firebase';

const { app, db, auth } = initializeFirebase();

export { app, db, auth };
