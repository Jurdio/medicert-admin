<template>
  <form @submit.prevent="mintNFT" class="p-fluid flex flex-column gap-3">
    <!-- Public Key -->
    <InputGroup class="p-inputgroup-sm">
      <InputGroupAddon><i class="pi pi-key" /></InputGroupAddon>
      <InputText
          v-model="form.publicKey"
          placeholder="Patient Wallet"
          class="p-input-sm w-full"
          required
      />
    </InputGroup>

    <!-- Phone -->
    <InputGroup class="p-inputgroup-sm">
      <InputGroupAddon><i class="pi pi-phone" /></InputGroupAddon>
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
        style="resize:none;overflow:auto;"
    />

    <!-- File Upload -->
    <FileUpload
        ref="fileUploader"
        name="pdf"
        accept="application/pdf"
        mode="advanced"
        :auto="true"
        :multiple="false"
        :showUploadButton="false"
        :showCancelButton="false"
        @select="onSelect"
        :maxFileSize="10_000_000"
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
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useToast } from 'primevue/usetoast'

/* PrimeVue */
import InputText       from 'primevue/inputtext'
import InputMask       from 'primevue/inputmask'
import Dropdown        from 'primevue/dropdown'
import Textarea        from 'primevue/textarea'
import FileUpload      from 'primevue/fileupload'
import Button          from 'primevue/button'
import InputGroup      from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

/* === state === */
const emit        = defineEmits(['success'])
const toast       = useToast()
const loading     = ref(false)
const fileUploader = ref(null)

const form = ref({
  publicKey: '',
  phone:     '',
  type:      '',
  text:      '',
  file:      null
})

const certificateTypes = [
  { label: 'Medical Certificate', value: 'medical' },
  { label: 'Vaccination Proof',   value: 'vaccine' },
  { label: 'Workplace Clearance', value: 'work'    },
  { label: 'School Clearance',    value: 'school'  }
]

/* === handlers === */
function onSelect ({ files }) {
  const f = files?.[0]
  if (!f || f.type !== 'application/pdf') {
    toast.add({ severity:'warn', summary:'Only PDF files allowed', life:3000 })
    fileUploader.value.clear()
    return
  }
  form.value.file = f
}

async function mintNFT () {
  if (!form.value.file) {
    toast.add({ severity:'warn', summary:'Upload PDF first', life:3000 })
    return
  }
  loading.value = true
  try {
    await new Promise(r => setTimeout(r, 1200))   // fake API
    emit('success')                               // <-- повідомляємо батька
  } finally { loading.value = false }
}
</script>
