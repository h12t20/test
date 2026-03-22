import React, {ChangeEvent, memo} from "react";
import {Input} from 'antd';
import useSearchTableData from "../../store/useSearchTableData";
const AddRowButton: React.FC = memo(() => {
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

})
export default AddRowButton;
