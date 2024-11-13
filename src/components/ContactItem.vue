<template>
    <div class="contact-item">
      <div>{{ contact.name }} - {{ contact.phone }} - {{ contact.email }}</div>
      <button @click="$emit('editContact', contact)">Редактировать</button>
      <button @click="$emit('deleteContact', contact.id)">Удалить</button>
    </div>
  </template>
  
  <script lang="ts">
  import { Contact } from '@/types';
import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    props: {
      contact: {
        type: Object as PropType<Contact>,
        required: true,
      },
    },
  });
  </script>
  
  <style>
.contact-item {
  background-color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 10px;
  transition: transform 0.2s ease;
}

.contact-item:hover {
  transform: translateY(-4px); 
}

.contact-item button {
  background-color: #388E3C;
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.contact-item button:hover {
  background-color: #66BB6A; 
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
  </style>
  