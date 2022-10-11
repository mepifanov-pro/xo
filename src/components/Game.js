import { useEffect, useState } from "react";
import cn from 'classnames'

const defaultField = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

function Game() {
    const [field, setField] = useState(defaultField)
    const [player, setPlauer] = useState(1)
    const [isViner, setIsViner] = useState(false)


    const changeClick = (rowId, colId) => {
        const newField = field.map(supField => ([...supField]));

        if (player === 1) {
            newField[rowId][colId] = 'x';
            setField(newField)
            setPlauer(2)

            return;
        }

        newField[rowId][colId] = 'o';
        setField(newField)
        setPlauer(1)
    }

    useEffect(() => {
        
    }, [field])


    return (
        <div className="tab">
            <div>
                <h1>Ходит игрок {player}</h1>
            </div>
            <table className="table">
                {field.map((subField, i) => (
                    <tr key={i}>
                        {subField.map((ceil, j) => (
                            <td
                                key={j + i} onClick={() => changeClick(i, j)}
                                className={cn({
                                    cross: ceil === 'x',
                                    circle: ceil === 'o',
                                    disabled: ceil === 'x' || ceil === 'o' || isViner
                                })}
                            />
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Game;