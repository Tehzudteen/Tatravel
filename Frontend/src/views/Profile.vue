<template>
  <div class="container mx-auto  p-5 sm:p-4">
    <div class="card bg-base-100 shadow-xl">
      <figure class="relative group">
        <img :src="user.coverPhoto" alt="Cover Photo" class="w-full h-32 sm:h-48 object-cover" />
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button class="btn btn-primary btn-sm sm:btn-md" @click="openCoverUpload">Edit Cover</button>
        </div>
        <input type="file" ref="coverInput" @change="handleCoverUpload" class="hidden" accept="image/*" />
      </figure>
      <div class="card-body p-4">
        <div class="flex flex-col sm:flex-row items-center sm:space-x-4">
          <div class="avatar relative group mb-4 sm:mb-0">
            <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img :src="user.avatarUrl" alt="User Avatar" />
              <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                <button class="btn btn-xs btn-primary" @click="openImageUpload">Edit</button>
              </div>
            </div>
            <input type="file" ref="fileInput" @change="handleImageUpload" class="hidden" accept="image/*" />
          </div>
          <div class="text-center sm:text-left">
            <h2 class="card-title text-xl sm:text-2xl group mb-2">
              <span v-if="!editing.name">{{ user.name }}</span>
              <input v-else v-model="tempUser.name" @blur="stopEditing('name')" class="input input-bordered input-sm sm:input-md" />
              <button v-if="!editing.name" @click="startEditing('name')" class="btn btn-xs btn-ghost opacity-100 sm:opacity-0 sm:group-hover:opacity-100 ml-2">Edit</button>
            </h2>
            <p class="text-base-content text-opacity-70 group">
              <span v-if="!editing.email">{{ user.email }}</span>
              <input v-else v-model="tempUser.email" @blur="stopEditing('email')" class="input input-bordered input-sm sm:input-md" />
              <button v-if="!editing.email" @click="startEditing('email')" class="btn btn-xs btn-ghost opacity-100 sm:opacity-0 sm:group-hover:opacity-100 ml-2">Edit</button>
            </p>
          </div>
        </div>
        <p class="mt-4 text-sm sm:text-base">{{ user.bio }}</p>
        <div class="stats stats-vertical sm:stats-horizontal shadow mt-4 text-xs sm:text-sm">
          <div class="stat">
            <div class="stat-title">Countries Visited</div>
            <div class="stat-value text-primary text-lg sm:text-xl">{{ user.countriesVisited }}</div>
          </div>
          <div class="stat">
            <div class="stat-title">Travel Points</div>
            <div class="stat-value text-secondary text-lg sm:text-xl">{{ user.travelPoints }}</div>
          </div>
        </div>
        <div class="divider text-sm sm:text-base">Recent Trips</div>
        <div class="space-y-2 sm:space-y-4">
          <div v-for="trip in user.recentTrips" :key="trip.id" class="card bg-base-200 shadow-sm">
            <div class="card-body p-3 sm:p-4">
              <h3 class="card-title text-base sm:text-lg">{{ trip.destination }}</h3>
              <p class="text-sm">{{ trip.date }}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary btn-xs sm:btn-sm">View Details</button>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 space-y-2">
          <button class="btn btn-primary btn-sm sm:btn-md w-full" @click="changePassword">Change Password</button>
          <button class="btn btn-error btn-sm sm:btn-md w-full" @click="logout">Logout</button>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <transition name="modal">
      <div v-if="showConfirm" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="modal modal-open">
          <div class="modal-box">
            <h2 class="font-bold text-lg">Confirm Changes</h2>
            <p>Are you sure you want to update your {{ confirmField }}?</p>
            <div class="modal-action">
              <button class="btn" @click="confirmChanges">Confirm</button>
              <button class="btn btn-secondary" @click="cancelChanges">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const user = reactive({
  name: 'John Doe',
  email: 'john.doe@example.com',
  location: 'New York, USA',
  bio: 'Passionate traveler and photographer. Always seeking new adventures!',
  avatarUrl: 'https://i.pinimg.com/originals/87/85/ad/8785ad36346ae3ba48ab80cabd498b8b.gif',
  coverPhoto: 'https://i.pinimg.com/originals/87/85/ad/8785ad36346ae3ba48ab80cabd498b8b.gif',
  countriesVisited: 25,
  travelPoints: 1250,
  recentTrips: [
    { id: 1, destination: 'Paris, France', date: 'May 2023' },
    { id: 2, destination: 'Tokyo, Japan', date: 'August 2023' },
    { id: 3, destination: 'Rio de Janeiro, Brazil', date: 'December 2023' }
  ]
})

const editing = reactive({
  name: false,
  email: false
})

const tempUser = reactive({
  name: user.name,
  email: user.email
})

const fileInput = ref(null)
const coverInput = ref(null)
const showConfirm = ref(false)
const confirmField = ref('')

function openImageUpload() {
  fileInput.value.click()
}

function openCoverUpload() {
  coverInput.value.click()
}

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      user.avatarUrl = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function handleCoverUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      user.coverPhoto = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

function startEditing(field) {
  editing[field] = true
}

function stopEditing(field) {
  editing[field] = false
  if (field === 'name') {
    confirmField.value = 'name'
  } else if (field === 'email') {
    confirmField.value = 'email'
  }
  showConfirm.value = true
}

function confirmChanges() {
  user.name = tempUser.name
  user.email = tempUser.email
  showConfirm.value = false
}

function cancelChanges() {
  tempUser.name = user.name
  tempUser.email = user.email
  editing.name = false
  editing.email = false
  showConfirm.value = false
}

function changePassword() {
  console.log('Changing password...')
}

function logout() {
  console.log('Logging out...')
}
</script>

<style scoped>
/* Add any additional styles if needed */
</style>