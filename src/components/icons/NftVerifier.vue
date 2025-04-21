<template>
  <v-container class="py-12">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="2" class="pa-6">
          <v-card-title class="text-h5 font-weight-bold">
            🕵️ Verify NFT Certificate
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="verifyNft">
              <v-text-field
                  v-model="form.mint"
                  label="Mint Address"
                  outlined
                  required
                  density="compact"
                  class="mb-4"
              />

              <v-text-field
                  v-model="form.hash"
                  label="Metadata Hash"
                  outlined
                  required
                  density="compact"
                  class="mb-6"
              />

              <v-btn type="submit" color="primary" :loading="loading">
                Verify
              </v-btn>
            </v-form>

            <div v-if="result" class="mt-6">
              <v-alert
                  :type="result.success ? 'success' : 'error'"
                  border="start"
                  elevation="2"
                  colored-border
              >
                {{ result.message }}
              </v-alert>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

const form = ref({
  mint: '',
  hash: ''
})

const loading = ref(false)
const result = ref(null)

const verifyNft = async () => {
  loading.value = true
  result.value = null

  try {
    const { data } = await axios.get(`${SERVER_ADDRESS}/v1/nft/verify`, {
      params: {
        mint: form.value.mint,
        hash: form.value.hash
      }
    })

    result.value = {
      success: data.status === 'success',
      message: data.message || 'Verification successful!'
    }
  } catch (err) {
    console.error(err)
    result.value = {
      success: false,
      message: err.response?.data?.message || 'Verification failed.'
    }
  } finally {
    loading.value = false
  }
}
</script>
