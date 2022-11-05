import { IChoice, IDecision } from "../types/decision-types";

// DAL: Data Access Layer

abstract class DAL<T> {
  abstract get(): Promise<T[]>;
  abstract post(input: IDecision): Promise<IDecision>;
  abstract getDecide(id: number): Promise<IChoice>;
  abstract onSubmit(value: IDecision): Promise<void>;
}

export default DAL;
