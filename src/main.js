//import createApp from Vue
import { createApp } from "vue";

//import component App
import App from "./App.vue";

//import config router
import router from "./router/index";

//create App Vue
const app = createApp(App);

//use "router" in Vue with "use" plugin
app.use(router);

app.mount("#app");
