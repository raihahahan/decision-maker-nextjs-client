import { Dispatch, SetStateAction } from "react";
import { IDecision } from "../../common/types/decision-types";

export interface TUseIndexList {
  buttonHandlers: {
    onClick(item: IDecision): void;
    onClickRemove(item: IDecision): void;
    onClickMasterRemove(): void;
    onClickEdit(item: IDecision): void;
    onClickAdd(): void;
    onClickEditInput(item: IDecision): void;
    onClickResult(item: IDecision): void;
  };
  selectedHandlers: {
    selected: IDecision[];
    setSelected: Dispatch<SetStateAction<IDecision[]>>;
  };
  tableHandlers: {
    onSelectTop(): void;
    onSelect(item: IDecision): void;
  };
  checkBoxChecked: (element: IDecision) => boolean;
  topCheckBoxChecked: boolean;
}

export interface TButtonProps {
  onClick: (args?: any) => void;
}
