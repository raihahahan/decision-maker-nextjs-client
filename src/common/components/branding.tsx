import Image from "next/image";
import useTheme from "../../features/theme/theme-hooks";

export default function RectangleTitle({
  widthSize,
  type,
}: {
  widthSize: number;
  type?: "default" | "dark";
}) {
  const WIDTH = 587;
  const HEIGHT = 245;
  const RATIO = HEIGHT / WIDTH;
  let src;
  switch (type) {
    case "default":
      src = "/images/title-light.png";
      break;
    case "dark":
      src = "/images/title-dark.png";
      break;
    default:
      src = "/images/title-light.png";
      break;
  }

  return (
    <Image
      priority
      src={src as string}
      alt="MakeMyDecision"
      width={widthSize}
      height={RATIO * widthSize}
    />
  );
}

export function DecisionTitle({ title }: { title: string }) {
  const theme = useTheme();

  return <h1>{title}</h1>;
}
