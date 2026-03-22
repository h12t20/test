import { create } from 'zustand';

type State = {
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
};

export const useSearchTableData = create<State>((set) => ({
    searchValue: '',
    setSearchValue: (newSearchValue: string) => set({searchValue: newSearchValue}),
}))

export default useSearchTableData;