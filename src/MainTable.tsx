import React, {Key, useCallback} from 'react';
import {Space, Table} from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import useTableData from "./store/useTableData";
import useRowData from "./store/useRowData";
import useOpenModals from "./store/useOpenModals";
import dayjs from "dayjs";
import useSearchTableData from "./store/useSearchTableData";

export type DataType = {
    key: Key;
    name: string;
    date: dayjs.Dayjs;
    age: string;
}

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const MainTable: React.FC = () => {
    const {tableData} = useTableData();
    const {searchTableData, searchValue} = useSearchTableData();
    const {setDeleteRowId} = useOpenModals();
    const {editRow} = useRowData();
    const deleteRowHandler = useCallback((id:Key)=>setDeleteRowId(id), [setDeleteRowId])
    const editRowHandler = useCallback((rowData:DataType)=>editRow(rowData), [editRow])
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Имя',
            dataIndex: 'name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.name > b.name? -1: 1,
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            defaultSortOrder: 'descend',
            render: (text) => (
                text.format('DD.MM.YYYY')
            ),
            sorter: (a, b) => a.date > b.date? -1: 1,
        },
        {
            title: 'Возраст',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.date > b.date? -1: 1,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="medium">
                    <EditOutlined onClick={()=>editRowHandler(record)}/>
                    <CloseOutlined onClick={()=>deleteRowHandler(record.key)}/>
                </Space>
            ),
        },
    ];
    console.log(tableData)
    console.log(searchTableData);
    console.log(searchValue);
    return (
        <Table<DataType>
            columns={columns}
            dataSource={searchTableData ?? tableData}
            onChange={onChange}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
    );
}

export default MainTable;