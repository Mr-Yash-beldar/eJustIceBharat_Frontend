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
  score -= packetLossPercent * 50 > 50 ? 50 : packetLossPercent * 50;
  score -= ((jitter / 30) * 25 > 25 ? 25 : (jitter / 30) * 25) || 0;
  score -= ((rtt / 300) * 25 > 25 ? 25 : (rtt / 300) * 25) || 0;
  return score / 10;
}

export function formatAMPM(date: Date): string {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export const trimSnackBarText = (text: string = ""): string => {
  const maxLength = 52;
  return text.length > maxLength ? `${text.substr(0, maxLength - 5)}...` : text;
};

export const nameTructed = (name: string, tructedLength: number): string => {
  if (name?.length > tructedLength) {
    if (tructedLength === 15) {
      return `${name.substr(0, 12)}...`;
    } else {
      return `${name.substr(0, tructedLength)}...`;
    }
  } else {
    return name;
  }
};

export const sideBarModes = {
  PARTICIPANTS: "PARTICIPANTS",
  CHAT: "CHAT",
} as const;

export function debounce(
  func: (...args: any[]) => void,
  wait: number,
  immediate: boolean
): (...args: any[]) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(this: any, ...args: any[]) {
    const context = this;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}
