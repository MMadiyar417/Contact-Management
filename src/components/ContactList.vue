<template>
    <transition-group name="list" tag="ul">
  <li v-for="contact in contacts" :key="contact.id ?? 0" class="contact-item">
    <ContactItem :contact="contact" @deleteContact="$emit('deleteContact', contact.id)" @editContact="$emit('editContact', contact)" />
  </li>
</transition-group>


  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import ContactItem from './ContactItem.vue';
import { Contact } from '@/types';
  
  export default defineComponent({
    components: { ContactItem },
    props: {
      contacts: {
        type: Array as PropType<Contact[]>,
        required: true,
      },
    },
  });
  </script>
  
  <style>
  .contact-item {
    margin-bottom: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 0.5s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  </style>
  