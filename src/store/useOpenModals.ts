import { create } from 'zustand';
import {Key} from "react";

type State = {
    openAddRowModal: boolean;
    deleteRowId: Key | undefined;
    setOpenAddRowModal: (value: boolean) => void;
    setDeleteRowId: (value: Key | undefined) => void;
};

export const useOpenModals = create<State>((set) => ({
    openAddRowModal: false,
    deleteRowId: undefined,
    setOpenAddRowModal: (value) => set({openAddRowModal: value}),
    setDeleteRowId: (value: Key | undefined) => set({deleteRowId: value}),
}))
export default useOpenModals;