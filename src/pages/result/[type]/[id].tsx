import { NextPageContext } from "next";
import { IFinalResult } from "../../../common/types/decision-types";
import randomDecisionApi from "../../../features/randomDecision/randomDecision-api";
import ResultContents from "../../../features/result/result-contents";

export default function ResultPage({ res }: { res: IFinalResult }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <ResultContents data={res} type={res.type} />
      <br />
    </div>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  {
    const { query } = context;
    if (query != undefined && query.id) {
      const id: number = +query.id;
      const res = await randomDecisionApi.decide(+id);
      return { props: { res: { ...res, type: query.type } as IFinalResult } };
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
  }
};
