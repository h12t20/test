import React, {memo} from "react";
import { Button} from 'antd';
type Props = {
    onClick: ()=>void
}
const AddRowButton: React.FC<Props> = memo(({onClick}) => {
    return (
        <Button type="primary" onClick={onClick}>Добавить строку</Button>
        )

})
export default AddRowButton;
