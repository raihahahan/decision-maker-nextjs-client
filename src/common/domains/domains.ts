import { IChoice } from "../types/decision-types";

export class Choice implements IChoice {
  name = "";
  id: number | undefined = undefined;
  decisionId: number | undefined = undefined;

  constructor(name?: string, id?: number, decisionId?: number) {
    this.name = name ?? "";
    this.id = id;
    this.decisionId = decisionId;
  }

  get() {
    return this.name;
  }

  set(value: string) {
    this.name = value;
  }
}
