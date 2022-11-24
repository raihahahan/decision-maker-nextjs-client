import { useRouter } from "next/router";
import { AddButton } from "../choiceForm/choiceForm-components";
import { DecisionTypes } from "../../common/types/decision-types";

export default function IndexLayout({
  children,
  type,
}: {
  children: JSX.Element;
  type: DecisionTypes;
}) {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: 20,
      }}
    >
      {children}
      <div style={{ position: "absolute", bottom: "10vh", right: "6vw" }}>
        <AddButton
          onClick={() => router.push({ pathname: `${type}/create` })}
        />
      </div>
    </div>
  );
}
