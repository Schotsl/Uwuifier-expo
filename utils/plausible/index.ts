import { Dimensions } from 'react-native';

import Constants from 'expo-constants';

const TARGET_URL = "https://wanneer-naar-terschelling.nl";
const TARGET_DOMAIN = "wanneer-naar-terschelling.nl";

export default async (event: string = "pageview") => {
  // Fetch the WebView's user-agent string
  const agent = await Constants.getWebViewUserAgentAsync();
  const width = Dimensions.get("window").width;

  console.log(agent)

  // If agent isn't available, don't continue
  if (!agent) {
    console.log('Failed to fetch WebView user-agent.');
    return;
  }

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
