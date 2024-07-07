import React, { useState } from "react";
import {
  Group,
  Slider,
  TextInput,
  Divider,
  Pagination,
  Select,
} from "@mantine/core";
import { AddButton, RemoveButton } from "../choiceForm/choiceForm-components";
import { UseFormReturnType } from "@mantine/form";
import {
  ICriteriaInput,
  IWeightedDecisionItem,
  IWeightedInputItem,
} from "./weightedDecision-types";
import useTheme from "../theme/theme-hooks";
import { breakpoints } from "../theme/theme-data";
import {
  useCriteriaForm,
  useWeightedDecisionCreate,
  useWeightedDecisionEdit,
  useWeightedEditInput,
  useWeightedFormSteppers,
  useWeightedInput,
  useWeightedInputPagination,
} from "./weightedDecision-hooks";
import { formHookReturnType } from "../choiceForm/choiceForm-types";
import usePreventExitForm from "../../common/hooks/usePreventExitForm";
import MultiStepForm from "../multiStepForm/multiStepForm-components";
import { weightedStepperData } from "./weightedDecision-data";
import { IMultiStepFormItem } from "../multiStepForm/multiStepForm-types";
import { SubmitButton } from "../../common/components/buttons";

export function WeightedMainForm({
  activeHandlers,
  weightedForm,
  setUnsavedChanges,
  presetValues,
}: {
  activeHandlers: {
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>;
  };
  weightedForm: formHookReturnType<IWeightedDecisionItem>;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
  presetValues?: IWeightedDecisionItem;
}) {
  const pages: IMultiStepFormItem[] = [
    {
      id: 0,
      element: <CriteriaForm form={weightedForm.form} />,
    },
  ];

  const useMultiFormStepper = useWeightedFormSteppers([
    activeHandlers.active,
    activeHandlers.setActive,
    weightedForm.form as any,
    presetValues && presetValues.id ? presetValues.id : -1,
    pages.length + 1,
    setUnsavedChanges,
  ]);

  return (
    <MultiStepForm
      activeHandlers={activeHandlers}
      form={weightedForm}
      setUnsavedChanges={setUnsavedChanges}
      presetValues={presetValues}
      stepperData={weightedStepperData}
      type="weighted"
      pages={pages}
      useMultiFormStepper={useMultiFormStepper}
    />
  );
}

export function WeightedDecisionCreateForm() {
  const { activeHandlers, weightedForm, setUnsavedChanges } =
    useWeightedDecisionCreate();
  return (
    <WeightedMainForm
      activeHandlers={activeHandlers}
      weightedForm={weightedForm}
      setUnsavedChanges={setUnsavedChanges}
    />
  );
}

export function WeightedDecisionEditForm({
  presetValues,
}: {
  presetValues: IWeightedDecisionItem;
}) {
  const { activeHandlers, weightedForm, setUnsavedChanges } =
    useWeightedDecisionEdit(presetValues);
  return (
    <WeightedMainForm
      activeHandlers={activeHandlers}
      weightedForm={weightedForm}
      setUnsavedChanges={setUnsavedChanges}
      presetValues={presetValues}
    />
  );
}

export function CriteriaForm({
  form,
}: {
  form: UseFormReturnType<
    IWeightedDecisionItem,
    (values: IWeightedDecisionItem) => IWeightedDecisionItem
  >;
}) {
  const {
    addCriteria,
    removeCriteria,
    onEditCriteriaName,
    onEditCriteriaWeight,
  } = useCriteriaForm(form);

  const { siteColors } = useTheme();
  return (
    <div
      style={{ width: "90vw", maxWidth: breakpoints.sm + 10, marginBottom: 20 }}
    >
      <h2>Criteria</h2>
      <form>
        {form.values.criteriaList.map((item, index) => {
          return (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  key={item.id}
                  labelProps={{
                    style: { color: siteColors.text.primary },
                  }}
                  style={{ width: "80vw", marginBottom: 20 }}
                  size="lg"
                  withAsterisk
                  type="text"
                  label={`Criteria ${index + 1}`}
                  value={item.name}
                  onChange={(e) => onEditCriteriaName(e, index)}
                />
                <RemoveButton
                  onClick={() => removeCriteria(index, item?.id)}
                  extraStyles={{
                    marginLeft: 10,
                    marginBottom: 25,
                  }}
                />
              </div>
              <Slider
                key={item.id + item.name}
                style={{ margin: 20 }}
                value={item.weight}
                onChange={(e) => onEditCriteriaWeight(e, index)}
                marks={[
                  { value: 20, label: "20%" },
                  { value: 50, label: "50%" },
                  { value: 80, label: "80%" },
                ]}
              />
              <br />
            </div>
          );
        })}
        <Group position="apart" mt="md">
          <AddButton onClick={addCriteria} />
        </Group>
      </form>
    </div>
  );
}

export function WeightedInputForm({
  res,
  weightedInput,
}: {
  res: IWeightedDecisionItem;
  weightedInput?: IWeightedInputItem;
}) {
  const [unsavedChanges, setUnsavedChanges] = useState(true);
  const editHandler = useWeightedEditInput(
    res,
    setUnsavedChanges,
    weightedInput as any
  );
  const createdHandler = useWeightedInput(res, setUnsavedChanges);
  const {
    weightedInputForm: form,
    onSubmit,
    onChangeSlider,
  } = weightedInput ? editHandler : createdHandler;

  const { activeHandlers, pageHandlers } = useWeightedInputPagination();

  usePreventExitForm(unsavedChanges);
  const { siteColors } = useTheme();
  const item = form.values[activeHandlers.active - 1];
  const insertIndex = (str: string, index: number): string => {
    return `${index + 1}: ${str}`;
  };

  const submitButton = <WeightedInputSubmitButton onClick={onSubmit} />;
  const pagination = (
    <Pagination
      total={form.values.length}
      initialPage={1}
      onChange={pageHandlers.onClickPage}
      page={activeHandlers.active}
    />
  );

  const select = (
    <Select
      placeholder="Go to choice"
      searchable
      nothingFound="No choices found."
      data={form.values.map((i, index) => {
        return insertIndex(i.choiceName, index);
      })}
      onChange={(e) => {
        const index = e?.charAt(0);
        if (typeof index == "string") activeHandlers.setActive(+index);
      }}
      style={{ margin: 20 }}
    />
  );

  item.criteriaInput.sort((a, b) => a.weight - b.weight);

  return (
    <div
      key={activeHandlers.active}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: 10,
        maxWidth: breakpoints.lg + 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {submitButton}
      {pagination}
      {select}
      <div
        style={{
          backgroundColor: siteColors.header,
          padding: 20,
          margin: 20,
          borderRadius: 5,
          minWidth: "80vw",
        }}
      >
        <h3>
          Choice {activeHandlers.active}: {item.choiceName}
        </h3>
        <Divider />
        {item.criteriaInput.map((c, index) => {
          return (
            <WeightedInputCriteriaCard
              key={index}
              sliderHelpers={{ onChangeSlider }}
              indices={{ outIndex: activeHandlers.active - 1, index }}
              c={c}
            />
          );
        })}
      </div>
      {select}
      {pagination}
      {submitButton}
    </div>
  );
}

// COMPONENTS

// WeightedInputForm

export function WeightedInputCriteriaCard({
  sliderHelpers,
  indices,
  c,
}: {
  sliderHelpers: {
    onChangeSlider: (
      e: number,
      i1: number,
      i2: number,
      c: ICriteriaInput
    ) => void;
  };
  indices: { outIndex: number; index: number };
  c: ICriteriaInput;
}) {
  const { onChangeSlider } = sliderHelpers;
  const { outIndex, index } = indices;

  return (
    <div>
      <h4 style={{ paddingLeft: 20 }}>{c.name}</h4>
      <Slider
        style={{ margin: 20 }}
        marks={[
          { value: 20, label: "20%" },
          { value: 50, label: "50%" },
          { value: 80, label: "80%" },
        ]}
        onChange={(e) => onChangeSlider(e, outIndex, index, c)}
        value={c.value}
      />
    </div>
  );
}

export function WeightedInputSubmitButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return <SubmitButton onClick={onClick} />;
}
