import { NextRouter } from "next/router";
import { IChoice, IDecision } from "../types/decision-types";

// DAL: Data Access Layer

abstract class DAL<T> {
  abstract get(): Promise<T[]>;
  abstract post(input: IDecision): Promise<IDecision>;
  abstract decide(id: number): Promise<IChoice>;
}

export default DAL;
