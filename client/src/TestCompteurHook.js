import React, {useState} from 'react';

export default function Component1bis(props) {
    let [counter, setCounter] = useState(0)

    return (
        <div onClick={() => setCounter(counter+1)}>
            Hello {props.name} ({counter}clicks)
        </div>
    )
}