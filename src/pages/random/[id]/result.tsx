import { NextPageContext } from "next";
import { IFinalResult } from "../../../common/types/decision-types";
import randomDecisionApi from "../../../features/randomDecision/randomDecision-api";
import { RandomDecisionResultContents } from "../../../features/randomDecision/randomDecision-contents";

export default function RandomResultPage({ res }: { res: IFinalResult }) {
  return <RandomDecisionResultContents res={res} />;
}

export async function getServerSideProps(context: NextPageContext) {
  const id: string = context.query.id as string;
  const res = await randomDecisionApi.decide(+id);
  return {
    props: {
      res,
    }, // will be passed to the page component as props
  };
}
