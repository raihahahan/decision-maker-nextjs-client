import { NextRouter } from "next/router";
import { IChoice, IDecision, IWeightedResult } from "../types/decision-types";

// DAL: Data Access Layer

abstract class DAL<T> {
  abstract get(): Promise<T[]>;
  abstract post(input: IDecision): Promise<IDecision>;
  abstract decide(id: number): Promise<IWeightedResult[]>;
}

export default DAL;
