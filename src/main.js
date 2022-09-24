import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

import Toaster from '@meforma/vue-toaster'

const app =
	createApp(App)
	.use(store)
	.use(router)
	.use(Toaster)

app.mount("#app");
