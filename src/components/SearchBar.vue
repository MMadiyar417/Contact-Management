<template>
<input type="text" placeholder="Поиск по имени" @input="onInput" />
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['search'],
  setup(_, { emit }) {
    const onInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target) {
        emit('search', target.value);
      }
    };

    return { onInput };
  },
});
</script>
  
  <style>
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
  }
  </style>
  