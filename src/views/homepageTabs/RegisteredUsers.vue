<template>
  <div class="container mx-auto mt-20 p-6">
    <table v-if="users.length" class="min-w-full bg-white rounded-lg shadow-lg">
      <thead>
        <tr class="bg-gray-700 text-white border-b">
          <th class="py-3 px-4 text-left font-semibold">Name</th>
          <th class="hidden md:table-cell py-3 px-4 text-left font-semibold">Email</th>
          <th class="hidden md:table-cell py-3 px-4 text-left font-semibold">Phone</th>
          <th class="py-3 px-4 text-left font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id" class="bg-black hover:bg-gray-800 transition duration-200">
          <td class="py-2 px-4 text-white">{{ user.name }}</td>
          <td class="hidden md:table-cell py-2 px-4 text-white">{{ user.email }}</td>
          <td class="hidden md:table-cell py-2 px-4 text-white">{{ user.phone }}</td>
          <td class="py-2 px-4">
            <button @click="openEditUser(user)" class="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded transition duration-200">Edit</button>
            <button @click="openConfirmDelete(user._id)" class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded ml-2 transition duration-200">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="message" class="text-red-500 mt-4 text-center font-semibold">{{ message }}</p>

    <EditUser 
      v-if="editingUser" 
      :user="editingUser" 
      :onClose="closeEditUser" 
      @userUpdated="fetchUsers"
    />
    
    <ConfirmationModal 
      v-if="showConfirmDelete" 
      :isVisible="showConfirmDelete" 
      :onClose="closeConfirmDelete" 
      :onConfirm="confirmDelete" 
    />

    <Toaster 
      :message="toasterMessage" 
      :type="toasterType" 
      :isVisible="toasterVisible" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchUsers as fetchUsersApi, deleteUser as deleteUserApi } from '../../utils/api'; // Import API functions
import EditUser from '../../components/EditUser.vue';
import ConfirmationModal from '../../components/ConfirmationModal.vue';
import Toaster from '../../components/Toaster.vue';

const users = ref([]);
const message = ref('');
const editingUser = ref(null);
const showConfirmDelete = ref(false);
const userIdToDelete = ref(null);
const toasterVisible = ref(false);
const toasterMessage = ref('');
const toasterType = ref('success');

async function fetchUsers() {
  try {
    users.value = await fetchUsersApi();
  } catch (error) {
    message.value = 'Failed to fetch users. Please try again.';
  }
}

onMounted(() => {
  fetchUsers();
});

function openEditUser(user) {
  editingUser.value = { ...user };
}

function closeEditUser() {
  editingUser.value = null;
}

function openConfirmDelete(userId) {
  userIdToDelete.value = userId;
  showConfirmDelete.value = true;
}

function closeConfirmDelete() {
  showConfirmDelete.value = false;
  userIdToDelete.value = null;
}

async function confirmDelete() {
  try {
    await deleteUserApi(userIdToDelete.value);
    fetchUsers();
    showToaster('User deleted successfully!', 'success');
  } catch (error) {
    message.value = 'Failed to delete user. Please try again.';
    showToaster('Failed to delete user. Please try again.', 'error');
  } finally {
    closeConfirmDelete();
  }
}

function showToaster(message, type) {
  toasterMessage.value = message;
  toasterType.value = type;
  toasterVisible.value = true;

  setTimeout(() => {
    toasterVisible.value = false;
  }, 3000);
}
</script>

<style scoped>
</style>
