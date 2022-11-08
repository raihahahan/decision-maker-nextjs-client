import { ButtonProps } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  ICriteria,
  ICriteriaInput,
  IWeightedDecisionItem,
  IWeightedInput,
} from "./weightedDecision-types";
import weightedDeicisonApi from "./weightedDeicison-api";

export function useWeightedInput(weightedItems: IWeightedDecisionItem) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const initialValues: IWeightedInput[] = weightedItems.choices.map((c) => {
    const choiceId = c.id as number;
    const choiceName = c.name;
    const criteriaInput: ICriteriaInput[] = weightedItems.criteriaList.map(
      (criteria) => {
        return { ...criteria, value: 20 };
      }
    );
    return { choiceId, choiceName, criteriaInput };
  });

  const weightedInputForm = useForm<IWeightedInput[]>({ initialValues });

  return { weightedInputForm, initialValues };
}

export function useCriteriaForm(
  form: UseFormReturnType<
    IWeightedDecisionItem,
    (values: IWeightedDecisionItem) => IWeightedDecisionItem
  >
) {
  const addCriteria = () => {
    if (form.values.criteriaList.length < 100) {
      form.insertListItem("criteriaList", {
        id: form.values.criteriaList.length,
        name: "",
      } as ICriteria);
    } else {
      alert("Maximum 100 criteria");
    }
  };
  const removeCriteria = (id: number) => {
    form.removeListItem("criteriaList", id);
  };

  return { addCriteria, removeCriteria };
}

export function useWeightedFormSteppers(
  active: number,
  setActive: React.Dispatch<React.SetStateAction<number>>,
  form: UseFormReturnType<
    IWeightedDecisionItem,
    (values: IWeightedDecisionItem) => IWeightedDecisionItem
  >,
  isEdit: boolean,
  id: number
) {
  const router = useRouter();
  const TOTAL = 2;
  const nextStep = () =>
    setActive((current) => (current < TOTAL + 1 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const rightButtonDisabled =
    active == 0
      ? form.values.choices.filter((i) => i.name.trim().length == 0).length >
          0 ||
        form.values.name.trim().length <= 0 ||
        form.values.choices.length <= 1
      : active >= 1
      ? form.values.criteriaList.filter((i) => i.name.trim().length > 0)
          .length == 0
      : false;

  const onClickRightButton = async () => {
    if (active >= TOTAL - 1) {
      form.values.choices = form.values.choices.map((c) => {
        if (c?.id) delete c.id;
        return c;
      });
      form.values.criteriaList = form.values.criteriaList.map((i) => {
        if (i?.id) delete i.id;
        return i;
      });
      if (isEdit) {
        await weightedDeicisonApi.put(id, form.values);
        router.push({ pathname: `/input/weighted/${id}` });
      } else {
        const res = await weightedDeicisonApi.post(form.values);
        const _id = res.id;
        router.push({ pathname: `/input/weighted/${_id}` });
      }
    } else {
      nextStep();
    }
  };

  const onClickLeftButton = prevStep;

  const rightButtonType: ButtonProps["type"] =
    active >= TOTAL - 1 ? "submit" : "button";

  const leftButtonDisabled = active <= 0;

  return {
    rightButtonType,
    rightButtonDisabled,
    leftButtonDisabled,
    onClickRightButton,
    onClickLeftButton,
  };
}
