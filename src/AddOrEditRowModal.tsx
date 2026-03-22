import React, {useCallback} from "react";
import {Modal } from 'antd';
import useOpenModals from "./store/useOpenModals";
import useRowData from "./store/useRowData";
import RowForm from "./RowForm";
const AddOrEditRowModal: React.FC = () => {
   const {openAddRowModal, setOpenAddRowModal} = useOpenModals();
   const{ rowData, editRow } = useRowData();

    const handleCancel = useCallback(() => {
        setOpenAddRowModal(false)
        editRow(undefined)
    }, [editRow, setOpenAddRowModal]);
    return (
        <Modal
            open={openAddRowModal || !!rowData }
            title={`${!rowData? 'Добавление новой': 'Редактирование'} записи`}
            onCancel={handleCancel}
            footer={() => (<></>)}
        >
           <RowForm handleCancel={handleCancel}/>
        </Modal>)
}
export default AddOrEditRowModal;