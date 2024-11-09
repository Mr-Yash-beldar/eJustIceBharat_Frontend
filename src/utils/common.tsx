export const json_verify = (s: string): boolean => {
  try {
    JSON.parse(s);
    return true;
  } catch (e) {
    return false;
  }
};

interface Stats {
  packetsLost: number;
  totalPackets: number;
  jitter: number;
  rtt: number;
}

export function getQualityScore(stats: Stats): number {
  const packetLossPercent = stats.packetsLost / stats.totalPackets || 0;
  const jitter = stats.jitter;
  const rtt = stats.rtt;
  let score = 100;

  // Reduce score based on packet loss
  score -= packetLossPercent * 50 > 50 ? 50 : packetLossPercent * 50;

  // Reduce score based on jitter
  score -= (jitter / 30) * 25 > 25 ? 25 : (jitter / 30) * 25 || 0;

  // Reduce score based on RTT (Round Trip Time)
  score -= (rtt / 300) * 25 > 25 ? 25 : (rtt / 300) * 25 || 0;

  return score / 10;
}

export function formatAMPM(date: Date): string {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12; // Convert hour '0' to '12'

  // Ensure minutes are formatted as a two-digit string (e.g., '09' instead of '9')
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

  return `${hours}:${formattedMinutes} ${ampm}`;
}

export const trimSnackBarText = (text: string = ''): string => {
  const maxLength = 52;
  return text.length > maxLength ? `${text.substr(0, maxLength - 5)}...` : text;
};

export const nameTructed = (name: string, truncatedLength: number): string => {
  if (name?.length > truncatedLength) {
    return `${name.substr(0, truncatedLength)}...`;
  } else {
    return name;
  }
};

export const sideBarModes = {
  PARTICIPANTS: 'PARTICIPANTS',
  CHAT: 'CHAT',
};

export function debounce(
  func: Function,
  wait: number,
  immediate: boolean,
): Function {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(this: any, ...args: any[]) {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout as NodeJS.Timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
