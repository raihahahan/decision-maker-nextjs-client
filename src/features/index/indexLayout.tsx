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
    </div>
  );
}
