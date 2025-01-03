import { DatePicker } from 'antd';
import React from 'react';
export default function Homepage() : React.JSX.Element {
    return (
        <div>
            <strong>Homepage</strong>

            <DatePicker.RangePicker/>

        </div>
    )
}