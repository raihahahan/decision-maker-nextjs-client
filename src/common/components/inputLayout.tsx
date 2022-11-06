import { useRouter } from "next/router";
import React from "react";
import { DecisionTypes } from "../types/decision-types";
import { DecisionTypeItems } from "../utils/globals";
import FeatureButton from "./buttons";

export default function InputLayout({
  children,
  type,
}: {
  children: React.ReactElement;
  type: DecisionTypes;
}) {
  const displayName = DecisionTypeItems.find(
    (i) => i.name == type
  )?.displayName;

  return (
    <>
      <h1>{displayName} Decision</h1>
      {children}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <br />
        <h3>Try out a different way to decide!</h3>
        {DecisionTypeItems.map((item) => {
          return (
            item.name != type && (
              <FeatureButton
                text={item.displayName}
                color={item.color}
                name={item.name}
              />
            )
          );
        })}
      </div>
      <br />
    </>
  );
}
