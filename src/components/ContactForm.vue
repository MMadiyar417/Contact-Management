<template>
    <form @submit.prevent="submitForm">
      <input v-model="contact.name" type="text" placeholder="Имя" required />
      <input v-model="contact.phone" type="text" placeholder="Телефон" required />
      <input v-model="contact.email" type="email" placeholder="Email" required />
      <button type="submit">{{ contact.id ? 'Обновить' : 'Добавить' }} контакт</button>
    </form>
  </template>
  
  <script lang="ts">
  import { Contact } from '@/types';
import { defineComponent, ref, watch, PropType } from 'vue';
  
  export default defineComponent({
    props: {
      contactToEdit: Object as PropType<Contact | null>,
    },
    emits: ['saveContact'],
    setup(props, { emit }) {
      const contact = ref<Contact>({ id: null, name: '', phone: '', email: '' });
  
      watch(
        () => props.contactToEdit,
        (newVal) => {
          if (newVal) contact.value = { ...newVal };
        }
      );
  
      const submitForm = () => {
        emit('saveContact', { ...contact.value });
        contact.value = { id: null, name: '', phone: '', email: '' };
      };
  
      return { contact, submitForm };
    },
  });
  </script>
  
  <style>

form {
  display: flex;
  flex-direction: column;
}

input, button {
  margin-bottom: 10px;
  padding: 8px;
}

button {
  background-color: #4CAF50; 
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #66BB6A;
}

.contact-form {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: scale(0.8);
  opacity: 0;
}

.contact-form-enter-active {
  transform: scale(1);
  opacity: 1;
}

  </style>
  