import { routes } from "./site-types";

export const siteTitleNames: Record<routes, string> = {
  "/": "Random Decision",
  "/weighted": "Weighted Decision",
  "/conditional": "Conditional Decision",
  "/about": "About",
  "/contact": "Contact",
  "/privacy-policy": "Privacy Policy",
  "/terms-of-use": "Terms of Use",
};

export function makeSiteTitle(title: string) {
  if (title == "" || !title) {
    return "MakeMyDecision";
  } else {
    return title + " | MakeMyDecision";
  }
}
