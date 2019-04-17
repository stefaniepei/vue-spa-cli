import StorageService from "@/services/storageService";
import _debug from "debug";
const debug = _debug("app:pc:image");

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
    this.$message.error("image mounted");
  },
  computed: {
    getImgSrc() {
      return this.$store.state.imageStore.imgSrc;
    }
  }
};
