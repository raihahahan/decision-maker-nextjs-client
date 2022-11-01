import { Box, Button, Group, TextInput } from "@mantine/core";
import { CSSProperties } from "react";
import useTheme from "../theme/theme-hooks";
import useChoiceForm from "./choiceForm-hooks";

export default function ChoicesForm() {
  const { form, formSetters, ChoiceInput } = useChoiceForm();
  const { formVal, setFormVal } = formSetters;
  const { addChoice, removeChoice, setChoice, setName } = ChoiceInput;
  const { siteColors } = useTheme();
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((value) => alert(JSON.stringify(value)))}>
        <>
          <TextInput
            labelProps={{
              style: { color: siteColors.text.primary },
            }}
            withAsterisk
            label="Decision to make"
            placeholder="e.g. Which bicycle should I buy..."
            {...form.getInputProps("name")}
          />
          <br />
          <h2>Choices</h2>
          {form.values.choices.map((item, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <TextInput
                  labelProps={{
                    style: { color: siteColors.text.primary },
                  }}
                  withAsterisk
                  label={`Choice ${index + 1}`}
                  {...form.getInputProps(`choices.${index}.name`)}
                />
                <RemoveButton
                  onClick={() => form.removeListItem("choices", index)}
                  extraStyles={{
                    marginLeft: 10,
                    marginBottom: 2,
                  }}
                />
              </div>
            );
          })}

          <Group position="apart" mt="md">
            <AddButton
              onClick={() =>
                form.insertListItem("choices", {
                  id: form.values.choices.length,
                  name: "",
                })
              }
            />
            <MakeDecisionButton
              onClick={() =>
                form.validateField("choices").hasError
                  ? alert(form.validateField("choices").error)
                  : null
              }
            />
          </Group>
        </>
      </form>
    </Box>
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
      size="md"
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
    <Button color="green" type="button" onClick={onClick}>
      Add
    </Button>
  );
}

export function MakeDecisionButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick} type="submit">
      Decide!
    </Button>
  );
}
