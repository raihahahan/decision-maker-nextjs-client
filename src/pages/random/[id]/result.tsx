import { NextPageContext } from "next";
import { useEffect } from "react";
import { IFinalResult } from "../../../common/types/decision-types";
import randomDecisionApi from "../../../features/randomDecision/randomDecision-api";
import ResultContents from "../../../features/result/result-contents";

export default function RandomResultPage({ res }: { res: IFinalResult }) {
  return <ResultContents data={res} type="random" />;
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
