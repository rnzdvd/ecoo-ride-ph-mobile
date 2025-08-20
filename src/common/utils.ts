export function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const formattedMins = mins.toString().padStart(2, "0");
  const formattedSecs = secs.toString().padStart(2, "0");

  return `${formattedMins}m:${formattedSecs}s`;
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

export function getGapSeconds(date: string): number {
  // Convert to Date object
  const pastDate = new Date(date);

  // Get current time
  const now = new Date();

  // Calculate difference in seconds
  const diffSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  return diffSeconds;
}
