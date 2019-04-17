import StorageService from "@/services/storageService";
import SocketService from "@/services/socketService";
import AutoCatch from "@/decorators/auto_catch";
import * as ActionTypes from "@/stores/imageStore/type";
import chatBubble from "@/components/chatBubble/chatBubble.vue";

import _debug from "debug";
const debug = _debug("app:mobile:home");

export default {
  name: "mobile-home",
  components: {
    chatBubble
  },
  mounted() {
    this.openImg("https://www.baidu.com/img/bd_logo1.png");
    this.initSocket();
  },
  methods: {
    openImg(src) {
      this.$store.dispatch(ActionTypes.SET_IMG_SRC, src);
      StorageService.setItem("src", src);
      this.$message.error("openImg click");
    },
    @AutoCatch
    initSocket() {
      const wb = new SocketService({
        url:
          "ws?token=NGY5NmQ2MzkxMjdlNDVlODNjNTQ0ZDMwMzgwOTE5MzM%253D&workTypeId=100125812760125440",
        onOpenFn: this.onOpenFn,
        onMessageFn: this.receiveMsg,
        onErrorFn: this.onErrorFn,
        onCloseFn: this.onCloseFn
      });

      debug({ wb }, "HomePage");
    },
    receiveMsg(ev) {
      debug(ev);
    }
  }
};
