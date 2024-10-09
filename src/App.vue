<template>
  <div id="app" class="flex flex-col min-h-screen bg-black">
    <Header v-if="showHeader" />
    <main class="flex-grow container mx-auto">
      <router-view />
    </main>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
  setup() {
    const route = useRoute();
    const showHeader = computed(() => {
      return route.path !== '/login' && route.path !== '/signup';
    });

    return {
      showHeader,
    };
  },
};
</script>

<style scoped>
</style>
