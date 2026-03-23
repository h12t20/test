import React from 'react';
import MainTable from "./components/table/MainTable";
import AddRowButton from "./components/row/AddRowButton";
import AddOrEditRowModal from "./components/row/AddOrEditRowModal";
import useRowData from "./store/useRowData";
import useOpenModals from "./store/useOpenModals";
import DeleteRowModal from "./components/row/DeleteRowModal";
import SearchInput from "./components/searchInput/SearchInput";

function Test() {
    const {openAddRowModal, setOpenAddRowModal} = useOpenModals();
    const {rowData} = useRowData();
    const {deleteRowId} = useOpenModals();
    const setOpenModal = ()=> setOpenAddRowModal(true)
  return (
      <div className={'p-20 bg-amber-400 w-full flex flex-col items-center justify-center'}>
          <div className={'flex flex-col items-start justify-center gap-5 overflow-x-auto'}>
              <div className={'flex gap-5'}>
                  <AddRowButton onClick={setOpenModal}/>
                  <SearchInput />
              </div>
              <MainTable/>
              {(openAddRowModal || rowData) && <AddOrEditRowModal />}
              {deleteRowId && <DeleteRowModal />}
          </div>
      </div>

  );
}

export default Test;
