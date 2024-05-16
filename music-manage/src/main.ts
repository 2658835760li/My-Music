import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-plus/dist/index.css";
import "./assets/css/main.css";
import "./assets/icons/iconfont.js";
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { Store } from "vuex";
declare module "@vue/runtime-core" {
  interface State {
    count: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

createApp(App).use(store).use(router).use(ElementPlus,{locale: zhCn}).mount("#app");
