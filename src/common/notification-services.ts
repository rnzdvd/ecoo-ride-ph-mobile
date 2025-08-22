import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  let token: string | undefined;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token!");
    return undefined;
  }

  try {
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: "5143db7d-87f5-4c01-8f07-57955380006c",
    });
    token = tokenData.data;
  } catch {
    token = "no token";
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
