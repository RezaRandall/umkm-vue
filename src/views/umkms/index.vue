<script setup>
//import ref and onMounted
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

//import api
import api from "../../api";

//define state
const umkms = ref([]);
const router = useRouter();

//method fetchDataUmkms
const fetchDataUmkms = async () => {
  //fetch data
  await api.get("/api/umkms").then((response) => {
    //set response data to state "umkm"
    umkms.value = response.data.data.data;
  });
};

//run hook "onMounted"
onMounted(() => {
  //call method "fetchDataUmkms"
  fetchDataUmkms();
});

//method deletePost
const deleteUmkm = async (id) => {
  //delete post with API
  await api.delete(`/api/umkms/${id}`).then(() => {
    //call method "fetchDataPosts"
    fetchDataUmkms();
  });
};

// redirect to details method
const redirecToDetail = (id) => {
  router.push({ name: "umkms.detail", params: { id } });
};

//method redirectToEdit
const redirectToEdit = (id) => {
  router.push({ name: "umkms.edit", params: { id } });
};
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-12">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <router-link :to="{ name: 'umkms.create' }" class="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW UMKM</router-link>
        </div>
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <table class="table table-bordered">
              <thead class="bg-dark text-white">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Nama UMKM</th>
                  <th scope="col">Deskripsi</th>
                  <th scope="col">Address</th>
                  <th scope="col">Kota</th>
                  <th scope="col">Provinsi</th>
                  <th scope="col">Pemilik</th>
                  <th scope="col">Contact</th>
                  <th scope="col" style="width: 15%">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="umkms.length == 0">
                  <td colspan="9" class="text-center">
                    <div class="alert alert-danger mb-0">Data Belum Tersedia!</div>
                  </td>
                </tr>
                <tr v-else v-for="(umkm, index) in umkms" :key="index" @click="redirecToDetail(umkm.id)" style="cursor: pointer">
                  <td class="text-center">
                    <img :src="umkm.first_umkm_img" width="200" class="rounded-3" />
                  </td>
                  <td>{{ umkm.umkm_name }}</td>
                  <td>{{ umkm.description }}</td>
                  <td>{{ umkm.address }}</td>
                  <td>{{ umkm.city }}</td>
                  <td>{{ umkm.province }}</td>
                  <td>{{ umkm.owner_name }}</td>
                  <td>{{ umkm.contact }}</td>
                  <td class="text-center">
                    <button @click.prevent.stop="redirectToEdit(umkm.id)" class="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</button>
                    <button @click.prevent.stop="deleteUmkm(umkm.id)" class="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
