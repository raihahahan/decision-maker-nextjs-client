import { Button, Paper, Text } from "@mantine/core";
import { MyTable, TableTitleHeader } from "../../common/components/table";
import {
  DecisionTypes,
  IWeightedResult,
} from "../../common/types/decision-types";
import { breakpoints } from "../theme/theme-data";
import useTheme from "../theme/theme-hooks";
import { getWeight } from "./result-utils";

export function Result({
  data,
  type,
  index,
}: {
  data: IWeightedResult;
  type: DecisionTypes;
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
          {type != "random" && <h3>Score: {getWeight(data.totalWeight)}</h3>}
        </div>
      )}
      {index == undefined && <h3>{data?.name}</h3>}
    </Paper>
  );
}

export function ResultList({
  resultData,
  type,
}: {
  resultData: IWeightedResult[];
  type: DecisionTypes;
}) {
  const headers = <ResultListHeaders type={type} />;
  const rows = <ResultListRows resultData={resultData} type={type} />;
  return (
    <div style={{ display: "flex", width: "50vw", flexDirection: "column" }}>
      <TableTitleHeader
        type={type}
        disableCreate
        disableDelete
        styles={{ justifyContent: "center" }}
        customTitle="Ranked Choice"
      />
      <MyTable headers={headers} rows={rows} />
    </div>
  );
}

function ResultListRows({
  resultData,
  type,
}: {
  resultData: IWeightedResult[];
  type: DecisionTypes;
}) {
  const { siteColors } = useTheme();
  return (
    <>
      {resultData.map((element, index) => {
        return (
          <tr key={element.id} style={{ color: siteColors.text.primary }}>
            <td>{index + 1}</td>
            <td>{element.name}</td>
            {type != "random" && <td>{element.totalWeight}</td>}
          </tr>
        );
      })}
    </>
  );
}

function ResultListHeaders({ type }: { type: DecisionTypes }) {
  const { siteColors } = useTheme();
  return (
    <>
      <th style={{ color: siteColors.text.primary }}>Rank</th>
      <th style={{ color: siteColors.text.primary }}>Choice name</th>
      {type != "random" && (
        <th style={{ color: siteColors.text.primary }}>Score</th>
      )}
    </>
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
