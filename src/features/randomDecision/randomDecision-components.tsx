import { Box, Button, Group, TextInput } from "@mantine/core";
import { DecisionTitle } from "../../common/components/branding";
import useRandomDecisionForm from "./randomDecision-hooks";

export function RandomDecisionTitle() {
  return <DecisionTitle title="Random Decision" />;
}

export function RandomDecisionForm() {
  const form = useRandomDecisionForm();
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => alert(JSON.stringify(values)))}>
        <>
          <TextInput
            withAsterisk
            label="Decision to make"
            placeholder="e.g. Which bicycle should I buy..."
            {...form.getInputProps("name")}
          />
          <br />
          <h2>Choices</h2>
          {form.values.choices.map((element, index) => {
            return (
              <TextInput
                withAsterisk
                label={`Choice ${index + 1}`}
                placeholder="e.g. Polygon Strattos S3..."
                value={element.name}
                {...form.getInputProps("choices")}
              />
            );
          })}

          <Group position="right" mt="md">
            <Button type="submit">Make My Decision</Button>
          </Group>
        </>
      </form>
    </Box>
  );
}
