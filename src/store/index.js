import { createStore } from "vuex";
import { HomeModule } from "@/store/HomeModule.js";

export default createStore({
    modules: {
        home: HomeModule,
    }
})