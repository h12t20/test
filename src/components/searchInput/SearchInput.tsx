import React, {ChangeEvent} from "react";
import {Input} from 'antd';
import useSearchTableData from "../../store/useSearchTableData";
const AddRowButton: React.FC = () => {
    const {setSearchValue} = useSearchTableData();
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const currValue = e.target.value.toLowerCase();
        setSearchValue(currValue);
    };
    return (
        <Input
            placeholder="Поиск по всем полям"
            onChange={handleSearch}
        />
    )

}
export default AddRowButton;
