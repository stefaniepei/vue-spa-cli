import { ipcRenderer } from "electron";
import StorageService from "@/services/storageService";
import _debug from "debug";
const debug = _debug("app:window:image");

export default {
  data() {
    return {
      imgSrc: ""
    };
  },
  mounted() {
    debug(this.$store.state);
    // 方法一（通过vuex通讯）
    this.imgSrc = this.getImgSrc;
    // 方法二（通过localStorage通讯）
    const imgSrc = StorageService.getItem("src") || "";
    debug(this.getImgSrc + " | " + imgSrc);
    // 方法三（主进程和渲染进程都需要编码，类似发布订阅）
    ipcRenderer.on("render-image", (event, arg) => {
      debug(arg);
      this.$message.error("render-image");
      // this.imgSrc = arg;
    });
    this.$message.error("image mounted");
  },
  computed: {
    getImgSrc() {
      return this.$store.state.imageStore.imgSrc;
    }
  }
};
