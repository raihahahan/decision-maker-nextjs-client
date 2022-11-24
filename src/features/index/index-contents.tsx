import RectangleTitle from "../../common/components/branding";
import useTheme from "../theme/theme-hooks";
import { IndexButtons, IndexDescription } from "./index-components";

export default function IndexContents() {
  const { themeState } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <RectangleTitle
        widthSize={400}
        type={themeState == "dark" ? "dark" : "default"}
      />
      <IndexDescription />
      <br />
      <IndexButtons />
    </div>
  );
}
