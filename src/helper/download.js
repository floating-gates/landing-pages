import { download_center_url } from "../config.js";

// Direct redirect to login page on click
export function handleDownloadClick() {
  window.location.href = download_center_url;
}
