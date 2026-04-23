<script setup>
import { ref, computed } from 'vue'
import Login from './components/login.vue'

const currentMenu = ref('files')
const IsUserLoggedIn = ref(false)
const files = ref([
  {
    name: "Doc1",
    uploader: "ddoma4",
    date: "2026/04/23"
  },
  {
    name: "Doc2",
    uploader: "ddoma4",
    date: "2026/04/23"
  },
  {
    name: "Doc3",
    uploader: "ddoma4",
    date: "2026/04/23"
  },
  {
    name: "Doc4",
    uploader: "ddoma4",
    date: "2026/04/23"
  },
  {
    name: "Doc5",
    uploader: "ddoma4",
    date: "2026/04/23"
  },
  {
    name: "Doc6",
    uploader: "ddoma4",
    date: "2026/04/23"
  },
  {
    name: "Doc7",
    uploader: "ddoma4",
    date: "2026/04/23"
  },
])
const users = ref([])
const file_name = ref('Document 1')
const showLogin = ref(false)
const fileSearch = ref('')
const userSearch = ref('')

const filteredFiles = computed(() => {
  if (!fileSearch.value) return files.value

  const search = fileSearch.value.toLowerCase()

  const exact = files.value.find(f => f.name.toLowerCase() === search)
  if (exact) return [exact]

  const partial = files.value.find(f => f.name.toLowerCase().includes(search))
  return partial ? [partial] : []
})

const filteredUsers = computed(() => {
  return users.value.filter(u =>
    u.name?.toLowerCase().includes(userSearch.value.toLowerCase()) ||
    u.email?.toLowerCase().includes(userSearch.value.toLowerCase())
  )
})

function showMenu(menu){
  currentMenu.value = menu
}

function handleLoginSuccess(){
  IsUserLoggedIn.value = true
}

function openLogin(){
  showLogin.value = true
}

function closeLogin(){
  showLogin.value = false
}

function uploadFile(name, file){
  const formData = new FormData()
  formData.append('file', file)
  formData.append('name', name)

  fetch(`https://localhost:7200/uploadFile`, {
    method: 'POST',
    body: formData
  })
}
</script>

<template>
  <div class="top">
    <span>SunnyCDN</span>
    <div class="navbar">
      <button @click="showMenu('files')" :class="{ active : currentMenu === 'files' }">FILES</button>
      <button @click="showMenu('create')" :class="{ active : currentMenu === 'create' }">CREATE</button>
      <button @click="showMenu('users')" :class="{ active : currentMenu === 'users' }">USERS</button>
      <button @click="openLogin" class="login-btn" :class="{ active : IsUserLoggedIn }">LOGIN</button>
    </div>
  </div>

  <div class="files" v-if="currentMenu === 'files'">
    <span class="title">FILES</span>

    <div class="searchbar">
      <input type="search" v-model="fileSearch" placeholder="Search...">
      <button @click="() => {}"><i class="ti ti-zoom"></i></button>
    </div>

    <span v-if="filteredFiles.length === 0" class="not-found">No files found</span>

    <div class="grid" v-for="item in filteredFiles">
      <div class="info">
        <span>FILE: {{ item.name }}</span>
        <h3>AUTHOR: {{ item.uploader }}</h3>
        <h3>CREATION DATE: {{ item.date }}</h3>
      </div>
      <div class="btn">
        <button><i class="ti ti-download"></i></button>
        <button><i class="ti ti-zoom"></i></button>
      </div>
    </div>
  </div>

  <div class="create" v-if="currentMenu === 'create'">
    <span class="title">CREATE</span>

    <div class="createForm">
      <h3>FILE NAME</h3>
      <input type="text" v-model="file_name">
      <h3>SELECT FILE</h3>
      <input type="file" @change="e => file.value = e.target.files[0]">
      <button @click="uploadFile(file_name, file)">UPLOAD</button>
    </div>
  </div>

  <div class="users" v-if="currentMenu === 'users'">
    <span class="title">USERS</span>

    <div class="searchbar">
      <input type="search" v-model="userSearch" placeholder="Search...">
      <button @click="() => {}"><i class="ti ti-zoom"></i></button>
    </div>

    <span v-if="filteredFiles.length === 0" class="not-found">No users found</span>

    <div class="grid" v-for="item in users">
      <span>{{ item.name }}</span>
      <h3>{{ item.rang }}</h3>
      <h3>{{ item.email }}</h3>
    </div>
  </div>

  <footer>
    <span>SunnyCDN v0.3</span>
    <span>Developer: ddoma4 | <a href="https://github.com/ddoma4">GitHub</a></span>
  </footer>

  <Login 
    :showLogin="showLogin"
    @close="closeLogin"
    @login-success="handleLoginSuccess"
  />
</template>

<style scoped>
  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 1vh;
  }
  .top > span {
    font-size: 32px;
    font-weight: 500;
  }
  .navbar {
    background-color: var(--mantine-color-gray-9);
    display: flex;
    flex-direction: row;
    gap: 1vh;
    justify-content: center;
    padding: 1vh;
  }
  .navbar > button {
    border: 2px solid transparent;
    font-family: 20px;
    transition: all .2s ease-in;
    width: 10vh;
  }
  .navbar > button:hover {
    border-bottom: 2px solid var(--mantine-color-blue-9);
  }
  .navbar > button.active {
    border-bottom: 2px solid var(--mantine-color-blue-9);
  }
  .login-btn {
    border: none !important;
  }
  .login-btn:hover {
    background-color: var(--mantine-color-blue-9);
  }
  .title {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 1vh;
    font-size: 28px;
  }
  .searchbar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1vh;
  }
  .searchbar > input {
    border: none;
    background-color: var(--mantine-color-gray-9);
    padding: 1vh;
    outline: none;
  }
  .searchbar > button {
    background: none;
    border: transparent;
    width: 5vh;
    height: 5vh;
    transition: all .2s ease-in;
  }
  .searchbar > button:hover {
    background-color: var(--mantine-color-blue-9);
  }
  .createForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 1vh;
  }
  .createForm > input {
    border: none;
    padding: 1vh;
    background-color: var(--mantine-color-gray-9);
    outline: none;
  }
  .createForm > button {
    border: none;
    padding: 1vh;
    transition: all .2s ease-in;
  }
  .createForm > button:hover {
    background-color: var(--mantine-color-blue-9);
  }
  .files > .grid {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto;
    margin: 5vh;
    overflow-y: auto;
    background-color: var(--mantine-color-gray-9);
    padding: 1vh;
    height: max-content;
    gap: 2vh;
  }
  .files > .grid > .info {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    justify-content: space-evenly;
  }
  .files > .grid > .info > span {
    font-size: 28px;
    font-weight: 500;
  }
  .files > .grid > .info > h3 {
    font-size: 20px;
    font-weight: 400;
  }
  .files > .grid > .btn {
    display: flex;
    flex-direction: column;
    gap: 1vh;
  }
  .files > .grid > .btn > button {
    background: none;
    border: none;
    padding: 1vh;
    transition: all .2s ease-in;
    display: flex;
    justify-content: center;
    gap: 1vh;
    background-color: var(--mantine-color-gray-8);
    font-size: 20px;
  }
  .files > .grid > .btn > button:hover {
    background-color: var(--mantine-color-blue-9);
  }
  .not-found {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 1%;
  }

/* Desktop styles */
@media (min-width: 1024px) {

  .top {
    gap: 0.5rem;
  }

  .top > span {
    font-size: 40px;
  }

  .navbar {
    justify-content: space-between;
    padding: 1rem 3rem;
  }

  .navbar > button {
    width: auto;
    padding: 0.5rem 1.5rem;
    font-size: 18px;
  }

  .title {
    font-size: 36px;
    margin-top: 2rem;
  }

  .searchbar {
    gap: 1rem;
  }

  .searchbar > input {
    width: 400px;
    padding: 0.75rem;
  }

  .searchbar > button {
    width: 50px;
    height: 50px;
  }

  .createForm {
    width: 400px;
    gap: 1rem;
  }

  .files > .grid {
    grid-template-columns: 2fr 1fr;
    align-items: center;
    padding: 2rem;
    gap: 1.5rem;
  }

  .files > .grid > .info > span {
    font-size: 32px;
  }

  .files > .grid > .info > h3 {
    font-size: 22px;
  }

  .files > .grid > .btn {
    flex-direction: row;
    justify-content: flex-end;
  }

  .files > .grid > .btn > button {
    padding: 0.75rem 1.25rem;
    font-size: 16px;
  }
}
</style>