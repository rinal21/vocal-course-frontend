import React from 'react'

const TimePicker = ({ className, style, onChange, value }) => {
    return (
        <select class={className} style={style} id="year-picker" onChange={onChange} value={value}>
            <option value={''}></option>
            <option value={'08:20'}>08:20</option>
            <option value={'08:40'}>08:40</option>
            <option value={'09:00'}>09:00</option>
            <option value={'09:20'}>09:20</option>
            <option value={'09:40'}>09:40</option>
            <option value={'10:00'}>10:00</option>
            <option value={'10:20'}>10:20</option>
            <option value={'10:40'}>10:40</option>
            <option value={'11:00'}>11:00</option>
            <option value={'11:20'}>11:20</option>
            <option value={'11:40'}>11:40</option>
            <option value={'12:00'}>12:00</option>
            <option value={'12:20'}>12:20</option>
            <option value={'12:40'}>12:40</option>
            <option value={'13:00'}>13:00</option>
            <option value={'13:20'}>13:20</option>
            <option value={'13:40'}>13:40</option>
            <option value={'14:00'}>14:00</option>
            <option value={'14:20'}>14:20</option>
            <option value={'14:40'}>14:40</option>
            <option value={'15:00'}>15:00</option>
            <option value={'15:20'}>15:20</option>
            <option value={'15:40'}>15:40</option>
            <option value={'16:00'}>16:00</option>
            <option value={'16:20'}>16:20</option>
            <option value={'16:40'}>16:40</option>
            <option value={'17:00'}>17:00</option>
            <option value={'17:20'}>17:20</option>
            <option value={'17:40'}>17:40</option>
            <option value={'18:00'}>18:00</option>
            <option value={'18:20'}>18:20</option>
            <option value={'18:40'}>18:40</option>
            <option value={'19:00'}>19:00</option>
            <option value={'19:20'}>19:20</option>
            <option value={'19:40'}>19:40</option>
            <option value={'20:00'}>20:00</option>
        </select>
    )
}

export default TimePicker