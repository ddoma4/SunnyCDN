<script setup>
import { ref } from 'vue'

const props = defineProps({
  showLogin: Boolean
})

const emit = defineEmits(['close', 'login-success'])

const username = ref('')
const password = ref('')

const Config = {
  Endpoint: 'localhost:7200' // adjust if needed
}

function submit(u, p){
  fetch(`https://${Config.Endpoint}/sendCredentials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ u, p })
  })
  .then(r => {
    if (r.ok){
      emit('login-success')
      emit('close')
    }
  })
}
</script>

<template>
<Transition name="login_modal" v-if="showLogin">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="top">
          <span>SunnyCDN - Login</span>
        </div>

        <div class="content">
          <h3>USERNAME:</h3>
          <input type="text" v-model="username">

          <h3>PASSWORD:</h3>
          <input type="password" v-model="password">

          <button @click="submit(username, password)">SUBMIT</button>
          <button @click="$emit('close')">CLOSE</button>
        </div>
      </div>
    </div>
  </div>
</Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(4px);
  transition: all 0.2s ease-in;
}

.modal-container {
  width: 400px;
  max-width: 90%;

  background-color: var(--mantine-color-gray-9);
  color: white;

  padding: 2rem;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  transition: all 0.2s ease-in;
}

.modal-container .top {
  text-align: center;
  font-size: 22px;
  font-weight: 500;
}

.modal-container .content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.modal-container input {
  border: none;
  outline: none;
  padding: 0.75rem;

  background-color: var(--mantine-color-gray-8);
  color: white;
}

.modal-container button {
  border: none;
  padding: 0.75rem;
  margin-top: 0.5rem;

  background-color: var(--mantine-color-gray-8);
  color: white;

  cursor: pointer;

  transition: all 0.2s ease-in;
}

.modal-container button:hover {
  background-color: var(--mantine-color-blue-9);
}

.modal-container button:last-child {
  background-color: var(--mantine-color-gray-8);
}

.modal-container button:last-child:hover {
  background-color: var(--mantine-color-gray-7);
}

/* transition */
.login_modal-enter-active,
.login_modal-leave-active {
  transition: opacity 0.2s ease;
}

.login_modal-enter-from,
.login_modal-leave-to {
  opacity: 0;
}

.login_modal-enter-from .modal-container,
.login_modal-leave-to .modal-container {
  transform: scale(0.95);
}
</style>