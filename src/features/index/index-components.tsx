import {
  Grid,
  Text,
  Button,
  Card,
  Group,
  Image,
  Checkbox,
  TextInput,
  Pagination,
  ActionIcon,
  Menu,
} from "@mantine/core";
import { useRouter } from "next/router";
import {
  FiDelete,
  FiEdit,
  FiEye,
  FiFilter,
  FiPenTool,
  FiSearch,
  FiX,
} from "react-icons/fi";
import FeatureButton from "../../common/components/buttons";
import InputLayout from "../../common/components/inputLayout";
import { MyTable, TableTitleHeader } from "../../common/components/table";
import { DecisionTypes, IDecision } from "../../common/types/decision-types";
import {
  DecisionTypeItems,
  DecisionTypeItemsType,
} from "../../common/utils/globals";
import { formatDate, trimText } from "../../common/utils/utils";
import { breakpoints } from "../theme/theme-data";
import useTheme, { useGlobalMediaQuery } from "../theme/theme-hooks";
import {
  useIndexFilterButton,
  useIndexPagination,
  useIndexQueryListener,
  useIndexSearch,
  useIndexTable,
} from "./index-hooks";
import { TButtonProps, TUseIndexList } from "./index-types";
import Error from "../../common/components/error";

export function IndexButtons() {
  return (
    <Grid
      gutter="lg"
      align="stretch"
      style={{ margin: 10, maxWidth: breakpoints.lg + 100 }}
    >
      {DecisionTypeItems.map((item) => {
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
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{
        marginTop: 10,
        minHeight: "20vw",
        width: "90vw",
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
            text={"Create new"}
            name={item.name as any}
            color={item.color}
            extraStyles={{ width: "100%", margin: 0, borderTopLeftRadius: 0 }}
          />
          {/* <FeatureButton
            text="View history"
            name="error"
            link={`/${item.displayName.toLowerCase()}`}
            color={item.color}
            extraStyles={{ width: "50%", borderTopRightRadius: 0, margin: 0 }}
          /> */}
        </Button.Group>
      </div>
    </Card>
  );
}

export function IndexGetList({
  res,
  type,
}: {
  res: IDecision[];
  type: DecisionTypes;
}) {
  useIndexQueryListener(type);
  if (res == null || res == undefined) return <Error />;

  return (
    <InputLayout type={type} hideTitle>
      <>
        <IndexGetListSearchBar type={type} />
        <div></div>
        <SearchbarFilterButton type={type} />
        <br />
        <div style={{ minHeight: "50vh" }}>
          <IndexGetListTable res={res} type={type} />
        </div>
        <br />
        <IndexGetListPagination res={res} type={type} />
      </>
    </InputLayout>
  );
}

export function SearchbarFilterButton({ type }: { type: DecisionTypes }) {
  const { opened, setOpened, pushSort } = useIndexFilterButton(type);

  function DropDown() {
    return (
      <Menu opened={opened} shadow="md" width={200}>
        <Menu.Target>
          <Button
            style={{ marginTop: 10, display: "flex", alignSelf: "flex-start" }}
            onClick={() => setOpened((i) => !i)}
            rightIcon={<FiFilter />}
            color="teal"
            variant="default"
          >
            Sort by
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Sort by</Menu.Label>
          <Menu.Item onClick={() => pushSort("date_desc")}>
            Created at (newest to oldest)
          </Menu.Item>
          <Menu.Item onClick={() => pushSort("Date")}>
            Created at (oldest to newest)
          </Menu.Item>
          <Menu.Item onClick={() => pushSort("updated_desc")}>
            Updated at (newest to oldest)
          </Menu.Item>
          <Menu.Item onClick={() => pushSort("updated")}>
            Updated at (oldest to newest)
          </Menu.Item>
          <Menu.Item onClick={() => pushSort("name")}>Name</Menu.Item>
          <Menu.Item onClick={() => pushSort("name_desc")}>
            Name descending
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  }

  return <DropDown />;
}

export function IndexGetListSearchBar({ type }: { type: DecisionTypes }) {
  const { searchHandlers, onSubmitSearch, searchHelpers } =
    useIndexSearch(type);
  const { onSubmitForm, onChange, onClickSearchBarCrossIcon } = searchHelpers;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <form onSubmit={onSubmitForm}>
        <TextInput
          onSubmit={onSubmitSearch}
          value={searchHandlers.search}
          onChange={onChange}
          placeholder="Search"
          rightSectionWidth={100}
          rightSection={
            <>
              {searchHandlers.search.length > 0 && (
                <SearchBarCrossIcon onClick={onClickSearchBarCrossIcon} />
              )}
              <SearchBarSearchIcon onClick={onSubmitSearch} />
            </>
          }
          style={{ width: "100%" }}
          size="lg"
        />
      </form>
    </div>
  );
}

export function IndexGetListTable({
  res,
  type,
}: {
  res: IDecision[];
  type: DecisionTypes;
}) {
  const { indexVarList } = useIndexTable(type, res);

  const headers = <TableHeaders indexVarList={indexVarList} type={type} />;
  const rows = <TableRows res={res} indexVarList={indexVarList} type={type} />;

  return (
    <div style={{ minWidth: "60vw" }}>
      <TableTitleHeader indexVarList={indexVarList} type={type} />
      <MyTable headers={headers} rows={rows} />
    </div>
  );
}

export function IndexGetListPagination({
  res,
  type,
}: {
  res: IDecision[];
  type: DecisionTypes;
}) {
  const { onClickPage, currPageHandlers, totalPages } =
    useIndexPagination(type);
  const { currPage } = currPageHandlers;

  return (
    <Pagination
      key={totalPages}
      initialPage={currPage}
      page={currPage}
      onChange={onClickPage}
      total={totalPages}
    />
  );
}

// ======== components ========== //
function SearchBarCrossIcon({ onClick }: TButtonProps) {
  return (
    <ActionIcon>
      <FiX onClick={onClick} />
    </ActionIcon>
  );
}

function SearchBarSearchIcon({ onClick }: TButtonProps) {
  return (
    <ActionIcon onClick={onClick}>
      <FiSearch />
    </ActionIcon>
  );
}

function TableEditIcon({ onClick }: TButtonProps) {
  const { themeState } = useTheme();
  return (
    <ActionIcon aria-label="edit" onClick={onClick}>
      <FiEdit
        style={{
          color: themeState == "light" ? "green" : "lime",
        }}
      />
    </ActionIcon>
  );
}

function TableDeleteIcon({ onClick }: TButtonProps) {
  return (
    <ActionIcon onClick={onClick}>
      <FiDelete style={{ color: "red" }} />
    </ActionIcon>
  );
}

function TableEditInputIcon({ onClick }: TButtonProps) {
  const { siteColors } = useTheme();
  return (
    <ActionIcon onClick={onClick}>
      <FiPenTool
        style={{
          color: siteColors.text.primary,
        }}
      />
    </ActionIcon>
  );
}

function TableResultIcon({ onClick }: TButtonProps) {
  const { siteColors } = useTheme();
  return (
    <ActionIcon onClick={onClick}>
      <FiEye
        style={{
          color: siteColors.text.primary,
        }}
      />
    </ActionIcon>
  );
}

function TableRows({
  res,
  indexVarList,
  type,
}: {
  res: IDecision[];
  indexVarList: TUseIndexList;
  type: DecisionTypes;
}) {
  const { buttonHandlers, tableHandlers, selectedHandlers, checkBoxChecked } =
    indexVarList;
  const { sm } = useGlobalMediaQuery();
  const { siteColors } = useTheme();
  const router = useRouter();
  return (
    <>
      {res.map((element, index) => {
        return (
          <tr key={element.id}>
            <td>
              <Checkbox
                key={selectedHandlers.selected.length}
                checked={checkBoxChecked(element)}
                onClick={() => tableHandlers.onSelect(element)}
              />
            </td>
            {!sm && (
              <td style={{ color: siteColors.text.primary }}>{element.id}</td>
            )}
            <td style={{ color: siteColors.text.primary }}>
              {trimText(element.name, 28)}
            </td>
            {!sm && (
              <>
                <td style={{ color: siteColors.text.primary }}>
                  {formatDate(new Date(element?.createdAt as string))}
                </td>
                <td style={{ color: siteColors.text.primary }}>
                  {formatDate(new Date(element?.updatedAt as string))}
                </td>
              </>
            )}
            <td
              style={{
                color: siteColors.text.primary,
              }}
            >
              <TableEditIcon
                onClick={() => buttonHandlers.onClickEdit(element)}
              />
              <TableDeleteIcon
                onClick={() => buttonHandlers.onClickRemove(element)}
              />
            </td>
            {type != "random" && (
              <td>
                <TableEditInputIcon
                  onClick={() => buttonHandlers.onClickEditInput(element)}
                />
              </td>
            )}
            <td>
              <TableResultIcon
                onClick={() => buttonHandlers.onClickResult(element)}
              />
            </td>
          </tr>
        );
      })}
    </>
  );
}

function TableHeaders({
  indexVarList,
  type,
}: {
  indexVarList: TUseIndexList;
  type: DecisionTypes;
}) {
  const { tableHandlers, topCheckBoxChecked } = indexVarList;
  const { siteColors } = useTheme();
  const { sm } = useGlobalMediaQuery();
  return (
    <>
      <th>
        <Checkbox
          checked={topCheckBoxChecked}
          onClick={tableHandlers.onSelectTop}
        />
      </th>
      {!sm && <th style={{ color: siteColors.text.primary }}>ID</th>}
      <th style={{ color: siteColors.text.primary }}>Decision Name</th>
      {!sm && (
        <>
          <th style={{ color: siteColors.text.primary }}>Created at</th>
          <th style={{ color: siteColors.text.primary }}>Updated at</th>
        </>
      )}
      <th style={{ color: siteColors.text.primary }}>Actions</th>
      {type != "random" && (
        <th style={{ color: siteColors.text.primary }}>Input</th>
      )}
      <th style={{ color: siteColors.text.primary }}>Result</th>
    </>
  );
}
