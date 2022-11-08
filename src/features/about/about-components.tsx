import { Grid, Text, Badge, Button, Card, Group, Image } from "@mantine/core";
import FeatureButton from "../../common/components/buttons";
import {
  DecisionTypeItems,
  DecisionTypeItemsType,
} from "../../common/utils/globals";
import { breakpoints } from "../theme/theme-data";
import useTheme from "../theme/theme-hooks";

export function AboutButtons() {
  return (
    <Grid
      gutter="lg"
      align="stretch"
      style={{ margin: 10, maxWidth: breakpoints.lg + 100 }}
    >
      {DecisionTypeItems.map((item, index) => {
        return (
          <Grid.Col
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            key={item.name}
            sm={6}
            lg={4}
          >
            <DecisionCard item={item} key={item.name} />
          </Grid.Col>
        );
      })}
    </Grid>
  );
}

export function AboutDescription() {
  return <h2>A decision making tool.</h2>;
}

export function DecisionCard({ item }: { item: DecisionTypeItemsType }) {
  const { siteColors, colorTheme, themeState } = useTheme();

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{
        marginTop: 10,
        minHeight: "30vw",
        width: "90vw",
        backgroundColor: colorTheme.surface,
        borderWidth: 0,
      }}
    >
      <Card.Section>
        <Image
          src={
            "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          }
          height={160}
          alt="project-image"
        />
      </Card.Section>

      <Group
        position="apart"
        mt="md"
        mb="xs"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Text
          weight={"bolder"}
          style={{
            display: "flex",
            justifySelf: "center",
            fontSize: 16,
            marginTop: 10,
            textAlign: "center",
            color: siteColors.text.primary,
          }}
        >
          {item.displayName}
        </Text>
      </Group>

      <br />
      <div
        style={{
          color: siteColors.text.primary,
          fontSize: "1em",
        }}
      >
        <Text>{item.description}</Text>
      </div>

      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Button.Group
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            width: "100%",
          }}
        >
          <FeatureButton
            text={item.displayName}
            name={item.name}
            color={item.color}
          />
        </Button.Group>
      </div>
    </Card>
  );
}
