<script setup>
//import ref
import { ref, onMounted } from "vue";

//import router
import { useRouter, useRoute } from "vue-router";

//import api
import api from "../../api";

//init route
const route = useRoute();

//define state
const first_umkm_img = ref("");
const second_umkm_img = ref("");
const third_umkm_img = ref("");
const umkm_name = ref("");
const description = ref("");
const address = ref("");
const city = ref("");
const province = ref("");
const owner_name = ref("");
const contact = ref("");

const first_product_img = ref("");
const second_product_img = ref("");
const third_product_img = ref("");
const code = ref("");
const name = ref("");
const price = ref("");
const mainImageUmkm = ref("");
const mainImageProduct = ref("");

onMounted(async () => {
  //fetch detail data umkm by ID

  const response = await api.get(`/api/detail/${route.params.id}`);
  const data = response.data;

  first_umkm_img.value = data.first_umkm_img;
  second_umkm_img.value = data.second_umkm_img;
  third_umkm_img.value = data.third_umkm_img;

  umkm_name.value = data.umkm_name;
  description.value = data.description;
  address.value = data.address;
  city.value = data.city;
  province.value = data.province;
  owner_name.value = data.owner_name;
  contact.value = data.contact;

  first_product_img.value = data.first_product_img;
  second_product_img.value = data.second_product_img;
  third_product_img.value = data.third_product_img;
  code.value = data.code;
  name.value = data.name;
  price.value = data.price;

  mainImageUmkm.value = data.first_umkm_img;
  mainImageProduct.value = data.first_product_img;
});

const changeMainUmkm = (img) => {
  mainImageUmkm.value = img; // Change the main image source to the hovered thumbnail image
};

const changeMainProduct = (img) => {
  mainImageProduct.value = img; // Change the main image source to the hovered thumbnail image
};
</script>

<template>
  <!-- UMKM -->
  <div class="product-display">
    <h3>UMKM Profile</h3>
    <div class="product-container">
      <div class="product-image">
        <img :src="mainImageUmkm" class="main-product-image" />
      </div>
      <div class="product-info">
        <h1>{{ umkm_name }}</h1>
        <p>Deskripsi: {{ description }}</p>
        <p>Alamat: {{ address }}</p>
        <p>Kota: {{ city }}</p>
        <p>Provinsi: {{ province }}</p>
        <p>Nama Pemilik: {{ owner_name }}</p>
        <p>No Hp: {{ contact }}</p>
      </div>
      <div class="row">
        <div v-for="(img, index) in [first_umkm_img, second_umkm_img, third_umkm_img]" :key="index" class="column" style="width: 8%">
          <img :src="img" class="rounded-3 thumbnail-image" @mouseover="changeMainUmkm(img)" />
        </div>
      </div>
    </div>
  </div>

  <!-- PRODUCT -->
  <hr />
  <div class="product-display">
    <h3>Product</h3>
    <div class="product-container">
      <div class="product-image">
        <img :src="mainImageProduct" class="main-product-image" />
      </div>
      <div class="product-info">
        <h1>{{ name }}</h1>
        <p>Code: {{ code }}</p>
        <p>Price: {{ price }}</p>
      </div>
      <div class="row">
        <div v-for="(img, index) in [first_product_img, second_product_img, third_product_img]" :key="index" class="column" style="width: 8%">
          <img :src="img" class="rounded-3 thumbnail-image" @mouseover="changeMainProduct(img)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.main-product-image,
.thumbnail-image {
  width: 70%; /* Set image width to 70% */
  height: auto; /* Set the image height to automatic so that it is proportional */
  border: 2px solid #b4b4b4;
  margin-bottom: 10px; /* Set the distance between thumbnail images */
}

.main-product-image {
  max-height: 300px;
}

h1 {
  font-size: 50px;
}

h3 {
  font-size: 25px;
}

img {
  border: 2px solid #d8d8d8;
  padding: 15px;
  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
}

p {
  font-size: 22px;
}

.product-display {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.product-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.product-image {
  width: 50%;
}

@media only screen and (max-width: 768px) {
  .product-container {
    flex-direction: column;
  }

  .product-image,
  .product-info {
    margin-left: 100px;
    width: 100%;
  }
}
</style>
