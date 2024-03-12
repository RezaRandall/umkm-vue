<script setup>
//import ref
import { ref } from "vue";

//import router
import { useRouter } from "vue-router";

//import api
import api from "../../api";

//init router
const router = useRouter();

//define state
const imageUmkm1 = ref("");
const imageUmkm2 = ref("");
const imageUmkm3 = ref("");
const umkmName = ref("");
const description = ref("");
const address = ref("");
const city = ref("");
const province = ref("");
const ownerName = ref("");
const contact = ref("");

const code = ref("");
const name = ref("");
const price = ref("");
const imageProduct1 = ref("");
const imageProduct2 = ref("");
const imageProduct3 = ref("");
const errors = ref([]);

//method for handle file changes
const handleFileChange = (e) => {
  //assign file to state
  imageUmkm1.value = e.target.files[0];
  imageUmkm2.value = e.target.files[0];
  imageUmkm3.value = e.target.files[0];
  imageProduct1.value = e.target.files[0];
  imageProduct2.value = e.target.files[0];
  imageProduct3.value = e.target.files[0];
};

//method "storePost"
const storePost = async () => {
  //init formData
  let formData = new FormData();

  formData.append("first_umkm_img", imageUmkm1.value);
  formData.append("second_umkm_img", imageUmkm2.value);
  formData.append("third_umkm_img", imageUmkm3.value);
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
  formData.append("first_product_img", imageProduct1.value);
  formData.append("second_product_img", imageProduct2.value);
  formData.append("third_product_img", imageProduct3.value);

  //store data with API
  await api
    .post("/api/umkms", formData)
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
            <form @submit.prevent="storePost()">
              <div class="mb-3">
                <label class="form-label fw-bold">Image 1</label>
                <input type="file" class="form-control" @change="handleFileChange($event)" />
                <div v-if="errors.imageUmkm1" class="alert alert-danger mt-2">
                  <span>{{ errors.imageUmkm1[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Image 2</label>
                <input type="file" class="form-control" @change="handleFileChange($event)" />
                <div v-if="errors.imageUmkm2" class="alert alert-danger mt-2">
                  <span>{{ errors.imageUmkm2[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Image 3</label>
                <input type="file" class="form-control" @change="handleFileChange($event)" />
                <div v-if="errors.imageUmkm2" class="alert alert-danger mt-2">
                  <span>{{ errors.imageUmkm2[0] }}</span>
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
                <input type="file" class="form-control" @change="handleFileChange($event)" />
                <div v-if="errors.imageProduct1" class="alert alert-danger mt-2">
                  <span>{{ errors.imageProduct1[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Image Product 2</label>
                <input type="file" class="form-control" @change="handleFileChange($event)" />
                <div v-if="errors.imageProduct2" class="alert alert-danger mt-2">
                  <span>{{ errors.imageProduct2[0] }}</span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Image Product 3</label>
                <input type="file" class="form-control" @change="handleFileChange($event)" />
                <div v-if="errors.imageProduct3" class="alert alert-danger mt-2">
                  <span>{{ errors.imageProduct3[0] }}</span>
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
