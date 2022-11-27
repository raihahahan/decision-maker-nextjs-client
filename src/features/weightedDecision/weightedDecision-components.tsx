import React, { useEffect, useState } from "react";
import {
  Stepper,
  Button,
  Group,
  Slider,
  TextInput,
  Divider,
  Pagination,
  Select,
} from "@mantine/core";
import ChoicesForm, {
  AddButton,
  RemoveButton,
} from "../choiceForm/choiceForm-components";
import { UseFormReturnType } from "@mantine/form";
import {
  ICriteria,
  ICriteriaInput,
  IExtraFormConfig,
  IWeightedDecisionItem,
  IWeightedInput,
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
import { useRouter } from "next/router";

const TOTAL = 2;

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
  const { active, setActive } = activeHandlers;
  const steppers = (
    <WeightedFormSteppers
      active={active}
      setActive={setActive}
      form={weightedForm.form}
      id={presetValues && presetValues.id ? presetValues.id : -1}
      setUnsavedChanges={setUnsavedChanges}
    />
  );

  return (
    <div
      style={{
        padding: 20,
        width: "90vw",
        maxWidth: breakpoints.sm + 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {steppers}
      <br />
      <CurrentPage
        active={active}
        weightedForm={weightedForm}
        presetValues={presetValues}
      />
      <br />
      {steppers}
    </div>
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

export function CurrentPage({
  active,
  weightedForm,
  presetValues,
}: {
  active: number;
  weightedForm: formHookReturnType<IWeightedDecisionItem>;
  presetValues?: IWeightedDecisionItem;
}) {
  return (
    <div style={{ minHeight: "50vh" }}>
      {active == 0 ? (
        <ChoicesForm
          useChoiceForm={weightedForm}
          onSubmit={() => alert("TODO")}
          hideDecide
          presetData={presetValues}
        />
      ) : active == 1 ? (
        <CriteriaForm
          form={weightedForm.form}
          extraFormHelpers={weightedForm.formHelpers as any}
        />
      ) : (
        <div>error</div>
      )}
    </div>
  );
}

export function CriteriaForm({
  form,
  extraFormHelpers,
}: {
  form: UseFormReturnType<
    IWeightedDecisionItem,
    (values: IWeightedDecisionItem) => IWeightedDecisionItem
  >;
  extraFormHelpers: IExtraFormConfig<IWeightedDecisionItem, ICriteria>;
}) {
  const {
    addCriteria,
    removeCriteria,
    finalOnChangeCriteriaName,
    finalOnChangeCriteriaWeight,
  } = useCriteriaForm(form, extraFormHelpers);

  const { siteColors } = useTheme();
  return (
    <div
      style={{ width: "90vw", maxWidth: breakpoints.sm + 10, marginBottom: 20 }}
    >
      <h2>Criteria</h2>
      <form>
        {form.values.criteriaList.map((item, index) => {
          return (
            <div>
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
                  onChange={(e) => {
                    finalOnChangeCriteriaName(
                      e,
                      item.weight,
                      index,
                      item.id as number
                    );
                  }}
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
                onChange={(e) => {
                  finalOnChangeCriteriaWeight(
                    e,
                    item.name,
                    index,
                    item?.id as number // TODO BUG: item value is outdated
                  );
                }}
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
  const {
    weightedInputForm: form,
    onSubmit,
    onChangeSlider,
    putSlider,
  } = weightedInput
    ? useWeightedEditInput(res, setUnsavedChanges, weightedInput)
    : useWeightedInput(res, setUnsavedChanges);

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
              sliderHelpers={{ onChangeSlider, putSlider }}
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

function WeightedFormSteppers({
  active,
  setActive,
  form,
  id,
  setUnsavedChanges,
}: {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  form: UseFormReturnType<
    IWeightedDecisionItem,
    (values: IWeightedDecisionItem) => IWeightedDecisionItem
  >;
  id: number;
  setUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    rightButtonType,
    rightButtonDisabled,
    leftButtonDisabled,
    onClickRightButton,
    onClickLeftButton,
  } = useWeightedFormSteppers(
    active,
    setActive,
    form,
    id,
    TOTAL,
    setUnsavedChanges
  );
  const { siteColors } = useTheme();

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step
          disabled
          label="Choices"
          description="Create decision and choices"
          style={{ color: siteColors.text.primary }}
        >
          Step 1: Create decision and choices
        </Stepper.Step>
        <Stepper.Step
          disabled
          label="Criteria"
          description="Create criteria that affect your decision making"
          style={{ color: siteColors.text.primary }}
        >
          Step 2: Create criteria that affect your decision making (hint: 0
          [least important] - 100 [most important])
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button
          disabled={leftButtonDisabled}
          variant="default"
          size="md"
          onClick={onClickLeftButton}
        >
          Back
        </Button>

        <Button
          disabled={rightButtonDisabled}
          type={rightButtonType}
          size="md"
          onClick={onClickRightButton}
        >
          Next
        </Button>
      </Group>
    </>
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
    ) => Promise<void>;
    putSlider: (e: number, c1: ICriteriaInput, c2: ICriteriaInput) => void;
  };
  indices: { outIndex: number; index: number };
  c: ICriteriaInput;
}) {
  const { onChangeSlider, putSlider } = sliderHelpers;
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
        onChange={async (e) => {
          await onChangeSlider(e, outIndex, index, c);
          putSlider(e, c, c);
        }}
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
  return (
    <Button
      style={{ margin: 20 }}
      color="green"
      size="lg"
      type="submit"
      onClick={onClick}
    >
      Submit
    </Button>
  );
}
