import React, {useCallback} from "react";
import { Button, Modal } from 'antd';
import useTableData from "./store/useTableData";
import useOpenModals from "./store/useOpenModals";

const DeleteRowModal: React.FC = () => {
    const {deleteRow} = useTableData();
    const {deleteRowId, setDeleteRowId} =useOpenModals();
    const handleDeleteRow = useCallback(()=> {
        deleteRow(deleteRowId);
        setDeleteRowId(undefined);
    }, [deleteRow, deleteRowId, setDeleteRowId]);
    const handleCancel = useCallback(() => setDeleteRowId(undefined), [setDeleteRowId]);
return (
    <Modal
        open={!!deleteRowId}
        title="Подтвердите удаление записи!"
        onCancel={handleCancel}
        footer={() => (
            <>
                <Button onClick={handleCancel}>Отмена</Button>
                <Button onClick={handleDeleteRow}>Да, удалить!</Button>
            </>
        )}
    >
        <p>Вы действительно хотите удалить эту запись?</p>
    </Modal>)
}
export default DeleteRowModal;