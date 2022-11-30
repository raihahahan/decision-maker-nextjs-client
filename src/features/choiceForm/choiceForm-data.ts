import { IChoice, IDecision } from "../../common/types/decision-types";
import { v4 as uuidv4 } from "uuid";

export const InitialValues: IDecision = {
  name: "",
  choices: [
    {
      id: 0,
      name: "",
      refId: uuidv4(),
    },
    {
      id: 1,
      name: "",
      refId: uuidv4(),
    },
  ],
};

export const InitialValidate: any = {
  name: (val: string) => (val.length > 0 ? null : "Invalid decision name."),
  choices: (val: IChoice[]) => {
    let copy = [...val];
    copy = copy.filter((i) => i.name.trim() != "");
    return copy.length <= 1
      ? "Please provide more than 1 choices"
      : val.length > 100
      ? "Maximum 100 choices"
      : null;
  },
};
