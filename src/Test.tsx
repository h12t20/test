import React from 'react';
import MainTable from "./MainTable";
import AddRowButton from "./AddRowButton";
import AddOrEditRowModal from "./AddOrEditRowModal";
import useRowData from "./store/useRowData";
import useOpenModals from "./store/useOpenModals";
import DeleteRowModal from "./DeleteRowModal";
import SearchInput from "./SearchInput";

function Test() {
    const {openAddRowModal, setOpenAddRowModal} = useOpenModals();
    const {rowData} = useRowData();
    const {deleteRowId} = useOpenModals();
    const setOpenModal = ()=> setOpenAddRowModal(true)
  return (
      <div className={'p-20 bg-amber-400 w-full flex flex-col items-center justify-center'}>
          <div className={'flex flex-col items-start justify-center gap-5'}>
              <div className={'flex flex-row gap-5 items-start'}>
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
