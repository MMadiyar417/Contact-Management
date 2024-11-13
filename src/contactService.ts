import { Contact } from './types';

export async function loadContacts(): Promise<Contact[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data.map((user: any) => ({
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
  }));
}

export function saveContacts(contacts: Contact[]) {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}
