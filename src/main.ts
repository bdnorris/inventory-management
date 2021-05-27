import { createApp, h, provide } from "vue";
import App from "./App.vue";
import store from "./store/index";

const app = createApp({
  setup() {
    // provide(ApolloClients, {
    //   default: apolloClient,
    // });
  },
  render: () => h(App),
})

app.use(store)
app.mount("#app")