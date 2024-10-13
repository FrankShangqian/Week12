<template>
    <div class="star-rating">
      <h2>Rate this activity</h2>
      <div class="stars">
        <span
          v-for="star in 5"
          :key="star"
          class="star"
          :class="{ filled: star <= currentRating }"
          @click="setRating(star)"
        >
          ★
        </span>
      </div>
      <div class="feedback">
        <span v-if="submitted">Thank you for rating!</span>
        <span v-else>Current Rating: {{ currentRating }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // initialize
  const currentRating = ref(0);
  const ratings = ref([]);
  const submitted = ref(false);
  
  
  // set
  const setRating = (rating) => {
    currentRating.value = rating;
    ratings.value.push(rating);
    submitted.value = true;
  
    // feedback
    setTimeout(() => {
      submitted.value = false;
    }, 2000);
  };
  </script>
  
  <style scoped>
  .star-rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
  }
  
  .stars {
    display: inline-block;
    margin-bottom: 10px;
  }
  
  .star {
    font-size: 2rem;
    color: #ddd;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  .star.filled {
    color: #f5a623;
  }
  
  .feedback {
    margin-top: 10px;
    font-size: 1.2rem;
    color: #333;
  }
  
  .average-rating {
    margin-top: 20px;
    text-align: center;
  }
  
  .average-rating h3 {
    margin: 0;
  }
  
  .average-rating p {
    margin: 0;
    font-size: 0.9rem;
    color: #777;
  }
  </style>