import Error from "../../common/components/error";
import randomDecisionApi from "../../features/randomDecision/randomDecision-api";
import { RandomDecisionIndexContents } from "../../features/randomDecision/randomDecision-contents";
import { IRandomDecisionItem } from "../../features/randomDecision/randomDecision-types";

export default function RandomIndexPage({
  res,
}: {
  res: IRandomDecisionItem[];
}) {
  // if (res == null) return <Error />
  return <Error />;
  return <RandomDecisionIndexContents res={res} />;
}

export async function getServerSideProps() {
  const res = await randomDecisionApi.get();
  if (!res) return { props: { res: null } };
  return { props: { res } };
}
