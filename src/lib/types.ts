export interface Service {
  id?: string;
  icon: string;
  title: string;
  description: string;
}

export interface Job {
    id?: string;
    title: string;
    location: string;
    type: string;
    salary: string;
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
    message: string;
    createdAt: Date;
}

export interface Subscription {
    id?: string;
    email: string;
    subscribedAt: Date;
}
