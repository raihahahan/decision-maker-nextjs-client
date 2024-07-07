import React from "react";
import { DecisionTypes } from "../types/decision-types";
import { DecisionTypeItems } from "../utils/globals";
import FeatureButton from "./buttons";

export default function InputLayout({
  children,
  type,
  hideTitle,
}: {
  children: React.ReactElement;
  type: DecisionTypes;
  hideTitle?: boolean;
}) {
  const displayName = DecisionTypeItems.find((i) =>
    i.name.includes(type)
  )?.displayName;

  return (
    <>
      {!hideTitle && <h1>{displayName} Decision</h1>}
      {children}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!hideTitle && (
          <>
            <br />
            {/* <FeatureButton
              text="View history"
              name="error"
              link={`/${type}`}
              color={DecisionTypeItems.find((i) => i.type == type)?.color}
            /> */}
          </>
        )}
        <br />
        <h3>Try out a different way to decide!</h3>
        {DecisionTypeItems.map((item) => {
          return (
            !item.name.includes(type) && (
              <FeatureButton
                text={item.displayName}
                color={item.color}
                name={item.name as any}
              />
            )
          );
        })}
      </div>
      <br />
    </>
  );
}
