import { NextPageContext } from "next";
import Error from "../../../common/components/error";
import { IDecision } from "../../../common/types/decision-types";
import EditContents from "../../../features/edit/edit-contents";
import randomDecisionApi from "../../../features/randomDecision/randomDecision-api";

export default function RandomEditPage({ res }: { res: IDecision }) {
  if (!res.choices) return <Error />;
  return <EditContents res={res} />;
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  if (query != undefined && query.id) {
    const id: number = +query.id;
    const res = await randomDecisionApi.getById(id);
    return { props: { res } };
  } else return { props: { res: { name: "error", choices: [] } as IDecision } };
};
