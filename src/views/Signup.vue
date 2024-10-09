<template>
  <div class="flex min-h-screen md:px-20">
    <div class="hidden lg:flex lg:w-1/2 items-center justify-start p-8">
      <div class="text-white text-left">
        <h1 class="text-6xl text-red-500 font-thin font-bold mb-2">MOVIEHUB</h1>
        <h2 class="text-2xl font-semibold mb-4">Your Gateway to the Best Movies</h2>
        <p class="mb-4 max-w-sm">
          Join MOVIEHUB today! Create an account to explore and enjoy a vast collection of movies online.
        </p>
      </div>
    </div>
    <div class="flex items-center justify-center w-full lg:w-1/2 bg-black p-8">
      <div class="w-full max-w-xs">
        <span class="flex">
          <h2 class="text-4xl mb-6 text-gray-500">Signup</h2> &nbsp;
          <h2 class="text-4xl mb-6 text-green-500"> Now</h2>
        </span>
        <form @submit.prevent="validateAndSignup">
          <input
            v-model="name"
            placeholder="Full Name *"
            required
            class="bg-black border border-gray-600 p-4 rounded-full w-full mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            v-model="email"
            type="email"
            placeholder="Email Address *"
            required
            class="bg-black border border-gray-600 p-4 rounded-full w-full mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Create Password *"
            required
            class="bg-black border border-gray-600 p-4 rounded-full w-full mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            v-model="phone"
            placeholder="Phone Number (Optional)"
            class="bg-black border border-gray-600 p-4 rounded-full w-full mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            v-model="profession"
            class="bg-black border border-gray-600 p-4 rounded-full w-full mb-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option disabled value="">Select Your profession *</option>
            <option>Viewer</option>
            <option>Critic</option>
            <option>Filmmaker</option>
          </select>
          <button
            type="submit"
            class="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold p-3 px-6 rounded-full w-auto hover:from-red-600 hover:to-orange-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p v-if="message" class="text-red-400 text-center mt-4">{{ message }}</p>
        <router-link to="/login" class="text-blue-400 hover:underline text-center block mt-4">
          Already have an account? Login here.
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { signupUser } from '../utils/api';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      phone: '',
      profession: '',
      message: '',
    };
  },
  methods: {
    validateAndSignup() {
      if (!this.name || !this.email || !this.password || !this.profession) {
        this.message = 'Please fill in all required fields.';
        return;
      }
      this.signup();
    },
    async signup() {
      try {
        const response = await signupUser(this.name, this.email, this.password, this.phone, this.profession);
        this.message = response.message;
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('user', JSON.stringify(response.user));
        this.$router.push('/');
      } catch (error) {
        this.message = error.response?.data.message || 'Signup failed';
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
