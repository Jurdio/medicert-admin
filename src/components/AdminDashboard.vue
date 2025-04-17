<template>
  <v-container class="py-6" fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Admin Dashboard
          </v-card-title>

          <v-card-text>
            <v-text-field
                v-model="search"
                label="Search user"
                variant="outlined"
                prepend-inner-icon="mdi-magnify"
                class="mb-4"
            />

            <v-table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <v-btn size="small" color="primary" @click="editUser(user)">
                    Edit
                  </v-btn>
                  <v-btn size="small" color="error" @click="deleteUser(user)">
                    Delete
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com' },
])

const filteredUsers = computed(() => {
  return users.value.filter(u =>
      u.name.toLowerCase().includes(search.value.toLowerCase()) ||
      u.email.toLowerCase().includes(search.value.toLowerCase())
  )
})

const editUser = (user) => {
  console.log('Editing user:', user)
}

const deleteUser = (user) => {
  console.log('Deleting user:', user)
}
</script>

<style scoped>
.v-card-title {
  font-weight: bold;
  font-size: 1.4rem;
}
</style>
