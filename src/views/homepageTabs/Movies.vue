<template>
  <div class="container mx-auto mt-20 p-6">
    <div class="mb-4 flex flex-col md:flex-row md:items-center">
      <label for="language" class="text-white font-semibold mr-2">Language:</label>
      <select 
        id="language" 
        v-model="selectedLanguage" 
        @change="fetchMovies" 
        class="bg-gray-800 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0 md:mr-4"
      >
        <option value="kannada">Kannada</option>
        <option value="hindi">Hindi</option>
        <option value="english">English</option>
      </select>

      <label for="genre" class="text-white font-semibold ml-4 mr-2">Genre:</label>
      <select 
        id="genre" 
        v-model="selectedGenre" 
        @change="fetchMovies" 
        class="bg-gray-800 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All</option>
        <option value="action">Action</option>
        <option value="drama">Drama</option>
        <option value="comedy">Comedy</option>
      </select>
    </div>

    <div v-if="isLoading" class="text-white text-lg">Loading movies...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="movie in movies" 
        :key="movie._id" 
        class="relative text-white rounded-lg shadow-lg overflow-hidden flex cursor-pointer"
      >
        <img 
          :src="movie.poster" 
          alt="Movie Poster" 
          class="w-32 md:w-48 h-auto object-cover rounded-l-lg" 
        />
        <div class="ml-4 flex-grow flex flex-col justify-between">
          <div class="flex justify-between items-start">
            <div class="flex-grow">
              <h2 class="text-2xl md:text-3xl py-2">{{ movie.title }}</h2>
              <p class="font-thin text-sm md:text-base"><strong>Director:</strong> {{ movie.director.join(', ') }}</p>
              <p class="font-thin hidden md:block text-sm md:text-base"><strong>Stars:</strong> {{ movie.stars.join(', ') }}</p>
              <p class="font-thin text-sm md:text-base"><strong>Genre:</strong> {{ movie.genre }}</p>
              <p class="font-thin text-sm md:text-base"><strong>Language:</strong> {{ movie.language }}</p>
            </div>
            <div class="flex flex-col items-end">
              <div class="flex items-center">
                <FontAwesomeIcon :icon="['fas', 'thumbs-up']" class="text-green-500" />
                <span class="ml-1">{{ movie.voted.length }}</span>
              </div>
              <div class="flex items-center">
                <FontAwesomeIcon :icon="['fas', 'thumbs-down']" class="text-red-500" />
                <span class="ml-1">{{ movie.voted.length }}</span>
              </div>
            </div>
          </div>
          <p class="font-thin text-sm md:text-base"><strong>Release Date:</strong> {{ new Date(movie.releasedDate * 1000).toLocaleDateString() }}</p>
        </div>
        
        <div class="absolute inset-0 bg-black opacity-0 hover:opacity-90 flex items-center justify-center transition-opacity duration-300">
          <div class="text-white text-xl pr-2">
            Watch Now
        </div>
          <FontAwesomeIcon icon="play" class="text-red-500 text-6xl" />
        </div>
  
      </div>
    </div>

    <p v-if="message" class="text-red-500 mt-4">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faThumbsDown, faPlay } from '@fortawesome/free-solid-svg-icons';

library.add(faThumbsUp, faThumbsDown, faPlay);

const movies = ref([]);
const message = ref('');
const selectedLanguage = ref('kannada');
const selectedGenre = ref('all');
const isLoading = ref(false);

async function fetchMovies() {
  isLoading.value = true;
  message.value = '';
  try {
    const payload = {
      category: "movies",
      language: selectedLanguage.value,
      genre: selectedGenre.value,
      sort: "voting"
    };

    const response = await axios.post('https://hoblist.com/api/movieList', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.result && Array.isArray(response.data.result)) {
      movies.value = response.data.result; 
      if (movies.value.length === 0) {
        message.value = 'No movies found for the given parameters.';
      }
    } else {
      message.value = 'Failed to fetch movies.';
    }
  } catch (error) {
    console.error(error);
    message.value = 'Failed to fetch movies. Please try again.';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchMovies();
});
</script>

<style scoped>
</style>
