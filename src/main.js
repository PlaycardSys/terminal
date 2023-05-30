import { createApp } from "vue";
import "./styles.css";
import router from "./router";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";

createApp(App)
    .use(vuetify)
    .use(router)
    .mount("#app");
