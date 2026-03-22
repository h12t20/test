import React, {memo} from 'react';
import {Button, Form, Input, Space, DatePicker} from 'antd';
import {DataType} from "../table/MainTable";
import useRowData from "../../store/useRowData";
import { useForm, Controller } from 'react-hook-form';
import useTableData from "../../store/useTableData";
import { zodResolver } from '@hookform/resolvers/zod';
import {RowFormType, tableRowSchema} from "../../zod/schema";
import { v4 as uuid4 } from 'uuid';

type Props = {
    handleCancel: () => void;
}

const RowForm: React.FC<Props> = memo(({handleCancel}) => {
    const {rowData} = useRowData();
    const {changeRow, addNewRow} = useTableData();
    const { control, handleSubmit, formState: { errors } } = useForm<RowFormType>({
        defaultValues: rowData
        ? { ...rowData, age: String(rowData.age) } // Приведение к строке
        : { key: '', name: '', date: '', age: '' } ?? {
            key: '',
            name: '',
            date: '',
            age: ''
        },
        resolver: zodResolver(tableRowSchema),
    });
    const onSubmit = (data: DataType) => {
        const dataWithKey = {
            ...data,
            key: uuid4()
        };
        const dataForSubmit = rowData? data: dataWithKey
        rowData ? changeRow(dataForSubmit): addNewRow(dataForSubmit);
       handleCancel()
    }


    return (
        <Form name="RowForm" id="RowForm" layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <Form.Item<DataType>
                label="Имя"
                name="name"
                validateStatus={errors.name ? 'error' : ''}
                help={errors.name?.message}
            >
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="Введите имя" />}
                />
            </Form.Item>

            <Form.Item<DataType>
                label="Дата"
                name="date"
            >
                <Controller
                    name="date"
                    control={control}
                    rules={{ required: 'Дата обязательна' }}
                    render={({ field, fieldState }) => (
                        <>
                            <DatePicker
                                {...field}
                                format={'DD.MM.YYYY'}
                                status={fieldState.error ? 'error' : ''}
                                onChange={(date) => field.onChange(date)}
                            />
                            {fieldState.error && (
                                <div style={{ color: 'red' }}>{fieldState.error.message}</div>
                            )}
                        </>
                    )}
                />
            </Form.Item>

            <Form.Item<DataType>
                label="Возраст"
                name="age"
                validateStatus={errors.age ? 'error' : ''}
                help={errors.age?.message}
            >
                <Controller
                    name="age"
                    control={control}
                    render={({ field }) => <Input {...field } placeholder="Введите возраст" />}
                />

            </Form.Item>
            <Space size="medium">
                <Button onClick={handleCancel} type="default">Отмена</Button>
                <Button type="default" htmlType="submit">Сохранить</Button>
            </Space>

        </Form>
    )
})

export default RowForm;