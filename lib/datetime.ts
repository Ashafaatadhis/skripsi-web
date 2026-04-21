export const APP_TIME_ZONE = "Asia/Jakarta";

export function formatAppDate(value: string | Date | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeZone: APP_TIME_ZONE,
  }).format(new Date(value));
}

export function formatAppDateTime(value: string | Date | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: APP_TIME_ZONE,
  }).format(new Date(value));
}
