import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.asainc.app",
  appName: "ASA Inc.",
  webDir: "out",
  server: {
    url: "https://asa-inc.vercel.app",
    cleartext: true,
  },
};

export default config;