import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.asainc.app",
  appName: "ASA Inc.",
  webDir: "out",
  bundledWebRuntime: false,
  server: {
    /**Colocar a URL do site quando publicar*/
    url: "https://asa-inc.vercel.app",
    cleartext: true,
  },
};

export default config;