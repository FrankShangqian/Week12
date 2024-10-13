<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">Login</h1>
      <form @submit.prevent="login" class="login-form">
        <div class="input-group">
          <label for="username" class="input-label">Username:</label>
          <input type="text" v-model="username" id="username" class="input-field" required />
        </div>
        <div class="input-group">
          <label for="password" class="input-label">Password:</label>
          <input type="password" v-model="password" id="password" class="input-field" required />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
  const storedCards = JSON.parse(localStorage.getItem('submittedCards') || '[]');
  const user = storedCards.find(
    (card) => card.username === username.value && card.password === password.value
  );
  if (user) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', user.isAdmin ? 'admin' : 'customer');//two role
    if (user.isAdmin) {
      router.push('/adminhomeview');  // admin login
    } else {
      router.push('/about');  // customer login
    }
  } else {
    alert('Invalid username or password');
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-box {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-label {
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}

.login-button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>