<template>
  <div v-if="isVisible" class="fixed top-5 right-5 z-50">
    <div 
      class="bg-green-500 text-white p-3 rounded-md mb-2 transition duration-300" 
      v-if="type === 'success'"
    >
      {{ message }}
    </div>
    <div 
      class="bg-red-500 text-white p-3 rounded-md mb-2 transition duration-300" 
      v-if="type === 'error'"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: 'success',
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
});

const visible = ref(props.isVisible);

watch(() => props.isVisible, (newVal) => {
  visible.value = newVal;
});
</script>

<style scoped>
</style>
