<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-6 gradient-card" elevation="3">
          <v-card-title class="text-h5 text-indigo-900">Sign a Certificate</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="generatePDF">
              <v-text-field v-model="form.name" label="Patient Name" outlined required></v-text-field>
              <v-text-field v-model="form.id" label="Patient ID" outlined required></v-text-field>
              <v-text-field v-model="form.date" label="Issue Date" outlined required></v-text-field>
              <v-select
                  v-model="form.type"
                  :items="certificateTypes"
                  label="Certificate Type"
                  outlined
                  required
              ></v-select>
              <v-textarea
                  v-model="form.text"
                  label="Conclusion / Certificate Text"
                  outlined
                  required
              ></v-textarea>
              <v-btn
                  class="mt-4 gradient-btn"
                  type="submit"
              >
                Sign and Save as PDF
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
import jsPDF from 'jspdf';

const form = ref({
  name: '',
  id: '',
  date: new Date().toISOString().slice(0, 10),
  type: '',
  text: '',
});

const certificateTypes = [
  'Medical Certificate',
  'Health Statement',
  'School Clearance',
  'Workplace Clearance',
];

function generatePDF() {
  const doc = new jsPDF();
  doc.text('Medical Certificate', 10, 10);
  doc.text(`Patient Name: ${form.value.name}`, 10, 20);
  doc.text(`Patient ID: ${form.value.id}`, 10, 30);
  doc.text(`Issue Date: ${form.value.date}`, 10, 40);
  doc.text(`Type: ${form.value.type}`, 10, 50);
  doc.text('Conclusion:', 10, 60);
  doc.text(form.value.text, 10, 70);
  doc.save(`${form.value.name}_certificate.pdf`);
}
</script>

<style scoped>
.gradient-card {
  background: linear-gradient(135deg, #ffffff, #e0f2f1);
  border-radius: 16px;
}
.gradient-btn {
  background: linear-gradient(90deg, #6366f1, #4f46e5);
  color: white;
}
</style>
