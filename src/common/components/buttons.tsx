import { Button } from "@mantine/core";
import useTheme from "../../features/theme/theme-hooks";

export default function FeatureButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  const theme = useTheme();

  return (
    <Button onClick={onClick} variant="filled" color="cyan" size="md">
      {text}
    </Button>
  );
}
