/* eslint-disable */
import AutoCatch from "../../decorators/auto_catch";
import Shortcuts from "../../decorators/shortcuts";
import Delay from "../../decorators/delay";
import Time from "../../decorators/time";
import Debounce from "../../decorators/debounce";
import Deprecated from "../../decorators/deprecated";
import NextTick from "../../decorators/next_tick";
import Throttle from "../../decorators/throttle";

import * as ActionTypes from "../../stores/demoStore/type";
import { SET_STATE } from "../../configs/constants";

import _debug from "debug";
const debug = _debug("app:Views:Demo");

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
    @AutoCatch()
    async request() {
      await this.$store.dispatch(ActionTypes.SEND_TEST)
      await this.$store.dispatch(ActionTypes.SEND_TEST2, { name: '123' })
    },

    @Debounce(800)
    debounce() {
      debug(this.test);
      this.$store.dispatch(SET_STATE,{key:'test',val:'debounce'})
    },

    @Throttle(1000)
    throttle() {
      debug(this.test);
      this.$store.dispatch(SET_STATE,{key:'test',val:'throttle'})
    },

    @Delay(500)
    delay() {
      debug(this.test);
      this.$store.dispatch(SET_STATE,{key:'test',val:'delay'})
    },

    @Time()
    time() {
      const texts = new Array(200).fill("hello").map(v => `${v} world`);
      debug(texts);
    },

    @Deprecated()
    deprecatedTestFunc() {},

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