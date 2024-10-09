<template>
  <header class="bg-black text-white fixed w-full z-10">
    <nav class="flex justify-between items-center p-4">
      <ul class="flex space-x-6 items-center">
        <li @click="navigateTo('/')"
            :class="['cursor-pointer', currentTab === '/' ? 'text-red-600' : 'text-white']">
          MovieHub
        </li>
        <li @click="navigateTo('/company-info')"
            :class="['cursor-pointer', currentTab === '/company-info' ? 'text-red-600' : 'text-white']">
          Company Info
        </li>
        <li @click="navigateTo('/registered-users')"
            :class="['cursor-pointer', currentTab === '/registered-users' ? 'text-red-600' : 'text-white']">
          Registered Users
        </li>
      </ul>
      <button @click="logout" class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Logout</button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const currentTab = ref(route.path);

watch(route, (newRoute) => {
  currentTab.value = newRoute.path;
});

function navigateTo(tab) {
  router.push(tab);
}

function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  router.push('/login');
}
</script>

<style scoped>
</style>
