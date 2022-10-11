import { useEffect, useState } from "react";
import cn from 'classnames';

const defaultField = [10, 10]
const rows = [...Array(defaultField[0]).keys()]
const cols = [...Array(defaultField[1]).keys()]


function GameTwo () {
    const [position, setPosition] = useState( [0, 0] )

    const handleKeyDown = (e) => {
        console.log(e.key);
        if (e.key === 'ArrowRight'){
            setPosition((prevposition)=>[prevposition[0], (prevposition[1] + 1) % defaultField[1]])
        }
        if (e.key === 'ArrowLeft'){
            setPosition((prevposition)=>[prevposition[0], prevposition[1] - 1])
        }
        if (e.key === 'ArrowUp'){
            setPosition((prevposition)=>[prevposition[0] - 1, prevposition[1]])
        }
        if (e.key === 'ArrowDown'){
            setPosition((prevposition)=>[prevposition[0] +1, prevposition[1]])
        }


    }
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])
    
    return (
        <div className="tabletwo">
            {rows.map((rowId)=>{
                return (
                    <div className="row" key={'rowId' + rowId}>
                        {cols.map(colId => {
                            return (
                                <div
                                    key={'rowId' + rowId + colId}
                                    className={cn('ceil', {
                                        elem: rowId === position[0] && colId === position[1]
                                    })}
                                />
                            )
                        })}
                    </div>
                )
            })}
          
            
        </div>
    )
}

export default GameTwo;