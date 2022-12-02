import { IChoice } from "../types/decision-types";
import { v4 as uuidv4 } from "uuid";

export class Choice implements IChoice {
  name = "";
  id: number | undefined = undefined;
  decisionId: number | undefined = undefined;
  refId: string = "";

  constructor(name?: string, id?: number, decisionId?: number) {
    this.name = name ?? "";
    this.id = id;
    this.decisionId = decisionId;
    this.refId = uuidv4();
  }

  get() {
    return this.name;
  }

  set(value: string) {
    this.name = value;
  }
}
