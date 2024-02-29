// msalConfig.js
import { PublicClientApplication, LogLevel } from "@azure/msal-react-native-android";
import AsyncStorage from "@react-native-async-storage/async-storage";

const msalConfig = {
  auth: {
    clientId: keys.clientId,
    authority: `https://login.microsoftonline.com/${keys.tenantId}`,
    redirectUri: "exp://192.168.4.143:8081", // Make sure this matches the one in Azure AD and keys.json
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false, // set to true if you are using cookies
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        console.log("MSAL Log", message);
      },
      logLevel: LogLevel.Info,
    },
  },
};

export const pca = new PublicClientApplication(msalConfig);
