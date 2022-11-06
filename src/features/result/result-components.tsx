import { Paper, Text } from "@mantine/core";
import { IWeightedResult } from "../../common/types/decision-types";

export function Result({ data }: { data: IWeightedResult }) {
  return (
    <Paper shadow="xs" p="lg" style={{ margin: 10 }}>
      <div>
        <Text>{data.name}</Text>
        <Text>Weight: </Text>

        {data.totalWeight}
      </div>
    </Paper>
  );
}

export function ResultList({
  resultData,
  decisionName,
}: {
  resultData: IWeightedResult[];
  decisionName: string;
}) {
  return (
    <div>
      <Text>Decision Name: </Text>
      <Text>{decisionName}</Text>
      {resultData.map((item) => {
        return <Result data={item} />;
      })}
    </div>
  );
}
