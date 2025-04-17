<template>
  <v-app>
    <v-navigation-drawer app permanent>
      <v-list dense>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Doctor Avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">Dr. John Smith</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-list-item link><v-list-item-title>Dashboard</v-list-item-title></v-list-item>
        <v-list-item link><v-list-item-title>Patients</v-list-item-title></v-list-item>
        <v-list-item link><v-list-item-title>History</v-list-item-title></v-list-item>
        <v-list-item link><v-list-item-title>Settings</v-list-item-title></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="pa-6" elevation="3">
              <v-card-title class="text-h5 red--text">Sign a Certificate</v-card-title>
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
                      color="red lighten-1"
                      class="white--text mt-4"
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
    </v-main>
  </v-app>
</template>

<script>
import jsPDF from 'jspdf';

export default {
  data() {
    return {
      form: {
        name: '',
        id: '',
        date: new Date().toISOString().slice(0, 10),
        type: '',
        text: '',
      },
      certificateTypes: [
        'Medical Certificate',
        'Health Statement',
        'School Clearance',
        'Workplace Clearance',
      ],
    };
  },
  methods: {
    generatePDF() {
      const doc = new jsPDF();
      doc.text('Medical Certificate', 10, 10);
      doc.text(`Patient Name: ${this.form.name}`, 10, 20);
      doc.text(`Patient ID: ${this.form.id}`, 10, 30);
      doc.text(`Issue Date: ${this.form.date}`, 10, 40);
      doc.text(`Type: ${this.form.type}`, 10, 50);
      doc.text(`Conclusion:`, 10, 60);
      doc.text(this.form.text, 10, 70);
      doc.save(`${this.form.name}_certificate.pdf`);
    },
  },
};
</script>

<style scoped>
.v-application {
  background: linear-gradient(to right, #fce4ec, #f8bbd0);
  color: #333;
}
</style>
