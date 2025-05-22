<template>
  <div class="p-fluid p-4">
    <h2 class="mb-4">Protect Certificate</h2>

    <form @submit.prevent="mintNFT" class="p-fluid flex flex-column gap-4">

      <!-- Ряд: Wallet + Phone -->
      <div class="grid formgrid">
        <div class="col-12 md:col-6">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-key" />
            </InputGroupAddon>
            <InputText v-model="form.publicKey" placeholder="Patient Wallet" required />
          </InputGroup>
        </div>

        <div class="col-12 md:col-6">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-phone" />
            </InputGroupAddon>
            <InputMask
                v-model="form.phone"
                mask="+999 999 999 9999"
                placeholder="+XXX XXX XXX XXXX"
                required
            />
          </InputGroup>
        </div>
      </div>

      <!-- Ряд: Type + Upload -->
      <div class="grid formgrid">
        <div class="col-12 md:col-6">
          <Dropdown
              v-model="form.type"
              :options="certificateTypes"
              optionLabel="label"
              optionValue="value"
              placeholder="Certificate Type"
              showClear
              class="w-full"
          />
        </div>

        <div class="col-12 md:col-6">
          <FileUpload
              name="pdf"
              accept="application/pdf"
              mode="advanced"
              :auto="false"
              :multiple="false"
              chooseLabel="Choose / Drag PDF"
              @select="onSelect"
              :customUpload="true"
              @uploader="noop"
              class="w-full"
          />
        </div>
      </div>

      <!-- Description -->
      <div>
        <Textarea
            v-model="form.text"
            rows="3"
            autoResize
            placeholder="Optional Description / Notes"
            class="w-full"
        />
      </div>

      <!-- Submit -->
      <div>
        <Button type="submit" label="Protect via blockchain" icon="pi pi-lock" />
      </div>
    </form>

    <!-- Success Dialog -->
    <Dialog v-model:visible="isSuccess" modal header="Success" :closable="false">
      <div class="p-text-center">
        <i class="pi pi-check-circle" style="font-size: 4rem; color: green;" />
        <h3>Draft successfully created</h3>
        <p>Once the patient completes the payment, the data will be recorded on the blockchain.</p>
        <Button label="Protect another certificate" @click="resetForm" />
      </div>
    </Dialog>
  </div>
</template>


<script setup>
import {ref} from 'vue'
import axios from 'axios'

import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Dropdown from 'primevue/dropdown'
import Textarea from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import {useToast} from 'primevue/usetoast'

const toast = useToast()

const form = ref({publicKey: '', phone: '', type: '', text: '', file: null})
const isSuccess = ref(false)
const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

const certificateTypes = [
  {label: 'Medical Certificate', value: 'medical'},
  {label: 'Vaccination Proof', value: 'vaccine'},
  {label: 'Workplace Clearance', value: 'work'},
  {label: 'School Clearance', value: 'school'}
]

function onSelect({files, options}) {
  const file = files?.[0]
  if (!file || file.type !== 'application/pdf') {
    toast.add({severity: 'warn', summary: 'Only PDF files allowed', life: 3000})
    options.clear()
    return
  }
  form.value.file = file
}

const noop = (e) => e.options.clear()

async function mintNFT() {
  if (!form.value.file) {
    toast.add({severity: 'warn', summary: 'Upload PDF', life: 3000})
    return
  }

  try {
    const fd = new FormData()
    fd.append('file', form.value.file)
    const {data: {ipfs_hash}} = await axios.post(`${SERVER_ADDRESS}/v1/ipfs/files`, fd)

    const metadata = {
      name: 'Medical Certificate',
      symbol: 'MEDCERT',
      description: form.value.text || 'Medical certificate',
      file: `ipfs://${ipfs_hash}`
    }
    const {data: meta} = await axios.post(`${SERVER_ADDRESS}/v1/ipfs/metadata`, metadata)

    await axios.post(`${SERVER_ADDRESS}/v1/nft/draft`, {
      publicKey: form.value.publicKey,
      phone: form.value.phone,
      type: form.value.type,
      metadataHash: meta.ipfs_hash || meta.hash || ''
    })

    isSuccess.value = true
  } catch (err) {
    console.error(err)
    toast.add({severity: 'error', summary: 'Error creating certificate', life: 4000})
  }
}

function resetForm() {
  form.value = {publicKey: '', phone: '', type: '', text: '', file: null}
  isSuccess.value = false
}
</script>
