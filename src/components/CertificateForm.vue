<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6 gradient-card" elevation="3">
          <v-card-title class="text-h5 text-indigo-900 font-weight-bold">
            Mint Certificate as NFT
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="mintNFT">
              <v-text-field
                  v-model="form.publicKey"
                  label="Patient Wallet (Public Key)"
                  outlined
                  required
              ></v-text-field>

              <v-file-input
                  v-model="form.file"
                  label="Upload Certificate File (PDF)"
                  accept=".pdf"
                  outlined
                  required
              ></v-file-input>

              <v-select
                  v-model="form.type"
                  :items="certificateTypes"
                  label="Certificate Type"
                  outlined
                  required
              ></v-select>

              <v-textarea
                  v-model="form.text"
                  label="Optional Description / Notes"
                  outlined
              ></v-textarea>

              <v-btn class="mt-4 gradient-btn" type="submit">
                Mint NFT
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  publicKey: '',
  file: null,
  type: '',
  text: '',
});

const certificateTypes = [
  'Medical Certificate',
  'Vaccination Proof',
  'Workplace Clearance',
  'School Clearance',
];

function mintNFT() {
  console.log('Minting for', form.value.publicKey);
  console.log('Uploading file:', form.value.file);
  // Далі логіка: upload -> metadata -> mint
}
</script>

<style scoped>
.gradient-card {
  background: linear-gradient(135deg, #ffffff, #e0f2f1);
  border-radius: 16px;
  font-family: 'Poppins', sans-serif;
}
.gradient-btn {
  background: linear-gradient(90deg, #6366f1, #4f46e5);
  color: white;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}
.v-card-title {
  font-family: 'Poppins', sans-serif;
}
</style>
