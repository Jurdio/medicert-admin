<template>
  <div class="p-fluid" style="max-width: 600px; margin: 0 auto;">
    <form @submit.prevent="mintNFT" class="flex flex-column gap-3">
      <!-- Public Key -->
      <InputGroup class="p-inputgroup-sm">
        <InputGroupAddon><i class="pi pi-key"></i></InputGroupAddon>
        <InputText
            v-model="form.publicKey"
            placeholder="Patient Wallet"
            class="p-input-sm w-full"
            required
        />
      </InputGroup>

      <!-- Phone -->
      <InputGroup class="p-inputgroup-sm">
        <InputGroupAddon><i class="pi pi-phone"></i></InputGroupAddon>
        <InputMask
            v-model="form.phone"
            mask="+999 999 999 9999"
            placeholder="+XXX XXX XXX XXXX"
            class="p-input-sm w-full"
            required
        />
      </InputGroup>

      <!-- Type -->
      <Dropdown
          v-model="form.type"
          :options="certificateTypes"
          optionLabel="label"
          optionValue="value"
          placeholder="Certificate Type"
          showClear
          class="p-input-sm w-full"
      />

      <!-- Description -->
      <Textarea
          v-model="form.text"
          rows="4"
          placeholder="Optional Description / Notes"
          class="p-input-sm w-full"
          style="resize: none; overflow: auto;"
      />

      <!-- File Upload -->
      <FileUpload
          name="pdf"
          accept="application/pdf"
          mode="advanced"
          :auto="true"
          :multiple="false"
          :showUploadButton="false"
          :showCancelButton="false"
          @select="onSelect"
          :maxFileSize="10000000"
          class="p-input-sm w-full"
          chooseLabel="Choose or Drag PDF"
      />

      <!-- Submit -->
      <Button
          type="submit"
          label="Protect via blockchain"
          icon="pi pi-lock"
          class="p-button-md w-full mt-2"
          :disabled="loading"
      />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

/* PrimeVue компоненти — імпорт по одному (v3) */
import InputText       from 'primevue/inputtext'
import InputMask       from 'primevue/inputmask'
import Dropdown        from 'primevue/dropdown'
import Textarea        from 'primevue/textarea'
import FileUpload      from 'primevue/fileupload'
import Button          from 'primevue/button'
import InputGroup      from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

/* Toast + простий стейт */
const toast   = useToast()
const loading = ref(false)
const fileUploader = ref(null)

const form = ref({
  publicKey: '',
  phone:     '',
  type:      '',
  text:      '',
  file:      null
})

/* типи сертифікатів */
const certificateTypes = [
  { label: 'Medical Certificate',   value: 'medical' },
  { label: 'Vaccination Proof',     value: 'vaccine' },
  { label: 'Workplace Clearance',   value: 'work'    },
  { label: 'School Clearance',      value: 'school'  }
]

/* 1. Вибір файлу — валідація PDF */
function onSelect ({ files }) {
  const file = files?.[0]
  if (!file || file.type !== 'application/pdf') {
    toast.add({ severity:'warn', summary:'Only PDF files allowed', life:3000 })
    fileUploader.value.clear()              // прибираємо рядок
    return
  }
  form.value.file = file
  toast.add({ severity:'info', summary:'PDF selected', detail:file.name, life:2000 })
}

/* 2. Кастомний uploader — імітуємо завантаження */
function onUpload (event) {
  // "Затримка" 1 с, далі помічаємо progress = 100
  setTimeout(() => {
    event.files.forEach(f => (f.progress = 100))   // ✅ Uploaded
    toast.add({ severity:'success', summary:'Uploaded (mock)', life:2000 })
    // Якщо треба прибрати рядок — раскоментуйте:
    // fileUploader.value.clear()
  }, 1000)
}

/* 3. Submit (mock-версія) */
async function mintNFT () {
  if (!form.value.file) {
    toast.add({ severity:'warn', summary:'Upload PDF first', life:3000 })
    return
  }

  loading.value = true
  try {
    await new Promise(r => setTimeout(r, 1500))   // штучна затримка
    toast.add({ severity:'success', summary:'Certificate draft created', life:3000 })
  } finally { loading.value = false }
}
</script>

<style scoped>
/* ⬇️ Не ховаємо content, щоб бачити список. Якщо раптом треба без списку — раскоментуйте
.custom-uploader .p-fileupload-content {
  display: none !important;
}
*/
</style>
