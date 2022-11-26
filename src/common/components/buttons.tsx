import { CSSProperties } from "@emotion/serialize";
import { Button, ButtonProps } from "@mantine/core";
import { useRouter } from "next/router";
import { DecisionTypes } from "../types/decision-types";

export default function FeatureButton({
  text,
  name,
  color,
  extraStyles,
  link,
}: {
  text: string;
  name: DecisionTypes;
  color: ButtonProps["color"];
  extraStyles?: CSSProperties;
  link?: string;
}) {
  const router = useRouter();

  return (
    <Button
      style={{ margin: 10, ...(extraStyles as object) }}
      color={color}
      onClick={() => router.push({ pathname: link ?? name })}
      variant="filled"
      size="md"
    >
      {text}
    </Button>
  );
}
