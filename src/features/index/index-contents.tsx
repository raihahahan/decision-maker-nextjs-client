import { IndexButtons, IndexDescription } from "./index-components";

export default function IndexContents() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>MakeMyDecision</h1>
      <IndexDescription />
      <br />
      <IndexButtons />
    </div>
  );
}
