import { Button, Table } from "@mantine/core";
import React, { CSSProperties } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { TUseIndexList } from "../../features/index/index-types";
import useTheme, {
  useGlobalMediaQuery,
} from "../../features/theme/theme-hooks";
import useDecisionColors from "../hooks/useDecisionColors";
import { DecisionTypes } from "../types/decision-types";
import { capitalizeFirstLetter } from "../utils/utils";

export function MyTable({
  headers,
  rows,
}: {
  headers: JSX.Element;
  rows: JSX.Element;
}) {
  const { siteColors } = useTheme();
  const { sm } = useGlobalMediaQuery();
  return (
    <Table
      style={{
        backgroundColor: siteColors.header,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
      horizontalSpacing={sm ? "md" : "xl"}
      verticalSpacing="md"
      fontSize={sm ? "md" : "lg"}
    >
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export function TableTitleHeader({
  indexVarList,
  type,
  disableDelete,
  disableCreate,
  styles,
  customTitle,
}: {
  type: DecisionTypes;

  indexVarList?: TUseIndexList;
  disableDelete?: boolean;
  disableCreate?: boolean;
  styles?: CSSProperties;
  customTitle?: string;
}) {
  const { elementColor } = useDecisionColors(type);
  const buttonHandlers = indexVarList?.buttonHandlers;
  const { sm } = useGlobalMediaQuery();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: elementColor,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        ...(styles as object),
      }}
    >
      <div>
        <h1
          style={{
            color: "white",
            paddingLeft: 15,
            fontSize: sm ? 17 : undefined,
          }}
        >
          {customTitle ?? capitalizeFirstLetter(type) + " Decisions"}
        </h1>
      </div>
      <div style={{ paddingRight: 10 }}>
        {!disableDelete && (
          <Button
            size={sm ? "sm" : "md"}
            color="red"
            style={{ margin: 5, borderColor: "white", borderWidth: 2 }}
            onClick={buttonHandlers?.onClickMasterRemove}
          >
            <FiTrash style={{ marginRight: sm ? 0 : 10 }} />
            {!sm && "Delete"}
          </Button>
        )}
        {!disableCreate && (
          <Button
            size={sm ? "sm" : "md"}
            color="green"
            style={{ margin: 5, borderColor: "white", borderWidth: 2 }}
            onClick={buttonHandlers?.onClickAdd}
          >
            <FiPlus style={{ marginRight: sm ? 0 : 10 }} />
            {!sm && "Create"}
          </Button>
        )}
      </div>
    </div>
  );
}
