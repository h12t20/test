import React from "react";
import { Button} from 'antd';
type Props = {
    onClick: ()=>void
}
const AddRowButton: React.FC<Props> = ({onClick}) => {
    return (
        <Button type="primary" onClick={onClick}>Добавить строку</Button>
        )

}
export default AddRowButton;
