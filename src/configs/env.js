const env = process.env.NODE_ENV || "development";
// api host
const apiHost = {
  production: "https://api.prod.com",
  test: "https://api.test.com",
  development: "https://api.dev.com"
};

const wsHost = {
  production: "ws://api.prod.com",
  test: "ws://api.test.com",
  development: "ws://api.dev.com"
};

class Env {
  static get DEFAULT() {
    return {
      ENV: env,
      HTTP_API: apiHost[env],
      WS_API: wsHost[env]
    };
  }
}
export default Env;
