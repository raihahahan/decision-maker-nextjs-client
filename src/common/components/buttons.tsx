import { Button, ButtonProps } from "@mantine/core";
import { useRouter } from "next/router";
import { DecisionTypes } from "../types/decision-types";

export default function FeatureButton({
  text,
  name,
  color,
}: {
  text: string;
  name: DecisionTypes;
  color: ButtonProps["color"];
}) {
  const router = useRouter();
  return (
    <Button
      style={{ margin: 10 }}
      color={color}
      onClick={() => router.push({ pathname: name })}
      variant="filled"
      size="md"
    >
      {text}
    </Button>
  );
}
