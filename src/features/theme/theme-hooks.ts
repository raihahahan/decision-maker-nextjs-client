import { createStyles } from "@mantine/core";
import { useSelector } from "react-redux";
import { colorTheme, siteColors } from "../../features/theme/theme-data";
import { Theme } from "../../features/theme/theme-types";
import { selectTheme } from "./theme-slice";
import { useMediaQuery } from "@mantine/hooks";
import { breakpoints } from "../../features/theme/theme-data";
import { globalMediaQueriesType } from "../../features/theme/theme-types";

export default function useTheme() {
  const theme: Theme = useSelector(selectTheme);

  const stylesFunc = createStyles((theme) => ({
    navbar: {
      [theme.fn.largerThan("sm")]: {
        display: "none",
      },
    },
    links: {
      [theme.fn.smallerThan("sm")]: {
        display: "none",
      },
    },
  }));

  const { classes } = stylesFunc();
  const colors = siteColors(theme);
  const myColorTheme = colorTheme[theme];

  return {
    siteColors: colors,
    colorTheme: myColorTheme,
    classes,
    themeState: theme as Theme,
  };
}

export function useGlobalMediaQuery(): globalMediaQueriesType {
  const xs = useMediaQuery(`(max-width: ${breakpoints.xs}px)"`);
  const sm = useMediaQuery(`(max-width: ${breakpoints.sm}px)`);
  const md = useMediaQuery(`(max-width: ${breakpoints.md}px)`);
  const lg = useMediaQuery(`(max-width: ${breakpoints.lg}px)`);
  const xl = useMediaQuery(`(max-width: ${breakpoints.xl}px)`);

  return { xs, sm, md, lg, xl };
}
