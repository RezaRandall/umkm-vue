<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container">
        <router-link :to="{ name: 'umkms.index' }" class="nav-link active" aria-current="page"><h3>UMKM</h3></router-link>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown" v-if="isAdminLoggedIn">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: #ffffff !important"> Welcome, {{ role }}</a>
            <ul class="dropdown-menu">
              <li>
                <button @click="logout" class="dropdown-item">
                  <i class="fa-solid fa-right-from-bracket"></i>
                  Logout
                </button>
              </li>
            </ul>
          </li>
          <li class="nav-item" v-else>
            <router-link @click="logout" :to="{ name: 'auth.login' }" class="nav-link" style="color: #ffffff !important">Login</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!--- render router view -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const role = ref(localStorage.getItem("role") || "");
const loggedIn = ref(localStorage.getItem("loggedIn") || "");

const logout = async () => {
  // Delete items from local storage
  localStorage.removeItem("role");
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("token");

  // Reset role and loggedIn values
  role.value = "";
  loggedIn.value = "";

  // Redirect to login page
  router.push({ name: "auth.login" });
};

// Monitor changes to loggedIn and roles
watch([loggedIn, role], ([newLoggedIn, newRole]) => {
  isAdminLoggedIn.value = newLoggedIn === "true" && newRole === "admin";
});

const isAdminLoggedIn = ref(loggedIn.value === "true" && role.value === "admin");
</script>
