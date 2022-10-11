import { useCallback, useEffect, useState } from "react";
import cn from 'classnames'

const defaultField = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

const startScore = [0, 0];


function Game() {
    const [field, setField] = useState(defaultField)
    const [player, setPlauer] = useState(1)
    const [isViner, setIsViner] = useState(false)
    const [isDraw, setIsDraw] = useState(false)
    const [score, setScore] = useState(startScore)

    // ищет победителя
    const checkIfIsWinner = useCallback((field) => {
        for (let i = 0; i < field.length; i++){
            for (let j = 0; j < field.length; j++){
                if ((field[i][0] === field[i][1] && field[i][0] === field[i][2]) && field[i][j] !== null){
                    setIsViner((isViner) => !isViner)
                    return true;
                }
                if ((field[0][j] === field[1][j] && field[0][j] === field[2][j]) && field[i][j] !== null){
                    setIsViner((isViner) => !isViner)
                    return true;
                    
                }
                if (field[0][0] === field[1][1] && field[0][0] === field[2][2] && field[0][0] !== null){
                    setIsViner((isViner) => !isViner)
                    return true;
                }
                if ((field[2][0] === field[1][1] && field[2][0] === field[0][2]) && field[2][0] !== null){
                    setIsViner((isViner) => !isViner)
                    return true;
                }
            }
        }

        setIsDraw(field.flat().every((cell) => cell !== null))

        return false;
    }, [])

    // обрабатываем клик по полю
    const changeClick = (rowId, colId) => {
        const newField = field.map(supField => ([...supField]));

        if (player === 1) {
            newField[rowId][colId] = 'x';
        } else {
            newField[rowId][colId] = 'o'; 
        }

        setField(newField)

        if (checkIfIsWinner(newField)) return;

        setPlauer((player) => player === 1 ? 2 : 1)
    }

    const revansh = (pl) => {
        
        setPlauer((player) => player === 1 ? 2 : 1)
        setIsViner(false)
        setField(defaultField)
        setIsDraw(false)

        let newScore = score.map(supScore => ([...supScore]));
        
        if (pl === 1){
            newScore[0] = score[0] + 1 
            setScore(newScore)
        }
        if (pl === 2){
            newScore[1] = score[1] + 1 
            setScore(newScore)
        }

    }


    return (
        <div className="tab">
            <div>
                <h1>Счет: {score[0] + ' : ' + score[1]}</h1>

                {isDraw && (
                    <h1>Ничья</h1>
                )}

                {!isDraw && isViner && (
                    <h1>Выиграл игрок {player}</h1>
                )}

                {!isDraw && !isViner && (
                    <h1>Ходит игрок {player}</h1>
                )}
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
            {(isViner || isDraw) && <button className="btn" onClick={() => {revansh(player)}}>Играть еще</button>}
        </div>
    )
}

export default Game;