<template>
  <div v-if="isVisible" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-lg font-semibold text-white">Confirm Edit</h2>
      <p class="text-gray-300 mt-2">Are you sure you want to save the changes?</p>
      <div class="flex justify-between mt-4">
        <button
          type="button"
          @click="cancel"
        class="bg-gray-600 hover:bg-gray-500 text-white py-1 px-3 rounded transition duration-200"
        >
        Cancel
      </button>
      <button
        type="button"
          @click="confirm"
      class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition duration-200"
        >
      Confirm
    </button>
  </div>
</div>
  </div >
</template >

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  onClose: {
    type: Function,
    required: true,
  },
  onConfirm: {
    type: Function,
    required: true,
  },
});

const cancel = () => {
  props.onClose();
};

const confirm = () => {
  props.onConfirm();
  props.onClose();
};
</script>

<style scoped>
</style>
