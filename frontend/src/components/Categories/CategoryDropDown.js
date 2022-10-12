import React, { useEffect } from 'react'
import Select from 'react-select'


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const categoryDropDown = () => {
    return (
        <Select options={options} />
    )
}
export default categoryDropDown;