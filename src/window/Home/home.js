import { ipcRenderer } from "electron";
import StorageService from "@/services/storageService";
import * as ActionTypes from "@/stores/imageStore/type";
import chatBubble from "@/components/chatBubble/chatBubble.vue";
export default {
  name: "window-home",
  components: {
    chatBubble
  },
  methods: {
    /**
     * @author peijunke
     * @param {String} src 图片URL
     */
    openImg(src) {
      this.$store.dispatch(ActionTypes.SET_IMG_SRC, src);
      StorageService.setItem("src", src);
      ipcRenderer.send("main-image", src);
      this.$message.error("openImg click");
    }
  }
};
