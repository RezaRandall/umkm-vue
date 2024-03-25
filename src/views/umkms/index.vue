<script setup>
//import ref and onMounted
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

//import api
import api from "../../api";

//define state
const umkms = ref([]);
const router = useRouter();

const role = ref(localStorage.getItem("role"));
const loggedIn = ref(localStorage.getItem("loggedIn"));

// define state search
const searchQuery = ref("");

//method fetchDataUmkms
const fetchDataUmkms = async () => {
  //fetch data
  await api.get("/api/index").then((response) => {
    //set response data to state "umkm"
    umkms.value = response.data.data;
  });
};

//run hook "onMounted"
onMounted(() => {
  //call method "fetchDataUmkms"
  fetchDataUmkms();
});

//method deletePost
const deleteUmkm = async (id) => {
  // Retrieve authentication token from localStorage
  const token = localStorage.getItem("token");

  // Configure the header to include the authentication token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //delete post with API
  await api
    .delete(`/api/umkms/${id}`, config)
    .then(() => {
      //call method "fetchDataPosts"
      fetchDataUmkms();
    })
    .catch((error) => {
      console.error("Error deleting UMKM:", error);
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

// method searchUmkms
const searchUmkms = () => {
  if (!searchQuery.value.trim()) {
    // If the search input is empty, displays all data
    fetchDataUmkms();
  } else {
    // If the search input is not empty, filter the data according to the search input
    umkms.value = umkms.value.filter((umkm) => {
      return (
        umkm.umkm_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        umkm.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        umkm.address.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        umkm.city.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        umkm.province.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        umkm.owner_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        umkm.contact.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
  }
};
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-12">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <router-link v-if="role === 'admin' && loggedIn === 'true'" :to="{ name: 'umkms.create' }" class="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW UMKM</router-link>
        </div>
        <div>
          <input type="text" v-model="searchQuery" @input="searchUmkms" placeholder="Search..." class="form-control mb-3" />
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
                  <th v-if="role === 'admin' && loggedIn === 'true'" scope="col" style="width: 15%">Actions</th>
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
                  <td v-if="role === 'admin' && loggedIn === 'true'" class="text-center">
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
