
import { Firestore, collection, addDoc, getDocs, query, limit } from 'firebase/firestore';

export async function seedDatabase(db: Firestore) {
  // Check if already seeded to avoid duplicates (optional, but safer)
  const servicesSnapshot = await getDocs(query(collection(db, 'services'), limit(1)));
  if (!servicesSnapshot.empty) return;

  const services = [
    { title: 'GST Filing', description: 'Expert assistance with GST registration and periodic filing.', icon: 'FileText' },
    { title: 'Income Tax', description: 'Comprehensive tax planning and return filing for individuals and businesses.', icon: 'Landmark' },
    { title: 'Audit Services', description: 'Thorough financial auditing to ensure compliance and transparency.', icon: 'ClipboardCheck' }
  ];

  const staff = [
    { name: 'John Doe', role: 'Founder', email: 'john@pcs.com', profession: 'Chartered Accountant', contact: '9876543210' },
    { name: 'Jane Smith', role: 'Co-Founder', email: 'jane@pcs.com', profession: 'Tax Consultant', contact: '9876543211' }
  ];

  const jobs = [
    { title: 'Senior Accountant', location: 'Mumbai', type: 'Full-time', salary: '₹6,00,000 - ₹8,00,000' },
    { title: 'Junior Auditor', location: 'Delhi', type: 'Full-time', salary: '₹3,00,000 - ₹4,50,000' }
  ];

  for (const item of services) await addDoc(collection(db, 'services'), item);
  for (const item of staff) await addDoc(collection(db, 'staff'), item);
  for (const item of jobs) await addDoc(collection(db, 'jobs'), item);
}
