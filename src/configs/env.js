const env = process.env.VUE_APP_ENV || "development";
const mode = process.env.VUE_APP_MODE || "web";
// api host
const apiHost = {
  production: "http://api.prod.com",
  test: "http://api.test.com",
  development: "http://api.dev.com"
};

const wsHost = {
  production: "ws://api.prod.com",
  test: "ws://api.test.vip",
  development: "ws://api.dev.vip"
};

class Env {
  static get DEFAULT() {
    return {
      ENV: env,
      MODE: mode,
      HTTP_API: apiHost[env],
      WS_API: wsHost[env]
    };
  }
}
export default Env;
