<template>
  <div class="flex justify-content-center align-items-center min-h-screen p-3">

    <!-- ====== FORM CARD ====== -->
    <Card v-if="!isSuccess" class="w-full md:w-8 surface-card shadow-2">
      <template #title>
        <span class="text-primary font-bold text-lg">Protect Certificate</span>
      </template>

      <template #content>
        <form @submit.prevent="mintNFT" class="flex flex-column gap-3">

          <!-- Public Key -->
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon"><i class="pi pi-key" /></span>
            <InputText v-model="form.publicKey" placeholder="Patient Wallet (Public Key)" required />
          </div>

          <!-- Phone (InputMask) -->
          <div class="p-inputgroup">
            <span class="p-inputgroup-addon"><i class="pi pi-phone" /></span>
            <InputMask v-model="form.phone"
                       mask="+999 999 999 9999"
                       placeholder="+XXX XXX XXX XXXX"
                       required />
          </div>

          <!-- Certificate Type -->
          <Dropdown v-model="form.type"
                    :options="certificateTypes"
                    optionLabel="label"
                    optionValue="value"
                    placeholder="Certificate Type"
                    showClear />

          <!-- Description -->
          <Textarea v-model="form.text"
                    autoResize rows="3"
                    placeholder="Optional Description / Notes" />

          <!-- File Upload (PDF only) -->
          <FileUpload name="pdf"
                      accept="application/pdf"
                      mode="advanced"
                      :auto="false"
                      :multiple="false"
                      chooseLabel="Choose / Drag PDF"
                      @select="onSelect"
                      :customUpload="true"
                      @uploader="noop" />

          <Button type="submit"
                  label="Protect via blockchain"
                  class="w-full p-button-lg p-button-primary" />
        </form>
      </template>
    </Card>

    <!-- ====== SUCCESS DIALOG ====== -->
    <Dialog v-model:visible="isSuccess" modal header="Success" :closable="false">
      <div class="flex flex-column align-items-center text-center gap-3 py-5">
        <i class="pi pi-check-circle text-green-500" style="font-size:4rem" />
        <h3 class="m-0">Draft successfully created</h3>
        <p class="m-0">Once the patient completes the payment, the data will be recorded on the blockchain.</p>
        <Button label="Protect another certificate" @click="resetForm" />
      </div>
    </Dialog>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios     from 'axios'

/* PrimeVue components */
import Card       from 'primevue/card'
import InputText  from 'primevue/inputtext'
import InputMask  from 'primevue/inputmask'
import Dropdown   from 'primevue/dropdown'
import Textarea   from 'primevue/textarea'
import FileUpload from 'primevue/fileupload'
import Button     from 'primevue/button'
import Dialog     from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

/* ---------- state ---------- */
const form = ref({ publicKey:'', phone:'', type:'', text:'', file:null })
const isSuccess      = ref(false)
const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

const certificateTypes = [
  { label:'Medical Certificate',  value:'medical' },
  { label:'Vaccination Proof',    value:'vaccine' },
  { label:'Workplace Clearance',  value:'work'    },
  { label:'School Clearance',     value:'school'  }
]

/* FileUpload handlers */
function onSelect ({ files, options }) {
  const file = files?.[0]
  if (!file || file.type !== 'application/pdf') {
    toast.add({severity:'warn', summary:'Only PDF files allowed', life:3000})
    options.clear()               // прибрати невірний файл з віджету
    return
  }
  form.value.file = file
}
const noop = e => e.options.clear()   // customUpload stub

/* Submit */
async function mintNFT () {
  if (!form.value.file) return toast.add({severity:'warn', summary:'Upload PDF', life:3000})

  try {
    // 1) upload file
    const fd = new FormData()
    fd.append('file', form.value.file)
    const { data:{ ipfs_hash } } = await axios.post(
        `${SERVER_ADDRESS}/v1/ipfs/files`, fd,
        { headers:{ 'Content-Type':'multipart/form-data' } })

    // 2) upload metadata
    const metadata = {
      name:'Medical Certificate', symbol:'MEDCERT',
      description: form.value.text || 'Medical certificate',
      file:`ipfs://${ipfs_hash}`
    }
    const { data:meta } = await axios.post(`${SERVER_ADDRESS}/v1/ipfs/metadata`, metadata)

    // 3) create draft
    await axios.post(`${SERVER_ADDRESS}/v1/nft/draft`, {
      publicKey:    form.value.publicKey,
      phone:        form.value.phone,
      type:         form.value.type,
      metadataHash: meta.ipfs_hash || meta.hash || ''
    })
    isSuccess.value = true
  } catch (err) {
    console.error(err)
    toast.add({severity:'error', summary:'Error creating certificate', life:4000})
  }
}

/* Reset */
function resetForm () {
  form.value = { publicKey:'', phone:'', type:'', text:'', file:null }
  isSuccess.value = false
}
</script>

<style scoped>
/* Можна прибрати, якщо не потрібен кастом */
.surface-card{border-radius:16px}
</style>
