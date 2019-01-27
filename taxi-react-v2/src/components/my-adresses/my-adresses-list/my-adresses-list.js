import React from 'react';


const MyAdressesList = (props) => {

    const {data, changeData} = props;

    const el = data.map((item) => {
        return (
            <li key={item.idx} onClick={() => changeData(item)}>
                <h4>{item.name}</h4>
                <p>{item.adress}</p>
            </li>
        )
    })

    return (
        <ul>
            {el}
        </ul>
    )
}

export default MyAdressesList;