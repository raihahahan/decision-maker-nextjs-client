import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useDecisionGenerics from "../../common/hooks/useDecisionGenerics";
import { DecisionTypes, IDecision } from "../../common/types/decision-types";
import { pathCombine } from "../../common/utils/api-utils";
import CONSTANTS from "../../common/utils/constants";
import { TUseIndexList } from "./index-types";

export default function useIndexList(
  type: DecisionTypes,
  res: IDecision[]
): TUseIndexList {
  const [selected, setSelected] = useState<IDecision[]>([]);
  const router = useRouter();

  const { decisionActions, decisionApi } = useDecisionGenerics(type);

  const buttonHandlers = {
    onClick(item: IDecision) {
      router.push(`/${type}/${item.id}`);
    },
    onClickRemove(item: IDecision) {
      const confirmation = confirm("Are you sure?");
      if (!confirmation) return;
      decisionApi?.delete(item.id as number);
      decisionActions?.remove(item.id as number);
    },
    onClickMasterRemove() {
      if (selected.length <= 0) {
        alert("Please select at least 1 item.");
        return;
      }
      const confirmation = confirm("Are you sure?");
      if (!confirmation) return;
      selected.forEach((item) => {
        decisionApi?.delete(item.id as number);
        decisionActions?.remove(item.id as number);
      });
      setSelected([]);
    },
    onClickEdit(item: IDecision) {
      let _item = { ...item };
      _item.updatedAt = new Date().toISOString();
      decisionApi?.put(_item.id as number, _item as any);
      router.push(`/${type}/${_item.id}`);
    },
    onClickAdd() {
      router.push(pathCombine(true, type, CONSTANTS.ACTION_METHODS.CREATE));
    },
    onClickEditInput(item: IDecision) {
      router.push({ pathname: pathCombine(true, type, item.id?.toString() as string, CONSTANTS.ACTION_METHODS.INPUT) });
      this.onClickEdit(item);
    },
    onClickResult(item: IDecision) {
      router.push(pathCombine(true, type, item.id?.toString() as string, CONSTANTS.ACTION_METHODS.RESULT));
    },
  };

  const tableHandlers = {
    onSelectTop() {
      if (selected.length == res.length) {
        setSelected([]);
      } else {
        setSelected(res);
      }
    },
    onSelect(item: IDecision) {
      if (selected.find((i) => i.id == item.id)) {
        setSelected((i) => i.filter((_item) => _item.id != item.id));
      } else {
        setSelected((i) => [...i, item]);
      }
    },
  };

  const checkBoxChecked = (element: IDecision): boolean =>
    selected.find((i) => i.id == element.id) != undefined;
 
  const topCheckBoxChecked = selected.length == res.length && res.length != 0;
  return {
    buttonHandlers,
    tableHandlers,
    selectedHandlers: { selected, setSelected },
    checkBoxChecked,
    topCheckBoxChecked,
  };
}

export function useIndexTable(type: DecisionTypes, res: IDecision[]) {
  const indexVarList = useIndexList(type, res);

  return {
    indexVarList,
  };
}

export function useIndexPagination(type: DecisionTypes) {
  const router = useRouter();
  const { decisionApi, decisionLocalData } = useDecisionGenerics(type);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    decisionApi
      ?.totalPages()
      .then((i) => (typeof i == "number" ? setTotalPages(i) : null));
  }, [, decisionLocalData]);

  const initialPage = +(router.query?.pageNum as string)
    ? +(router.query?.pageNum as string)
    : 1;
  const [currPage, setCurrPage] = useState<number>(initialPage);

  const onClickPage = (pageNum: number) => {
    if (pageNum == 0 || totalPages == 1) return;
    setCurrPage(pageNum);
    const currQueries = router.query;
    router.push({ pathname: `/${type}`, query: { ...currQueries, pageNum } });
  };

  return {
    onClickPage,
    currPageHandlers: { currPage, setCurrPage },
    totalPages,
  };
}

export function useIndexQueryListener(type: DecisionTypes): void {
  const { decisionActions, decisionApi } = useDecisionGenerics(type);
  const router = useRouter();

  useEffect(() => {
    if (
      router.query?.pageNum ||
      router.query?.sortorder ||
      typeof router.query?.q == "string"
    ) {
      const pageNumber = router.query?.pageNum ?? undefined;
      const sortorder = router.query?.sortorder ?? undefined;
      const q = router.query?.q ?? undefined;
      const params = { pageNumber, sortorder, q };
      decisionApi
        ?.get(params as any)
        .then((i: IDecision[]) => decisionActions?.set(i as any));
    }
  }, [router.query]);
}

export function useIndexSearch(type: DecisionTypes) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const onSubmitSearch = () => {
    router.push({ pathname: `/${type}`, query: { q: search } });
  };

  // helper functions
  const searchHelpers = {
    onSubmitForm(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      onSubmitSearch();
    },
    onChange(e: ChangeEvent<HTMLInputElement>) {
      setSearch(e.target.value);
    },
    onClickSearchBarCrossIcon() {
      setSearch("");
    },
  };

  return {
    searchHandlers: { search, setSearch },
    onSubmitSearch,
    searchHelpers,
  };
}

export function useIndexFilterButton(type: DecisionTypes) {
  const [opened, setOpened] = useState<boolean>(false);

  const router = useRouter();
  function pushSort(sortorder: string) {
    const currQueries = router.query;
    router.push({ pathname: `/${type}`, query: { ...currQueries, sortorder } });
    setOpened(false);
  }

  return { opened, setOpened, pushSort };
}
