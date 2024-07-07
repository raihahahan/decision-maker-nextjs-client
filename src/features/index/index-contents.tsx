import RectangleTitle from "../../common/components/branding";
import useTheme, { useGlobalMediaQuery } from "../theme/theme-hooks";
import { IndexButtons, IndexDescription } from "./index-components";

export default function IndexContents() {
  const { themeState } = useTheme();
  const { sm } = useGlobalMediaQuery();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {!sm && (
        <RectangleTitle
          widthSize={400}
          type={themeState == "dark" ? "dark" : "default"}
        />
      )}
      <IndexDescription />
      <br />
      <IndexButtons />
    </div>
  );
}
