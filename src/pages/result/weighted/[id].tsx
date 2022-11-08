import { NextPageContext } from "next";
import { WeightedResultContents } from "../../../features/weightedDecision/weightedDecision-contents";

export default function WeightedResultPage({ id }: { id: number }) {
  return <WeightedResultContents id={id} />;
}

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  if (query != undefined && query.id) {
    const id: number = +query.id;
    return { props: { id } };
  } else {
    return {
      props: {
        res: {
          id: -1,
        },
      },
    };
  }
};
