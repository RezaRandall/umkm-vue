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
const errors = ref([]);

//onMounted
onMounted(async () => {
  //fetch detail data post by ID
  await api.get(`/api/umkms/${route.params.id}`).then((response) => {
    //set response data to state
    // first_umkm_img.value = response.data.data.first_umkm_img;
    // second_umkm_img.value = response.data.data.second_umkm_img;
    // third_umkm_img.value = response.data.data.third_umkm_img;

    // first_product_img.value = response.data.data.first_product_img;
    // second_product_img.value = response.data.data.second_product_img;
    // third_product_img.value = response.data.data.third_product_img;

    umkm_name.value = response.data.data.umkm_name;
    description.value = response.data.data.description;
    address.value = response.data.data.address;
    city.value = response.data.data.city;
    province.value = response.data.data.province;
    owner_name.value = response.data.data.owner_name;
    contact.value = response.data.data.contact;
    code.value = response.data.data.code;
    name.value = response.data.data.name;
    price.value = response.data.data.price;
  });
});

//method for handle file changes
const handleFileChange = (e) => {
  //assign file to state
  first_umkm_img.value = e.target.files[0];
  second_umkm_img.value = e.target.files[0];
  third_umkm_img.value = e.target.files[0];

  first_product_img.value = e.target.files[0];
  second_product_img.value = e.target.files[0];
  third_product_img.value = e.target.files[0];
};

//method "updatePost"
const updatePost = async () => {
  //init formData
  let formData = new FormData();

  //assign state value to formData
  formData.append("first_umkm_img", image.value);
  formData.append("second_umkm_img", image.value);
  formData.append("third_umkm_img", image.value);
  formData.append("umkm_name", title.value);
  formData.append("description", title.value);
  formData.append("address", title.value);
  formData.append("city", title.value);
  formData.append("province", title.value);
  formData.append("owner_name", title.value);
  formData.append("contact", title.value);

  formData.append("code", title.value);
  formData.append("name", title.value);
  formData.append("price", title.value);
  formData.append("first_product_img", title.value);
  formData.append("second_product_img", content.value);
  formData.append("third_product_img", content.value);
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
                <input type="file" class="form-control" @change="handleFileChange($event)" />
                <div v-if="errors.first_umkm_img" class="alert alert-danger mt-2">
                  <span>{{ errors.first_umkm_img[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Image 2</label>
                <input type="file" class="form-control" @change="handleFileChange($event)" />
                <div v-if="errors.second_umkm_img" class="alert alert-danger mt-2">
                  <span>{{ errors.second_umkm_img[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Image 3</label>
                <input type="file" class="form-control" @change="handleFileChange($event)" />
                <div v-if="errors.third_umkm_img" class="alert alert-danger mt-2">
                  <span>{{ errors.third_umkm_img[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Nama UMKM</label>
                <input type="text" class="form-control" v-model="umkm_name" placeholder="Nama UMKM" />
                <div v-if="errors.umkm_name" class="alert alert-danger mt-2">
                  <span>{{ errors.umkm_name[0] }}</span>
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
                <input type="text" class="form-control" v-model="owner_name" placeholder="Pemilik" />
                <div v-if="errors.owner_name" class="alert alert-danger mt-2">
                  <span>{{ errors.owner_name[0] }}</span>
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
                <input type="file" class="form-control" @change="handleFileChange($event)" />
                <div v-if="errors.first_product_img" class="alert alert-danger mt-2">
                  <span>{{ errors.first_product_img[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Image Product 2</label>
                <input type="file" class="form-control" @change="handleFileChange($event)" />
                <div v-if="errors.second_product_img" class="alert alert-danger mt-2">
                  <span>{{ errors.second_product_img[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Image Product 3</label>
                <input type="file" class="form-control" @change="handleFileChange($event)" />
                <div v-if="errors.third_product_img" class="alert alert-danger mt-2">
                  <span>{{ errors.third_product_img[0] }}</span>
                </div>
              </div>
              <button type="submit" class="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
