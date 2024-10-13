<template>
    <div class="activity-one-view">
      <h1>Activity One</h1>
      <p>Welcome to Activity One page.</p>
      <JSONLab />
      <Rating />
    </div>
  </template>
  
  <script setup>
  import Rating from '@/components/Rating.vue';
  import JSONLab from '@/components/JSONLab.vue';
  </script>
  
  <style scoped>
  .activity-one-view {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h1 {
    font-family: 'Arial', sans-serif;
    color: #333;
    margin-bottom: 20px;
  }
  
  p {
    font-family: 'Georgia', serif;
    font-size: 1.1em;
    color: #666;
    line-height: 1.6;
  }
  </style>