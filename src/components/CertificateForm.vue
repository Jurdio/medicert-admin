<template>
  <div class="p-fluid">
    <form @submit.prevent="mintNFT" class="grid formgrid">
      <!-- Ліва колонка -->
      <div
          class="col-12 md:col-6 flex flex-column gap-4 surface-card p-3"
          style="min-height: 100%; height: 100%;"
      >
        <InputGroup>
          <InputGroupAddon><i class="pi pi-key" /></InputGroupAddon>
          <InputText v-model="form.publicKey" placeholder="Patient Wallet" required />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon><i class="pi pi-phone" /></InputGroupAddon>
          <InputMask
              v-model="form.phone"
              mask="+999 999 999 9999"
              placeholder="+XXX XXX XXX XXXX"
              required
          />
        </InputGroup>


        <Dropdown
            v-model="form.type"
            :options="certificateTypes"
            optionLabel="label"
            optionValue="value"
            placeholder="Certificate Type"
            showClear
            class="w-full"
        />

        <div class="flex-grow-1 flex flex-column">
          <label>Description</label>
          <Textarea
              v-model="form.text"
              rows="6"
              autoResize="false"
              class="w-full h-full"
              style="resize: none; overflow: auto;"
          />
        </div>
      </div>

      <!-- Права колонка -->
      <div
          class="col-12 md:col-6 flex flex-column justify-between surface-card p-3"
          style="min-height: 100%; height: 100%;"
      >
        <div class="flex-grow-1">
          <FileUpload
              name="pdf"
              accept="application/pdf"
              mode="advanced"
              :auto="false"
              :multiple="false"
              :showUploadButton="false"
              :showCancelButton="false"
              customUpload
              @select="onSelect"
              @uploader="noop"
              :maxFileSize="10000000"
              class="w-full"
              chooseLabel="Choose or Drag PDF"
          />
        </div>

        <!-- кнопка знизу -->
        <div class="pt-4">
          <Button type="submit" label="Protect via blockchain" icon="pi pi-lock" class="w-full" />
        </div>
      </div>
    </form>
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
