import { Grid } from "@mantine/core";
import FeatureButton from "../../common/components/buttons";
import { DecisionTypeItems } from "../../common/utils/globals";
import { AboutButtons, AboutDescription } from "./about-components";

export default function AboutContents() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>About MakeMyDecision</h1>
      <AboutDescription />
      <br />
      <AboutButtons />
    </div>
  );
}
