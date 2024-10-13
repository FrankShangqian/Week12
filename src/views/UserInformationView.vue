
<template>
    <div class="user-info-container">
      <h1>User Information</h1>
      <p>Below is a table displaying the submitted user data. This information is securely stored and can be reviewed or updated as necessary.</p>
  
      <DataTable v-if="isAuthenticated" :value="submittedCards" tableStyle="min-width: 50rem">
        <Column field="username" header="Username"></Column>
        <Column field="password" header="Password"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="isAdmin" header="Admin or not"></Column>
        <Column field="gender" header="Gender"></Column>
        <Column field="reason" header="Reason"></Column>
      </DataTable>

      <button v-if="isAuthenticated" @click="BackToHome" class="btn btn-primary" >Back to admin home page</button>
      <p v-else class="auth-warning">You must be logged in to view the user information.</p>
    </div>
  </template>

<script setup>
import { ref,onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useRouter } from 'vue-router';
const router = useRouter();

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');//check login
const submittedCards = ref([]); //save user data
  
//read user data from localstorage
onMounted(() => {
    if (isAuthenticated.value) {
    const storedData = localStorage.getItem('submittedCards');
    if (storedData) {
        submittedCards.value = JSON.parse(storedData);
    }
    }
});

const BackToHome = () => {
  router.push('/AdminHomeView');
};
    
</script>

<style scoped>

</style>