
export interface Service {
  id?: string;
  icon: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface StaffMember {
    id?: string;
    name: string;
    role: 'Founder' | 'Co-Founder' | 'Staff';
    email: string;
    contact?: string;
    profession: string;
    imageUrl?: string;
}

export interface Job {
    id?: string;
    title: string;
    location: string;
    type: string;
    salary: string;
    requirements?: string;
    qualifications?: string;
}

export interface JobApplication {
    id?: string;
    jobId: string;
    jobTitle: string;
    name: string;
    mobile: string;
    email: string;
    qualification: string;
    experience: string;
    address: string;
    resumeUrl?: string;
    otherInfo?: string;
    appliedAt: any;
}

export interface TaxUpdate {
    id?: string;
    title: string;
    summary: string;
    content: string;
    date: string;
    tags: string[];
}

export interface Contact {
    id?: string;
    name: string;
    email: string;
    mobile?: string;
    serviceTitle?: string;
    message: string;
    createdAt: any;
}

export interface Subscription {
    id?: string;
    email: string;
    subscribedAt: any;
}
