import { routes } from "./site-types";

export const siteTitleNames: Record<routes, string> = {
  "/": "",
  "/random": "Random Decision",
  "/random/create": "Create Random Decision",
  "/weighted": "Weighted Decision",
  "/weighted/create": "Create Weighted Decision",
  "/conditional": "Conditional Decision",
  "/conditional/create": "Create Conditional Decision",
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
