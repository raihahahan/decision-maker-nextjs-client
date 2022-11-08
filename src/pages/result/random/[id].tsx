import { NextPageContext } from "next";
import { useEffect } from "react";
import Error from "../../../common/components/error";
import { IFinalResult } from "../../../common/types/decision-types";
import randomDecisionApi from "../../../features/randomDecision/randomDecision-api";
import ResultContents from "../../../features/result/result-contents";

export default function RandomResultPage({ res }: { res: IFinalResult }) {
  if (!res.weightedResults) return <Error />;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ResultContents data={res} type={"random"} />
      <br />
    </div>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  if (query != undefined && query.id) {
    const id: number = +query.id;
    const res = await randomDecisionApi.decide(+id);
    return { props: { res: { ...res } as IFinalResult } };
  } else {
    return {
      props: {
        res: {
          decisionName: "An error occured",
          weightedResults: [],
          type: "error",
        } as IFinalResult,
      },
    };
  }
};
