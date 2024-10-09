<template>
  <div class="flex min-h-screen md:px-20">
    <div class="hidden lg:flex lg:w-1/2 items-center justify-start p-8">
      <div class="text-white text-left">
        <h1 class="text-6xl text-red-500 font-thin font-bold mb-2">MOVIEHUB</h1>
        <h2 class="text-2xl font-semibold mb-4">Your Gateway to the Best Movies</h2>
        <p class="mb-4 max-w-sm">
          Welcome to MOVIEHUB! Discover, watch, and enjoy an extensive collection of movies online. 
          Join us today to start your cinematic journey!
        </p>
      </div>
    </div>
    
    <div class="flex items-center justify-center w-full lg:w-1/2 bg-black p-8">
      <div class="w-full max-w-xs">
        <span class="flex">
          <h2 class="text-4xl mb-6 text-gray-500">Login</h2>
          &nbsp;
          <h2 class="text-4xl mb-6 text-green-500">Now</h2>
        </span>
        
        <form @submit.prevent="login">
          <div class="relative mb-4">
            <input
              v-model="email"
              type="email"
              placeholder="Email *"
              required
              class="bg-black border border-gray-600 p-4 rounded-full w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <p v-if="emailError" class="text-red-400 text-sm mt-1">{{ emailError }}</p>
          </div>
          
          <div class="relative mb-6">
            <input
              v-model="password"
              type="password"
              placeholder="Password *"
              required
              class="bg-black border border-gray-600 p-4 rounded-full w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <button
            type="submit"
            :disabled="!isEmailValid || !password"
            class="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold p-3 px-6 rounded-full w-auto hover:from-red-600 hover:to-orange-600 transition duration-200"
          >
            Login
          </button>
        </form>
        
        <p v-if="message" class="text-red-400 text-center mt-4">{{ message }}</p>
        <router-link to="/signup" class="text-blue-400 hover:underline text-center block mt-4">
          Don't have an account? Signup here.
        </router-link>
      </div>
    </div>

    <Toaster 
      :message="toasterMessage" 
      :type="toasterType" 
      :isVisible="toasterVisible" 
    />
  </div>
</template>

<script>
import Toaster from '../components/Toaster.vue';
import { loginUser } from '../utils/api';

export default {
  components: {
    Toaster,
  },
  data() {
    return {
      email: '',
      password: '',
      message: '',
      toasterVisible: false,
      toasterMessage: '',
      toasterType: 'success',
    };
  },
  computed: {
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    emailError() {
      return this.email && !this.isEmailValid ? 'Invalid email format.' : '';
    },
  },
  methods: {
    async login() {
      try {
        const response = await loginUser(this.email, this.password);
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('user', JSON.stringify(response.user));
        
        this.toasterMessage = 'Login successful!';
        this.toasterType = 'success';
        this.toasterVisible = true;

        setTimeout(() => {
          this.toasterVisible = false;
        }, 3000);
        
        this.$router.push('/');
      } catch (error) {
        this.message = error.response?.data.message || 'Login failed. Please try again.';
      }
    },
  },
};
</script>

<style scoped>
</style>
