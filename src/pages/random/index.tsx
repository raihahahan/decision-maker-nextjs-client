import randomDecisionApi from "../../features/randomDecision/randomDecision-api";
import { IRandomDecisionItem } from "../../features/randomDecision/randomDecision-types";

export default function RandomIndexPage({
  res,
}: {
  res: IRandomDecisionItem[];
}) {
  return <p>{JSON.stringify(res)}</p>;
}

export async function getServerSideProps() {
  const res = await randomDecisionApi.get();
  return { props: { res } };
}
