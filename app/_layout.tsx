import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import { tokenCache } from "@/utils/cache";
import { StatusBar } from "react-native";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://598c355f2656ca698c722702925ef7e7@o4509133560741888.ingest.us.sentry.io/4509133704790016",
  enableInExpoDevelopment: true,
  debug: true,
});

function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }

  // Force a native crash for testing
  Sentry.nativeCrash();

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider value={DarkTheme}>
          <Slot />
          <StatusBar barStyle="light-content" backgroundColor="black" />
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

export default Sentry.wrap(RootLayout);