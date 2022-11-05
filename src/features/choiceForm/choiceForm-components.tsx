import { Box, Button, Group, TextInput } from "@mantine/core";
import { CSSProperties } from "react";
import { breakpoints } from "../theme/theme-data";
import useTheme, { useGlobalMediaQuery } from "../theme/theme-hooks";
import useChoiceForm from "./choiceForm-hooks";

export default function ChoicesForm({
  onSubmit,
}: {
  onSubmit: (value: any) => void;
}) {
  const { form, formHelpers } = useChoiceForm();
  const { siteColors } = useTheme();

  return (
    <Box
      sx={{ width: "90vw", maxWidth: breakpoints.sm + 10, marginBottom: 20 }}
      mx="auto"
    >
      <form onSubmit={form.onSubmit((value) => onSubmit(value))}>
        <>
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
          })}

          <Group position="apart" mt="md">
            <AddButton onClick={formHelpers.addChoice} />
            <MakeDecisionButton onClick={formHelpers.decide} />
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
