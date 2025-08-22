import Toast from "react-native-toast-message";

export function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const formattedMins = mins.toString().padStart(2, "0");
  const formattedSecs = secs.toString().padStart(2, "0");

  return `${formattedMins}m:${formattedSecs}s`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr.replace(" ", "T")); // ensure valid ISO format

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
}

// sample usage calculateChargeAmount(1000, 0.023);
export function calculateChargeAmount(
  targetNet: number,
  percentageFee: number,
  flatFee: number = 0
): number {
  const amount = (targetNet + flatFee) / (1 - percentageFee);
  return Math.ceil(amount); // Always round up to nearest peso
}

export function codeStatusChecker(status?: number): boolean {
  if (status) {
    return status >= 200 && status < 300;
  } else {
    return false;
  }
}

export function getGapSeconds(startDate: string, endDate?: string): number {
  // Convert to Date object
  const pastDate = new Date(startDate);

  // Get current time
  let now = new Date();

  if (endDate) {
    now = new Date(endDate);
  }

  // Calculate difference in seconds
  const diffSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  return diffSeconds;
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function showToast(
  title: string,
  description: string,
  type: "success" | "error" | "warning" | "info"
): void {
  Toast.show({
    text1: title,
    text2: description,
    type: "customToast",
    props: {
      status: type,
    },
  });
}
