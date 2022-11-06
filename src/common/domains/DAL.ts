import { IDecision, IFinalResult } from "../types/decision-types";

// DAL: Data Access Layer

abstract class DAL<T> {
  abstract get(): Promise<T[]>;
  abstract getById(id: number): Promise<T>;
  abstract post(input: IDecision): Promise<IDecision>;
  abstract put(id: number, value: IDecision): Promise<void>;
  abstract decide(id: number): Promise<IFinalResult>;
}

export default DAL;
