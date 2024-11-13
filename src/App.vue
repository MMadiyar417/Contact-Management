<template>
  <div class="app-container">
    <h1>Управление контактами  на Vue 3</h1>
    <SearchBar @search="filterContacts" />
    <ContactForm :contactToEdit="contactToEdit" @saveContact="saveContact" />
    <ContactList :contacts="filteredContacts" @deleteContact="deleteContact" @editContact="editContact" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import ContactList from './components/ContactList.vue';
import ContactForm from './components/ContactForm.vue';
import SearchBar from './components/SearchBar.vue';
import { Contact } from '@/types';
import { loadContacts, saveContacts } from '@/contactService';

export default defineComponent({
  components: { ContactList, ContactForm, SearchBar },
  setup() {
    const contacts = ref<Contact[]>([]);
    const filteredContacts = ref<Contact[]>([]);
    const contactToEdit = ref<Contact | null>(null);

    const loadContactsData = async () => {
      const savedContacts = localStorage.getItem('contacts');
      if (savedContacts) {
        contacts.value = JSON.parse(savedContacts);
      } else {
        const apiContacts = await loadContacts();
        contacts.value = apiContacts;
        saveContacts(apiContacts); 
      }
      filteredContacts.value = contacts.value;
    };

    onMounted(loadContactsData);

    watch(contacts, (newContacts) => {
      localStorage.setItem('contacts', JSON.stringify(newContacts));
    }, { deep: true });

    const saveContact = (contact: Contact) => {
      if (contact.id) {
        const index = contacts.value.findIndex(c => c.id === contact.id);
        contacts.value[index] = contact;
      } else {
        contact.id = Date.now();
        contacts.value.push(contact);
      }
      saveContacts(contacts.value); 
      loadContactsData();  
      contactToEdit.value = null;
    };

    const deleteContact = (contactId: number) => {
      contacts.value = contacts.value.filter(contact => contact.id !== contactId);
      saveContacts(contacts.value); 
      loadContactsData();  
    };

    const editContact = (contact: Contact) => {
      contactToEdit.value = { ...contact };
    };

    const filterContacts = (query: string) => {
      filteredContacts.value = contacts.value.filter(contact => contact.name.toLowerCase().includes(query.toLowerCase()));
    };

    return { filteredContacts, saveContact, deleteContact, editContact, filterContacts, contactToEdit };
  },
});
</script>



<style>
.app-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
