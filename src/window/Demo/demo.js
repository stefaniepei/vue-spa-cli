/* eslint-disable */
import AutoCatch from "@/decorators/auto_catch";
import Shortcuts from "@/decorators/shortcuts";
import Delay from "@/decorators/delay";
import Time from "@/decorators/time";
import Debounce from "@/decorators/debounce";
import Deprecated from "@/decorators/deprecated";
import NextTick from "@/decorators/next_tick";
import Throttle from "@/decorators/throttle";

import * as ActionTypes from "@/stores/demoStore/type";
import { SET_STATE } from "@/configs/constants";

import _debug from "debug";
const debug = _debug("app:window:demo");

export default {
  name: "demo",
  @Shortcuts({
    notChangeValue: 1
  })
  data: () => ({}),
  computed: {
    test() {
      return this.$store.state.demoStore.test
    },
  },
  methods: {
    // 可以帮助你自动捕获 async 函数中的错误，不需要额外的 then
    @AutoCatch()
    async request() {
      await this.$store.dispatch(ActionTypes.SEND_TEST)
      await this.$store.dispatch(ActionTypes.SEND_TEST2, { name: '123' })
    },

    // 在 800 毫秒内，函数只会被调用一次
    @Debounce(800)
    debounce() {
      debug(this.test);
      this.$store.dispatch(SET_STATE,{key:'test',val:'debounce'})
    },

    // 在 1000 毫秒内最多执行 fn 一次的函数
    @Throttle(1000)
    throttle() {
      debug(this.test);
      this.$store.dispatch(SET_STATE,{key:'test',val:'throttle'})
    },

    // 每次调用函数都会延迟500毫秒
    @Delay(500)
    delay() {
      debug(this.test);
      this.$store.dispatch(SET_STATE,{key:'test',val:'delay'})
    },

    // 统计函数运行的时间
    @Time()
    time() {
      const texts = new Array(200).fill("hello").map(v => `${v} world`);
      debug(texts);
    },

    // 声明一个函数将被废弃。
    @Deprecated()
    deprecatedTestFunc() {},

    // 渲染完成后执行
    @NextTick()
    nextTick() {},

    add() {
      this.notChangeValue = this.notChangeValue + 1;
    },

    refresh() {
      this.$forceUpdate();
    }
  }
};