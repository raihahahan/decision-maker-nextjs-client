import { Button, Group, Stepper, Text } from "@mantine/core";
import { IDecision } from "../../common/types/decision-types";
import ChoicesForm from "../../features/choiceForm/choiceForm-components";
import { formHookReturnType } from "../../features/choiceForm/choiceForm-types";
import { breakpoints } from "../theme/theme-data";
import useTheme from "../theme/theme-hooks";
import {
  IGenericMultiStepFormProps,
  IMultiStepFormItem,
  TFormStepperButtonHandlers,
  TFormSteppersProps,
} from "./multiStepForm-types";

export default function MultiStepForm<T extends IDecision>({
  activeHandlers,
  form,
  setUnsavedChanges,
  presetValues,
  stepperData,
  type,
  pages,
  useMultiFormStepper,
}: IGenericMultiStepFormProps<T>) {
  const {
    rightButtonType,
    rightButtonDisabled,
    leftButtonDisabled,
    onClickRightButton,
    onClickLeftButton,
  } = useMultiFormStepper;

  const buttonHandlers: TFormStepperButtonHandlers = {
    disabled: {
      leftButtonDisabled,
      rightButtonDisabled,
    },
    onClick: {
      onClickLeftButton,
      onClickRightButton,
    },
    rightButtonType,
  };

  const steppers = (
    <FormSteppers
      buttonHandlers={buttonHandlers}
      activeHandlers={activeHandlers}
      stepperData={stepperData}
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
        active={activeHandlers.active}
        form={form}
        presetValues={presetValues}
        formData={pages}
      />
      <br />
      {steppers}
    </div>
  );
}

export function CurrentPage<T extends IDecision>({
  active,
  form,
  presetValues,
  formData,
}: {
  active: number;
  form: formHookReturnType<T>;
  presetValues?: T;
  formData: IMultiStepFormItem[];
}) {
  return (
    <div style={{ minHeight: "50vh" }}>
      {active == 0 ? (
        <ChoicesForm
          useChoiceForm={form}
          onSubmit={() => alert("TODO")}
          hideDecide
          presetData={presetValues}
          showBackButton={presetValues ? true : false}
        />
      ) : active == 1 ? (
        <>
          {formData.map((item) => {
            return <div key={item.id}>{item.element}</div>;
          })}
        </>
      ) : (
        <div>error</div>
      )}
    </div>
  );
}

export function FormSteppers({
  buttonHandlers,
  activeHandlers,
  stepperData,
}: TFormSteppersProps) {
  const { disabled, onClick, rightButtonType } = buttonHandlers;
  const { active, setActive } = activeHandlers;

  const { leftButtonDisabled, rightButtonDisabled } = disabled;
  const { onClickLeftButton, onClickRightButton } = onClick;
  const { siteColors } = useTheme();
  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        {stepperData.map((item) => {
          return (
            <Stepper.Step
              key={item.id}
              disabled
              label={item.label}
              description={item.description}
              style={{ color: siteColors.text.primary }}
            >
              <Text>{item.display}</Text>
            </Stepper.Step>
          );
        })}
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
