import { Box, Button, Group, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ChangeEvent, CSSProperties, useCallback, useEffect } from "react";
import { Choice } from "../../common/domains/domains";
import { IChoice, IDecision } from "../../common/types/decision-types";
import debounce from "lodash.debounce";
import { breakpoints } from "../theme/theme-data";
import useTheme from "../theme/theme-hooks";
import { formHookReturnType, TFormHelpers } from "./choiceForm-types";

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
          {form.values.choices.map((item, index) => {
            return (
              <ChoiceInput<T>
                form={form}
                item={item}
                index={index}
                formHelpers={formHelpers}
                itemID={item?.id}
                decisionID={presetData?.id}
              />
            );
          })}

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
  item,
  formHelpers,
  itemID,
  decisionID,
}: {
  form: UseFormReturnType<T, (values: T) => T>;
  index: number;
  item: IChoice;
  formHelpers: TFormHelpers;
  itemID?: number;
  decisionID?: number;
}) {
  const editHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof itemID == "number") {
      formHelpers.editChoice(
        itemID as any,
        new Choice(e.target.value, itemID, decisionID)
      );
    } else return;
  };
  const debouncedEdit = useCallback(debounce(editHandler, 300), []);
  const finalOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedEdit(e);
    form.setFieldValue(`choices.${index}.name`, e.target.value as any);
  };

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
        value={item.name}
        onChange={finalOnChange}
      />
      <RemoveButton
        onClick={() => formHelpers.removeChoice(index, itemID)}
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
  text,
}: {
  onClick: () => void;
  extraStyles?: CSSProperties;
  text?: string;
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
      {text ?? "-"}
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
