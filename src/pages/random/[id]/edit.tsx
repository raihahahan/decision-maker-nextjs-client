import { NextPageContext } from "next";
import { IFinalResult } from "../../../common/types/decision-types";
import randomDecisionApi from "../../../features/randomDecision/randomDecision-api";
import { RandomDecisionEditFormContents } from "../../../features/randomDecision/randomDecision-contents";
import { IRandomDecisionItem } from "../../../features/randomDecision/randomDecision-types";

export default function RandomEditPage({ res }: { res: IRandomDecisionItem }) {
  return <RandomDecisionEditFormContents res={res} />;
}

export async function getServerSideProps(context: NextPageContext) {
  const id: string = context.query.id as string;
  const presetValues = await randomDecisionApi.getById(+id);
  return {
    props: {
      res: presetValues,
    }, // will be passed to the page component as props
  };
}
