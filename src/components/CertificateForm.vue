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

              <!-- Custom File Drop Zone -->
              <div
                  class="file-drop-zone mt-4"
                  @dragover.prevent="dragActive = true"
                  @dragleave.prevent="dragActive = false"
                  @drop.prevent="handleDrop"
              >
                <div class="file-drop-label">
                  <v-icon size="36" color="#ff6b6b">mdi-cloud-upload</v-icon>
                  <p>Drag & Drop PDF here or click to upload</p>
                  <input
                      ref="fileInput"
                      type="file"
                      accept=".pdf"
                      @change="handleFileChange"
                      class="file-input"
                  />
                  <p v-if="form.file" class="file-name">📄 {{ form.file.name }}</p>
                </div>
              </div>

              <v-btn class="mt-6 gradient-btn" type="submit">
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

const dragActive = ref(false);
const fileInput = ref(null);

const certificateTypes = [
  'Medical Certificate',
  'Vaccination Proof',
  'Workplace Clearance',
  'School Clearance',
];

function handleDrop(e) {
  dragActive.value = false;
  const files = e.dataTransfer.files;
  if (files.length && files[0].type === 'application/pdf') {
    form.value.file = files[0];
  }
}

function handleFileChange(e) {
  const file = e.target.files[0];
  if (file && file.type === 'application/pdf') {
    form.value.file = file;
  }
}

function mintNFT() {
  if (!form.value.file) return alert('Please upload a PDF file.');
  console.log('Minting for', form.value.publicKey);
  console.log('Uploading file:', form.value.file);
}
</script>

<style scoped>
.gradient-card {
  background: linear-gradient(135deg, #ffffff, #e0f2f1);
  border-radius: 16px;
  font-family: 'Poppins', sans-serif;
}
.gradient-btn {
  background: linear-gradient(90deg, #ff6b6b, #ff3d71);
  color: white;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  transition: background 0.3s ease;
}
.gradient-btn:hover {
  background: linear-gradient(90deg, #ff3d71, #e62958);
}
.v-card-title {
  font-family: 'Poppins', sans-serif;
}

.file-drop-zone {
  border: 2px dashed #ff6b6b;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: border-color 0.3s ease;
}
.file-drop-zone:hover {
  border-color: #e62958;
}
.file-drop-label {
  font-family: 'Poppins', sans-serif;
  color: #444;
}
.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.file-name {
  font-size: 14px;
  margin-top: 8px;
  color: #333;
}
</style>
