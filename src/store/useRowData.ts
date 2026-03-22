import {DataType} from "../components/table/MainTable";
import { create } from 'zustand';

type State = {
    rowData: DataType | undefined;
    editRow: (newRow: DataType | undefined) => void;
};

export const useRowData = create<State>((set) => ({
    rowData: undefined,
    editRow: (newRow: DataType | undefined) => set({rowData: newRow}),
}))
export default useRowData;
