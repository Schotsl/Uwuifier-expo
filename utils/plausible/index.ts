import * as Device from 'expo-device';

import { Dimensions } from 'react-native';

const APP_NAME = "uwuifier";
const APP_VERSION = "1.0.0"; 

const TARGET_URL = "https://uwuifier.com";
const TARGET_DOMAIN = "uwuifier.com";

export async function createUserAgent() {
  const deviceBrand = Device.brand;
  const deviceModel = Device.modelName;

  const systemName = Device.osName;
  const systemVersion = Device.osVersion;
  
  return `User-Agent: ${APP_NAME}/${APP_VERSION} (${deviceBrand}; ${systemName} ${systemVersion}; ${deviceModel}; Tablet)`;
}

export default async (event: string = "pageview") => {
  const agent = await createUserAgent();
  const width = Dimensions.get("window").width;

  try {
      const timeout = setTimeout(() => controller.abort(), 5000);
      const controller = new AbortController();

      await fetch(
          "https://plausible.hedium.nl/api/event",
          {
              method: "POST",
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "User-Agent": agent,
              },
              body: JSON.stringify({
                  n: event,
                  d: TARGET_DOMAIN,
                  w: width,
                  u: TARGET_URL,
              }),
              signal: controller.signal,
          }
      );

      clearTimeout(timeout);
  } catch (e) {
      console.log("Couldn't send event to Plausible.")
  }
}
