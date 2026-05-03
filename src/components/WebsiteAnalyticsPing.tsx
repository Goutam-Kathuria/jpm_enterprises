import { useEffect } from "react";
import { trackWebsitePageView } from "../lib/websiteApi";

const SESSION_KEY = "jpm_pv_tracked";

export function WebsiteAnalyticsPing() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      return;
    }

    void trackWebsitePageView(window.location.pathname || "/");
  }, []);

  return null;
}
