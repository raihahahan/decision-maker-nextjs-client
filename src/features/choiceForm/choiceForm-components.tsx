import { Box, Button, Group, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { CSSProperties, useEffect } from "react";
import { IDecision } from "../../common/types/decision-types";
import { breakpoints } from "../theme/theme-data";
import useTheme from "../theme/theme-hooks";
import { formHookReturnType } from "./choiceForm-types";

export default function ChoicesForm<T extends IDecision>({
  onSubmit,
  useChoiceForm,
  presetData,
  showBackButton,
  hideDecide,
}: {
  onSubmit: (value: any) => void;
  useChoiceForm: formHookReturnType<T>;
  presetData?: T;
  showBackButton?: boolean;
  hideDecide?: boolean;
}) {
  const { form, formHelpers } = useChoiceForm;

  useEffect(() => {
    if (presetData != undefined) form.setValues(presetData);
  }, []);
  return (
    <Box
      sx={{ width: "90vw", maxWidth: breakpoints.sm + 10, marginBottom: 20 }}
      mx="auto"
    >
      <form onSubmit={form.onSubmit((value) => onSubmit(value))}>
        <>
          <DecisionNameInput<T> form={form} />
          <br />
          <h2>Choices</h2>
          {form.values.choices.map((item, index) => (
            <ChoiceInput<T>
              form={form}
              index={index}
              formHelpers={formHelpers}
            />
          ))}

          <Group position="apart" mt="md">
            <Group>
              {showBackButton && (
                <FormCancelButton onClick={formHelpers.cancel} />
              )}
              <AddButton onClick={formHelpers.addChoice} />
            </Group>
            {!hideDecide && <MakeDecisionButton onClick={formHelpers.decide} />}
          </Group>
        </>
      </form>
    </Box>
  );
}

export function DecisionNameInput<T extends IDecision>({
  form,
}: {
  form: UseFormReturnType<T, (values: T) => T>;
}) {
  const { siteColors } = useTheme();
  return (
    <TextInput
      labelProps={{
        style: { color: siteColors.text.primary },
      }}
      size="lg"
      withAsterisk
      type="text"
      label="Decision to make"
      placeholder="e.g. Which bicycle should I buy..."
      {...form.getInputProps("name")}
    />
  );
}

export function ChoiceInput<T extends IDecision>({
  form,
  index,
  formHelpers,
}: {
  form: UseFormReturnType<T, (values: T) => T>;
  index: number;
  formHelpers: {
    removeChoice(id: number): void;
    addChoice(): void;
    decide(): void;
  };
}) {
  const { siteColors } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
      }}
    >
      <TextInput
        size="lg"
        labelProps={{
          style: { color: siteColors.text.primary },
        }}
        style={{ width: "90vw", marginBottom: 20 }}
        label={`Choice ${index + 1}`}
        {...form.getInputProps(`choices.${index}.name`)}
      />
      <RemoveButton
        onClick={() => formHelpers.removeChoice(index)}
        extraStyles={{
          marginLeft: 10,
          marginBottom: 25,
        }}
      />
    </div>
  );
}

export function RemoveButton({
  onClick,
  extraStyles,
}: {
  onClick: () => void;
  extraStyles: CSSProperties;
}) {
  return (
    <Button
      onClick={onClick}
      color="red"
      radius="md"
      size="xl"
      compact
      uppercase
      style={extraStyles}
    >
      -
    </Button>
  );
}

export function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <Button size="lg" color="green" type="button" onClick={onClick}>
      Add
    </Button>
  );
}

export function MakeDecisionButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button size="lg" onClick={onClick} type="submit">
      Decide!
    </Button>
  );
}

export function FormCancelButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button color="red" size="lg" onClick={onClick} type="button">
      Cancel
    </Button>
  );
}
