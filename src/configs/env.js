const env = process.env.VUE_APP_ENV || "development";
const mode = process.env.VUE_APP_MODE || "web";
// api host
const apiHost = {
  production: "http://api.prod.com",
  test: "http://test-im-gateway.runx.vip",
  development: "http://dev-im-gateway.runx.vip"
};

const wsHost = {
  production: "ws://api.prod.com",
  test: "ws://test-im-gateway.runx.vip",
  development: "ws://dev-im-gateway.runx.vip"
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
