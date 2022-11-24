import {
  Grid,
  Text,
  Button,
  Card,
  Group,
  Image,
  Table,
  Checkbox,
  Select,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FiArrowDown,
  FiDelete,
  FiEdit,
  FiEye,
  FiPlus,
  FiTrash,
} from "react-icons/fi";
import FeatureButton from "../../common/components/buttons";
import { DecisionTypes, IDecision } from "../../common/types/decision-types";
import {
  DecisionTypeItems,
  DecisionTypeItemsType,
} from "../../common/utils/globals";
import { capitalizeFirstLetter } from "../../common/utils/utils";
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
  const {
    buttonHandlers,
    selectedHandlers,
    tableHandlers,
    checkBoxChecked,
    topCheckBoxChecked,
  } = useIndexList(type, res);
  const { siteColors, themeState } = useTheme();

  const rows = res.map((element, index) => {
    return (
      <tr key={element.id}>
        <td>
          <Checkbox
            key={selectedHandlers.selected.length}
            checked={checkBoxChecked(element)}
            onClick={() => tableHandlers.onSelect(element)}
          />
        </td>
        <td style={{ color: siteColors.text.primary }}>{element.id}</td>
        <td style={{ color: siteColors.text.primary }}>{element.name}</td>
        <td style={{ color: siteColors.text.primary }}>
          {new Date(element.createdAt as string).toDateString()}
        </td>
        <td style={{ color: siteColors.text.primary }}>
          {new Date(element.updatedAt as string).toDateString()}
        </td>
        <td style={{ color: siteColors.text.primary }}>
          <Link href={`/${type}/${element.id}`}>
            <FiEdit
              style={{
                margin: 10,
                color: themeState == "light" ? "green" : "lime",
              }}
            />
          </Link>
          <Link href={"#"}>
            <FiDelete
              onClick={() => buttonHandlers.onClickRemove(element)}
              style={{ margin: 10, color: "red" }}
            />
          </Link>
        </td>
        <td>
          <Link href={`/${type}/${element.id}/result`}>
            <FiEye
              style={{
                color: siteColors.text.primary,
              }}
            />
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "purple",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <div>
          <h1 style={{ color: "white", paddingLeft: 15 }}>
            {capitalizeFirstLetter(type)} Decisions
          </h1>
        </div>
        <div style={{ paddingRight: 10 }}>
          <Button
            size="md"
            color="red"
            style={{ margin: 5 }}
            onClick={buttonHandlers.onClickMasterRemove}
          >
            <FiTrash style={{ marginRight: 10 }} />
            Delete
          </Button>
          <Button
            size="md"
            color="green"
            style={{ margin: 5 }}
            onClick={buttonHandlers.onClickAdd}
          >
            <FiPlus style={{ marginRight: 10 }} />
            Create new decision
          </Button>
        </div>
      </div>
      {/* <div style={{ display: "flex" }}>
        <TextInput placeholder="Search" />
        <Select
          placeholder="Sort"
          data={[
            { value: "", label: "Default" },
            { value: "name_desc", label: "Name" },
            { value: "Date", label: "Created At" },
            { value: "updated", label: "Updated At" },
          ]}
        />
        <Select
          placeholder="Filter"
          data={[
            { value: "react", label: "React" },
            { value: "ng", label: "Angular" },
            { value: "svelte", label: "Svelte" },
            { value: "vue", label: "Vue" },
          ]}
        />
      </div> */}

      <Table
        style={{
          backgroundColor: siteColors.header,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
        horizontalSpacing="xl"
        verticalSpacing="md"
        fontSize="lg"
      >
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={topCheckBoxChecked}
                onClick={tableHandlers.onSelectTop}
              />
            </th>
            <th style={{ color: siteColors.text.primary }}>ID</th>
            <th style={{ color: siteColors.text.primary }}>Decision Name</th>
            <th style={{ color: siteColors.text.primary }}>Created at</th>
            <th style={{ color: siteColors.text.primary }}>Updated at</th>
            <th style={{ color: siteColors.text.primary }}>Actions</th>
            <th style={{ color: siteColors.text.primary }}>Result</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}
