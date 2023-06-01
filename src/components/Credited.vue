<template>
  <h1>Olá Amigo, você tem</h1>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <div class="d-flex justify-center">
          <v-card width="200px" class="mr-4">
            <v-card-title
              class="text-h6 text-md-h5 text-lg-h4 d-flex justify-center"
              >Créditos</v-card-title
            >
            <v-card-text class="text-lg-h6 d-flex justify-center">
              0,00
            </v-card-text>
          </v-card>

          <v-card width="250px" class="mr-4">
            <v-card-title
              class="text-h6 text-md-h5 text-lg-h4 d-flex justify-center"
              >Cred Promo</v-card-title
            >
            <v-card-text class="text-lg-h6 d-flex justify-center">
              0,00
            </v-card-text>
          </v-card>

          <v-card width="200px" class="mr-4">
            <v-card-title
              class="text-h6 text-md-h5 text-lg-h4 d-flex justify-center"
              >Bônus</v-card-title
            >
            <v-card-text class="text-lg-h6 d-flex justify-center">
              0,00
            </v-card-text>
          </v-card>

          <v-card width="200px">
            <v-card-title
              class="text-h6 text-md-h5 text-lg-h4 d-flex justify-center"
              >Tickets</v-card-title
            >
            <v-card-text class="text-lg-h6 d-flex justify-center">
              0
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h1 {
  text-align: center;
  font-size: 50px;
  font-family: 'Open Sans', sans-serif;
}

v.card {
  background-color: red;
}
</style>
