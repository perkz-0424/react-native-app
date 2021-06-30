export function objToQueryString(obj) {
  const arr = [];
  const keys = Object.keys(obj).filter(k => obj[k] !== undefined && obj[k] !== null);
  keys.forEach((k) => {
    arr.push(`${k}=${encodeURIComponent(obj[k])}`);
  });
  if (arr.length === 0) {
    return '';
  }
  return `?${arr.join('&')}`;
}
