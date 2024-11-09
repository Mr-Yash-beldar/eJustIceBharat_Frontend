// TypeScript version of the provided functions

export const trimSnackBarText = (text: string = ''): string => {
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

export const json_verify = (s: string): boolean => {
  try {
    JSON.parse(s);
    return true;
  } catch (e) {
    return false;
  }
};

export function formatAMPM(date: Date): string {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  // Ensure minutes are a two-digit string
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
  return `${hours}:${formattedMinutes} ${ampm}`;
}
