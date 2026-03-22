import {DataType} from "../MainTable";
import { create } from 'zustand';
import {Key} from "react";

type State = {
    tableData: DataType[] | undefined;
    addNewRow: (newRow: DataType) => void;
    changeRow: (newRow: DataType) => void;
    deleteRow: (id: Key | undefined) => void;
};

export const useTableData = create<State>((set) => ({
    tableData: undefined,
    addNewRow: (newRow: DataType) => set((state) => ({tableData: state.tableData? [...state.tableData, newRow]: [newRow]})),
    deleteRow: (id: Key | undefined) => set((state) => ({tableData: state.tableData?.filter(data=>data.key !== id)})),
    changeRow: (newRow: DataType) => set((state) => ({tableData: state.tableData?.map(data=>data.key === newRow.key? newRow:data)})),
}))
export default useTableData;
