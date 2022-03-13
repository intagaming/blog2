/**
 * https://stackoverflow.com/a/2587398
 * Parse a date in yyyy-mm-dd format
 */
export function parseDate(input: string) {
  const parts = input.split("-");
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(
    parseInt(parts[0], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[2], 10)
  ); // Note: months are 0-based
}

export function isRemoteURL(url: string) {
  const r = /^(?:[a-z]+:)?\/\//i;
  return r.test(url);
}

/**
 * - images/a.jpg
 * - /images/a.jpg
 * => https://url/images/a.jpg
 */
export function getResourceRemoteURL(path: string) {
  const parts = path.split("/");
  if (parts[0] === "") parts.shift();

  const domainUrl =
    process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:3000";

  return `${domainUrl}/${parts.join("/")}`;
}
