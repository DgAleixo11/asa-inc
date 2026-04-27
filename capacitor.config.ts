import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.asainc.app",
  appName: "ASA Inc.",
  webDir: "out",
  server: {
    /**Colocar a URL do site quando publicar*/
       url: "https://SEU-SITE-PUBLICADO",
    cleartext: true,
  },
};

export default config;