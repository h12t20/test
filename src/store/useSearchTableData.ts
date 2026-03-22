import {DataType} from "../MainTable";
import { create } from 'zustand';
import {useTableData} from "./useTableData";

type State = {
    searchValue: string;
    searchTableData: DataType[] | undefined;
    setSearchValue: (searchValue: string) => void;
    filterTableData: () => void;
};

export const useSearchTableData = create<State>((set) => ({
    searchValue: '',
    searchTableData: useTableData.getState().tableData,
    setSearchValue: (newSearchValue: string) => set({searchValue: newSearchValue}),
    filterTableData: () => set((state) => ({
        searchTableData: useTableData.getState().tableData?.filter(data =>
            data.name.toLowerCase().includes(state.searchValue.toLowerCase()) ||
            data.date.format('DD.MM.YYYY').toLowerCase().includes(state.searchValue.toLowerCase()) ||
            data.age.toLowerCase().includes(state.searchValue.toLowerCase())
        ),
    }))
}))

export default useSearchTableData;