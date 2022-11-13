import randomDecisionApi from "../../features/randomDecision/randomDecision-api";
import { RandomDecisionIndexContents } from "../../features/randomDecision/randomDecision-contents";
import { IRandomDecisionItem } from "../../features/randomDecision/randomDecision-types";

export default function RandomIndexPage({
  res,
}: {
  res: IRandomDecisionItem[];
}) {
  return <RandomDecisionIndexContents res={res} />;
}

export async function getServerSideProps() {
  const res = await randomDecisionApi.get();
  return { props: { res } };
}
