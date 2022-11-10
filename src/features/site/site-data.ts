import { anchorTitles, routes } from "./site-types";

const anchorData: { title: anchorTitles; anchorRoute: routes }[] = [
  { title: "", anchorRoute: "/" },
  { title: "Random", anchorRoute: "/random" },
  {
    title: "Weighted",
    anchorRoute: "/weighted",
  },
  {
    title: "Conditional",
    anchorRoute: "/conditional",
  },
];

export default anchorData;

export const footerData: { title: anchorTitles; anchorRoute: routes }[] = [
  {
    title: "M.Raihan" as any,
    anchorRoute: "https://mraihan.vercel.app",
  },
  {
    title: "Github" as any,
    anchorRoute: "https://www.github.com/raihahahan" as any,
  },
  {
    title: "mraihandev@gmail.com" as any,
    anchorRoute: "mailto:mraihandev@gmail.com" as any,
  },

  {
    title: "Privacy Policy",
    anchorRoute: "/privacy-policy",
  },
];
