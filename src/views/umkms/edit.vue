<script setup>
//import ref
import { ref, onMounted } from "vue";

//import router
import { useRouter, useRoute } from "vue-router";

//import api
import api from "../../api";

//init router
const router = useRouter();

//init route
const route = useRoute();

//define state
const firstUmkmImg = ref("");
const secondUmkmImg = ref("");
const thirdUmkmImg = ref("");
const umkmName = ref("");
const description = ref("");
const address = ref("");
const city = ref("");
const province = ref("");
const ownerName = ref("");
const contact = ref("");

const firstProductImg = ref("");
const secondProductImg = ref("");
const thirdProductImg = ref("");
const code = ref("");
const name = ref("");
const price = ref("");
const errors = ref([]);

//onMounted
onMounted(async () => {
  //fetch detail data umkm by ID
  await api.get(`/api/umkms/${route.params.id}`).then((response) => {
    //set response data to state
    const data = response.data.data;

    firstUmkmImg.value = data.first_umkm_img;
    secondUmkmImg.value = data.second_umkm_img;
    thirdUmkmImg.value = data.third_umkm_img;

    firstProductImg.value = data.first_product_img;
    secondProductImg.value = data.second_product_img;
    thirdProductImg.value = data.third_product_img;

    umkmName.value = data.umkm_name;
    description.value = data.description;
    address.value = data.address;
    city.value = data.city;
    province.value = data.province;
    ownerName.value = data.owner_name;
    contact.value = data.contact;
    code.value = data.code;
    name.value = data.name;
    price.value = data.price;
  });
});

//method for handle file changes
const handleFileChange = (variableName, e) => {
  switch (variableName) {
    case "firstUmkmImg":
      firstUmkmImg.value = e.target.files[0];
      break;
    case "secondUmkmImg":
      secondUmkmImg.value = e.target.files[0];
      break;
    case "thirdUmkmImg":
      thirdUmkmImg.value = e.target.files[0];
      break;
    case "firstProductImg":
      firstProductImg.value = e.target.files[0];
      break;
    case "secondProductImg":
      secondProductImg.value = e.target.files[0];
      break;
    case "thirdProductImg":
      thirdProductImg.value = e.target.files[0];
      break;
    default:
      break;
  }
};

//method "updatePost"
const updatePost = async () => {
  //init formData
  const formData = new FormData();

  //assign state value to formData
  formData.append("first_umkm_img", firstUmkmImg.value);
  formData.append("second_umkm_img", secondUmkmImg.value);
  formData.append("third_umkm_img", thirdUmkmImg.value);
  formData.append("umkm_name", umkmName.value);
  formData.append("description", description.value);
  formData.append("address", address.value);
  formData.append("city", city.value);
  formData.append("province", province.value);
  formData.append("owner_name", ownerName.value);
  formData.append("contact", contact.value);

  formData.append("code", code.value);
  formData.append("name", name.value);
  formData.append("price", price.value);
  formData.append("first_product_img", firstProductImg.value);
  formData.append("second_product_img", secondProductImg.value);
  formData.append("third_product_img", thirdProductImg.value);
  formData.append("_method", "PATCH");

  //store data with API
  await api
    .post(`/api/umkms/${route.params.id}`, formData)
    .then(() => {
      //redirect
      router.push({ path: "/umkms" });
    })
    .catch((error) => {
      //assign response error data to state "errors"
      errors.value = error.response.data;
    });
};
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h2>UMKM</h2>
            <hr />
            <form @submit.prevent="updatePost()">
              <div class="mb-3">
                <label class="form-label fw-bold">Image 1</label>
                <input type="file" class="form-control" @change="handleFileChange('firstUmkmImg', $event)" />
                <div v-if="errors.firstUmkmImg" class="alert alert-danger mt-2">
                  <span>{{ errors.firstUmkmImg[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Image 2</label>
                <input type="file" class="form-control" @change="handleFileChange('secondUmkmImg', $event)" />
                <div v-if="errors.secondUmkmImg" class="alert alert-danger mt-2">
                  <span>{{ errors.secondUmkmImg[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Image 3</label>
                <input type="file" class="form-control" @change="handleFileChange('thirdUmkmImg', $event)" />
                <div v-if="errors.thirdUmkmImg" class="alert alert-danger mt-2">
                  <span>{{ errors.thirdUmkmImg[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Nama UMKM</label>
                <input type="text" class="form-control" v-model="umkmName" placeholder="Nama UMKM" />
                <div v-if="errors.umkmName" class="alert alert-danger mt-2">
                  <span>{{ errors.umkmName[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Deskripsi</label>
                <textarea class="form-control" v-model="description" rows="5" placeholder="Deskripsi"></textarea>
                <div v-if="errors.description" class="alert alert-danger mt-2">
                  <span>{{ errors.description[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Alamat</label>
                <input type="text" class="form-control" v-model="address" placeholder="Alamat" />
                <div v-if="errors.address" class="alert alert-danger mt-2">
                  <span>{{ errors.address[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Kota</label>
                <input type="text" class="form-control" v-model="city" placeholder="Kota" />
                <div v-if="errors.city" class="alert alert-danger mt-2">
                  <span>{{ errors.city[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Provinsi</label>
                <input type="text" class="form-control" v-model="province" placeholder="Provinsi" />
                <div v-if="errors.province" class="alert alert-danger mt-2">
                  <span>{{ errors.province[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Pemilik</label>
                <input type="text" class="form-control" v-model="ownerName" placeholder="Pemilik" />
                <div v-if="errors.ownerName" class="alert alert-danger mt-2">
                  <span>{{ errors.ownerName[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Kontak</label>
                <input type="text" class="form-control" v-model="contact" placeholder="Kontak" />
                <div v-if="errors.contact" class="alert alert-danger mt-2">
                  <span>{{ errors.contact[0] }}</span>
                </div>
              </div>
              <br />
              <h2>Product</h2>
              <hr />
              <div class="mb-3">
                <label class="form-label fw-bold">Kode</label>
                <input type="text" class="form-control" v-model="code" placeholder="Kode" />
                <div v-if="errors.code" class="alert alert-danger mt-2">
                  <span>{{ errors.code[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Nama</label>
                <input type="text" class="form-control" v-model="name" placeholder="Nama" />
                <div v-if="errors.name" class="alert alert-danger mt-2">
                  <span>{{ errors.name[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Harga</label>
                <input type="text" class="form-control" v-model="price" placeholder="Harga" />
                <div v-if="errors.price" class="alert alert-danger mt-2">
                  <span>{{ errors.price[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Image Product 1</label>
                <input type="file" class="form-control" @change="handleFileChange('firstProductImg', $event)" />
                <div v-if="errors.firstProductImg" class="alert alert-danger mt-2">
                  <span>{{ errors.firstProductImg[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Image Product 2</label>
                <input type="file" class="form-control" @change="handleFileChange('secondProductImg', $event)" />
                <div v-if="errors.secondProductImg" class="alert alert-danger mt-2">
                  <span>{{ errors.secondProductImg[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Image Product 3</label>
                <input type="file" class="form-control" @change="handleFileChange('thirdProductImg', $event)" />
                <div v-if="errors.thirdProductImg" class="alert alert-danger mt-2">
                  <span>{{ errors.thirdProductImg[0] }}</span>
                </div>
              </div>
              <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
              <router-link :to="{ name: 'umkms.index' }" class="btn btn-md btn-danger m-3 rounded-sm shadow border-0" aria-current="page">Cancel</router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
