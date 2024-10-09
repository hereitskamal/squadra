<template>
  <div v-if="user" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-lg font-semibold text-white">Edit User</h2>
      <form @submit.prevent="openConfirmEdit" class="mt-4">
        <div class="mb-4">
          <label class="block text-gray-300">Name</label>
          <input
            v-model="user.name"
            type="text"
            class="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-300">Email</label>
          <input
            v-model="user.email"
            type="email"
            class="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-300">Phone</label>
          <input
            v-model="user.phone"
            type="text"
            class="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="flex justify-between mt-4">
          <button
            type="button"
            @click="close"
            class="bg-gray-600 hover:bg-gray-500 text-white py-1 px-3 rounded transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition duration-200"
          >
            Save
          </button>
        </div>
      </form>
    </div>

    <ConfirmationModal 
      v-if="showConfirmEdit" 
      :isVisible="showConfirmEdit" 
      :onClose="closeConfirmEdit" 
      :onConfirm="handleUpdateUser" 
    />
    
    <Toaster 
      :message="toasterMessage" 
      :type="toasterType" 
      :isVisible="toasterVisible" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { updateUser } from '../utils/api';
import ConfirmationModal from '../components/ConfirmationModal.vue';
import Toaster from './Toaster.vue';

const props = defineProps({
  user: Object,
  onClose: {
    type: Function,
    required: true,
  },
});
const emit = defineEmits(['userUpdated']);

const showConfirmEdit = ref(false);
const toasterVisible = ref(false);
const toasterMessage = ref('');
const toasterType = ref('success');

const close = () => {
  props.onClose();
};

const openConfirmEdit = () => {
  showConfirmEdit.value = true;
};

const closeConfirmEdit = () => {
  showConfirmEdit.value = false;
};

const handleUpdateUser = async () => {
  try {
    await updateUser(props.user);
    emit('userUpdated');
    toasterMessage.value = 'User updated successfully!';
    toasterType.value = 'success';
  } catch (error) {
    console.error('Failed to update user:', error);
    toasterMessage.value = 'Failed to update user. Please try again.';
    toasterType.value = 'error';
  } finally {
    toasterVisible.value = true;
    closeConfirmEdit();
  }
};
</script>

<style scoped>
</style>
