import { NextPageContext } from "next";
import Error from "../../../common/components/error";
import randomDecisionApi from "../../../features/randomDecision/randomDecision-api";
import { WeightedInputContents } from "../../../features/weightedDecision/weightedDecision-contents";
import { IWeightedDecisionItem } from "../../../features/weightedDecision/weightedDecision-types";
import weightedDeicisonApi from "../../../features/weightedDecision/weightedDeicison-api";

export default function WeightedInputPage({
  res,
}: {
  res: IWeightedDecisionItem;
}) {
  if (
    res == undefined ||
    res.choices == undefined ||
    res.criteriaList == undefined
  )
    return <Error />;
  else {
    return <WeightedInputContents res={res} />;
  }
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  if (query != undefined && query.id) {
    const id: number = +query.id;
    const res = await weightedDeicisonApi.getById(id);
    return { props: { res } };
  } else {
    return {
      props: {
        res: {
          name: "",
          choices: [],
          criteriaList: [],
        } as IWeightedDecisionItem,
      },
    };
  }
};
