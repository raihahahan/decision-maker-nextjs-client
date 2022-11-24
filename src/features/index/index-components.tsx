import { Grid, Text, Button, Card, Group, Image } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import FeatureButton from "../../common/components/buttons";
import { DecisionTypes, IDecision } from "../../common/types/decision-types";
import {
  DecisionTypeItems,
  DecisionTypeItemsType,
} from "../../common/utils/globals";
import { arrayToOrderedListString } from "../../common/utils/utils";
import { RemoveButton } from "../choiceForm/choiceForm-components";
import { breakpoints } from "../theme/theme-data";
import useTheme from "../theme/theme-hooks";
import useIndexList from "./index-hooks";

export function IndexButtons() {
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

export function IndexDescription() {
  return <h2>A decision making tool.</h2>;
}

export function DecisionCard({ item }: { item: DecisionTypeItemsType }) {
  const { siteColors, colorTheme, themeState } = useTheme();
  const router = useRouter();
  return (
    <Link
      style={{
        marginTop: 10,
        minHeight: "20vw",
        width: "90vw",
        borderWidth: 0,
      }}
      href={`/${item.name}`}
    >
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        style={{
          height: "100%",
          backgroundColor: colorTheme.surface,
          borderWidth: 0,
        }}
      >
        <Card.Section>
          <Image
            src={
              item.imgSrc ??
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
            {item.displayName + " Decision"}
          </Text>
        </Group>

        <br />
        <div
          style={{
            color: siteColors.text.primary,
            fontSize: "1em",
            marginBottom: 10,
          }}
        >
          {item.description.map((item, index) => {
            return (
              <>
                <Text>{index + 1 + ". " + item}</Text>
                <br />
              </>
            );
          })}
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
              name={item.name as any}
              color={item.color}
              extraStyles={{ width: "100%", margin: 0 }}
            />
          </Button.Group>
        </div>
      </Card>
    </Link>
  );
}

export function IndexGetList({
  res,
  type,
}: {
  res: IDecision[];
  type: DecisionTypes;
}) {
  const { buttonHandlers } = useIndexList(type, res);
  if (!res || res?.length <= 0) {
    return <p>No decisions created yet.</p>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 300 }}>
      {res.map((item) => {
        return (
          <div style={{ margin: 10, display: "flex", flexDirection: "row" }}>
            <Button
              style={{ width: "100%", height: 100 }}
              color={"teal"}
              onClick={() => buttonHandlers.onClick(item)}
            >
              <h3>{item.name}</h3>
            </Button>
            <RemoveButton onClick={() => buttonHandlers.onClickRemove(item)} />
          </div>
        );
      })}
    </div>
  );
}
