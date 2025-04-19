<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col cols="12" md="8">
        <template v-if="!isSuccess">
        <v-card class="pa-6 gradient-card" elevation="3">
          <v-card-title class="text-h5 text-indigo-900 font-weight-bold">
            Protect Certificate
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="mintNFT">
              <v-text-field
                  v-model="form.publicKey"
                  label="Patient Wallet (Public Key)"
                  outlined
                  required
                  density="compact"
                  class="mb-3"
              ></v-text-field>

              <vue-tel-input
                  v-model="form.phone"
                  :input-options="{ showDialCode: true }"
                  :valid-character-only="true"
                  placeholder="Enter patient phone number"
                  class="mb-6"
                  density="compact"
              />


              <v-select
                  v-model="form.type"
                  :items="certificateTypes"
                  label="Certificate Type"
                  outlined
                  requiredї
                  density="compact"
              ></v-select>

              <v-textarea
                  v-model="form.text"
                  label="Optional Description / Notes"
                  outlined
                  density="compact"
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
                  <p v-if="form.file" class="file-name">📄 {{ form.file.name }}
                    <v-btn icon @click="form.file = null" size="x-small">
                      <v-icon size="16">mdi-close</v-icon>
                    </v-btn>
                  </p>
                </div>
              </div>

              <v-btn class="mt-6 gradient-btn" type="submit">
                Protect via blockchain
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        </template>
        <template v-else>
          <v-card class="pa-6 gradient-card" elevation="3">
            <div class="success-layout text-center py-12">
              <v-icon size="96" color="green" class="mb-4">mdi-check-circle-outline</v-icon>
              <h2 class="text-h5 font-weight-bold mb-2">Draft successfully created</h2>
              <p class="mb-6">
                The certificate draft has been successfully created. Once the patient completes the payment,
                the data will be recorded on the blockchain.
              </p>
              <v-btn class="gradient-btn" @click="resetForm">Protect another certificate</v-btn>
            </div>

          </v-card>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { VueTelInput } from 'vue-tel-input';
import axios from 'axios';

const successMessage = ref('');
const form = ref({
  publicKey: '',
  phone: '',
  file: null,
  type: '',
  text: '',
});
const isSuccess = ref(false); // чи форма завершена


const dragActive = ref(false);
const fileInput = ref(null);
const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS;

const certificateTypes = [
  'Medical Certificate',
  'Vaccination Proof',
  'Workplace Clearance',
  'School Clearance',
];

function validatePhone(value) {
  const phoneRegex = /^\+?[1-9]\d{6,14}$/;
  return phoneRegex.test(value) || 'Invalid phone number';
}
function resetForm() {
  form.value = {
    publicKey: '',
    phone: '',
    file: null,
    type: '',
    text: '',
  };
  isSuccess.value = false;
  successMessage.value = '';
}


function handleDrop(e) {
  dragActive.value = false;
  const files = e.dataTransfer.files;
  if (files.length !== 1 || files[0].type !== 'application/pdf') {
    alert('Please drop exactly one PDF file.');
    return;
  }
  form.value.file = files[0];
}

function handleFileChange(e) {
  const file = e.target.files[0];
  if (!file || file.type !== 'application/pdf') {
    alert('Only PDF files are allowed.');
    return;
  }
  form.value.file = file;
}

async function mintNFT() {
  successMessage.value = '';
  if (!form.value.file) return alert('Please upload a PDF file.');
  if (!validatePhone(form.value.phone)) return alert('Invalid phone number');

  try {
    // 1. Upload file
    const fileData = new FormData();
    fileData.append('file', form.value.file);

    const { data: { ipfs_hash } } = await axios.post(
        `${SERVER_ADDRESS}/v1/ipfs/files`,
        fileData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
    );

    // 2. Upload metadata
    const metadata = {
      name: 'Medical Certificate #123',
      symbol: 'MEDCERT',
      description: form.value.text || 'Довідка про придатність до праці',
      file: `ipfs://${ipfs_hash}`,
    };

    const { data: metadataResponse } = await axios.post(
        `${SERVER_ADDRESS}/v1/ipfs/metadata`,
        metadata
    );

    //3. Create draft on backend
    await axios.post(`${SERVER_ADDRESS}/v1/nft/draft`, {
      publicKey: form.value.publicKey,
      phone: form.value.phone,
      type: form.value.type,
      metadataHash: metadataResponse.ipfs_hash || metadataResponse.hash || '',
    });
    isSuccess.value = true;
    successMessage.value = '✅ Повідомлення надіслано. Чернетка створена!';
  } catch (err) {
    console.error(err);
    alert('❌ Помилка при створенні сертифіката. Спробуйте ще раз.');
  }
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
.success-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
