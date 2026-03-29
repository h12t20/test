import React, {Key, memo, useCallback} from 'react';
import {Space, Table} from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import useTableData from "../../store/useTableData";
import useRowData from "../../store/useRowData";
import useOpenModals from "../../store/useOpenModals";
import dayjs from "dayjs";
import useSearchTableData from "../../store/useSearchTableData";

export type DataType = {
    key: Key;
    name: string;
    date: dayjs.Dayjs ;
    age: number;
}

const MainTable: React.FC = memo(() => {
    const {tableData} = useTableData();
    const {searchValue} = useSearchTableData();
    const {setDeleteRowId} = useOpenModals();
    const {editRow} = useRowData();
    const deleteRowHandler = useCallback((id:Key)=>setDeleteRowId(id), [setDeleteRowId])
    const editRowHandler = useCallback((rowData:DataType)=>editRow(rowData), [editRow])
    const filteredTableData = tableData?.filter(data =>
            data.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            data.date?.format('DD.MM.YYYY').toLowerCase().includes(searchValue.toLowerCase()) ||
            String(data.age).includes(searchValue.toLowerCase())
        )
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Имя',
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            width: 120, // Фиксированная ширина
            sorter: (a, b) => a.name < b.name? -1: 1,
            className: 'max-w-[120px] break-words whitespace-normal',
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            defaultSortOrder: 'descend',
            render: (text) => (
                text.format('DD.MM.YYYY')
            ),
            sorter: (a, b) => (a.age) < (b.age)? -1: 1,
        },
        {
            title: 'Возраст',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a, b) => (a.age) - (b.age),
        },
        {
            title: 'Действие',
            dataIndex: 'action',
            render: (_, record) => {
                const handleEdit = ()=> editRowHandler(record)
                const handleDelete = ()=> deleteRowHandler(record.key)
                return (
                    <Space size="medium">
                        <EditOutlined onClick={handleEdit}/>
                        <CloseOutlined onClick={handleDelete}/>
                    </Space>
                )
            }
        },
    ];
    return (
            <Table<DataType>
                className="[&_.ant-table]:text-[10px] md:[&_.ant-table]:text-sm"
                columns={columns}
                dataSource={filteredTableData}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />
    );
})

export default MainTable;