
<template>
  <div class="about">
    <h1 v-if="isAuthenticated">Customer Home</h1>
    <p v-if="isAuthenticated">
      Welcome to Shangqian Du's A2 Customer Home page.
    </p>
    <h1 v-else>Access Denied</h1>
    <p v-else>You must be logged in to view this page.</p>
    <button v-else @click="goToLogin">Login</button>
  <button v-if="isAuthenticated" @click="goToActivityOne" class="btn btn-primary">Activity1</button>
  <button v-if="isAuthenticated" @click="logout" class="btn btn-danger">Logout</button>
  </div>
</template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');
  const router = useRouter();
  
  const goToLogin = () => {
    router.push('/login');
  };

  const logout = () => {
  isAuthenticated.value = false;
  localStorage.removeItem('isAuthenticated');
  router.push('/login');
  alert('You have been logged out.');
};
  //activity1
  const goToActivityOne = () => {
  router.push('/activityone');
};
  </script>
  
  <style>
  .about {
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
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1em;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }

  .btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>
