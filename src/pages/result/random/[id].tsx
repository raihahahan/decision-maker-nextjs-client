import { Button } from "@mantine/core";
import { GetServerSideProps, NextPageContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { IWeightedResult } from "../../../common/types/decision-types";
import randomDecisionApi from "../../../features/randomDecision/randomDecision-api";
import ResultContents from "../../../features/result/result-contents";

export default function RandomResultPage({ query }: { query: ParsedUrlQuery }) {
  return <ResultContents query={query} />;
}

export const getServerSideProps = async (context: NextPageContext) => {
  {
    const { query } = context;
    return { props: { query } };
  }
};
