import { IChoice, IDecision } from "../../common/types/decision-types";

export const InitialValues: IDecision = {
  name: "",
  choices: [
    {
      id: 0,
      name: "",
    },
    {
      id: 1,
      name: "",
    },
  ],
};

export const InitialValidate = {
  name: (val: string) => (val.length > 0 ? null : "Invalid decision name."),
  choices: (val: IChoice[]) =>
    val.length <= 1
      ? "Please provide more than 1 choices"
      : val.length > 10
      ? "Maximum 10 choices"
      : null,
};
