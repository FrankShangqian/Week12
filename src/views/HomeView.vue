<script setup>
import { ref,  onMounted } from 'vue'
const adminCode = ref('') // Admin code input
const correctAdminCode = 'IAMADMIN' // secure admin code

const formData = ref({
  username: '',
  password: '',
  isAdmin: false,
  adminCode:'',
  reason: '',
  gender: '',
  email:'',
})

const submittedCards = ref([])
//local storage
const loadSubmittedCardsFromStorage = () => {
  const storedCards = localStorage.getItem('submittedCards')
  if (storedCards) {
    submittedCards.value = JSON.parse(storedCards)
  }
}
const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateReason(true)
  validateEmail(true)
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.email &&
    !errors.value.reason &&
    !errors.value.adminCode
  ) {
    if (adminCode.value === correctAdminCode) {
      formData.value.isAdmin = true
    } else {
      formData.value.isAdmin = false
    }
    submittedCards.value.push({ ...formData.value })
    //console.log("Submitted Cards Array: ", submittedCards.value);
    localStorage.setItem('submittedCards', JSON.stringify(submittedCards.value))
    //console.log("LocalStorage Submitted Cards: ", localStorage.getItem('submittedCards'));
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
    adminCode:'',
    reason: '',
    gender: '',
    email:'',
  }
  adminCode.value = ''
}
//local storage
onMounted(() => {
  loadSubmittedCardsFromStorage();
  console.log("Loaded Submitted Cards from LocalStorage: ", submittedCards.value); 
})

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  gender: null,
  reason: null,
  email: null,
})


const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  if (!emailPattern.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address';
  } else {
    errors.value.email = null;
  }
}

/**
 * Confirm password validation function that checks if the password and confirm password fields match.
 * @param blur: boolean - If true, the function will display an error message if the passwords do not match.
 */
 const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateReason = (blur) => {
    if (formData.value.reason.length < 10) {
        if (blur) errors.value.reason = "Reason must be at least 10 characters.";
    } else {
        errors.value.reason = null;
    }
};

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">🗄️ Registration Form</h1>
        <p class="text-center">
        </p>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6 col-lg-4 col-xl-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6 col-sm-6 col-lg-4 col-xl-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <div class="col-md-6 col-sm-6 col-lg-4 col-xl-3">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
            <div class="col-md-6 col-sm-6 col-lg-4 col-xl-3">
              <label for="Email" class="form-label">Email</label>
              <input
                type="Email"
                class="form-control"
                id="Email"
                @blur="() => validateEmail(true)"
                @input="() => validateEmail(false)"
                v-model="formData.email"
              />
              <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>
            <div class="col-md-6 col-sm-6 col-lg-4 col-xl-3">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAdmin"
                  v-model="formData.isAdmin"
                />
                <label class="form-check-label" for="isAdmin">Admin?</label>
              </div>
            </div>
            

            <div class="col-md-6 col-sm-6 col-lg-4 col-xl-3">
              <label for="adminCode" class="form-label">Enter token to prove you are admin</label>
              <input
                type="password"
                class="form-control"
                id="adminCode"
                v-model="adminCode"
                placeholder="Enter if admin"
              />
            </div>


            <div class="col-md-6 col-sm-6 col-lg-4 col-xl-3">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" v-model="formData.gender" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
            ></textarea>
            <p v-if="errors.reason" class="text-danger">{{ errors.reason }}</p>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.form {
  text-align: center;
  margin-top: 50px;
}

#username:focus,
#password:focus,
#isAdmin:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
