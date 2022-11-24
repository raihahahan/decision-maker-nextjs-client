import { Button, Paper, Text } from "@mantine/core";
import { IWeightedResult } from "../../common/types/decision-types";
import { breakpoints } from "../theme/theme-data";
import { getWeight } from "./result-utils";

export function Result({
  data,
  index,
}: {
  data: IWeightedResult;
  index?: number;
}) {
  return (
    <Paper
      shadow="xs"
      p="lg"
      style={{
        margin: 10,
        width: "40vw",
        maxWidth: breakpoints.sm,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {index != undefined && typeof index == "number" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h3>
            {index + 1}: {data?.name}
          </h3>
          <h3>Score: {getWeight(data.totalWeight)}</h3>
        </div>
      )}
      {index == undefined && <h3>{data?.name}</h3>}
    </Paper>
  );
}

export function ResultList({ resultData }: { resultData: IWeightedResult[] }) {
  return (
    <div>
      {resultData.map((item, index) => {
        return <Result data={item} index={index} />;
      })}
    </div>
  );
}

export function EditDecisionButton({ onClick }: { onClick: () => void }) {
  return (
    <Button style={{ margin: 10 }} onClick={onClick} color="green" size="lg">
      Edit
    </Button>
  );
}

export function CreateNewDecisionButton({ onClick }: { onClick: () => void }) {
  return (
    <Button style={{ margin: 10 }} onClick={onClick} color="green" size="lg">
      Create new decision
    </Button>
  );
}
