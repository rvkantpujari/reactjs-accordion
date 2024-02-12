import './Accordion.css';
import React, { useState } from 'react'
import AccData from '../../utils/data.js'

function Accordian() {
    // Manage State: Single Selection
    const [selected, setSelected] = useState(null);
    // Manage State: Multiple Selection
    const [multiSelection, setMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    const handleSingleSelection = (selectedId) => {
        setSelected(selected === selectedId ? null : selectedId);
    }

    const handleMultipleSelection = (selectedId) => {
        !multiple.includes(selectedId) ? setMultiple([...multiple, selectedId]) : setMultiple(multiple.filter((id)=> id!==selectedId));
        
    }

    const handleMultipleSelectionBtn = () => {
        setMultiSelection(!multiSelection)
        multiSelection ? setSelected(null) : setMultiple([]);
    }

    return (
        <div className='container'>
            <h2>Accordion</h2>
            {
                AccData && AccData.length > 0 ?
                <div className='wrapper'>
                    Click to <button 
                        className={multiSelection ? 'btn-off' : 'btn-on'}
                        onClick={()=>handleMultipleSelectionBtn()}
                    >
                        {multiSelection ? 'Disable ' : 'Enable '} Multi-Selection
                    </button>
                    {AccData.map((data) => {
                        return (
                            <div 
                                className='accordian' 
                                key={data.id} 
                                onClick={
                                    multiSelection ? () => handleMultipleSelection(data.id) 
                                    : () => handleSingleSelection(data.id)
                                }
                            >
                                <div className='title'>
                                    {/* question */}
                                    {data.question}
                                    {/* icon or symbol */}
                                    {
                                        selected !== data.id ?
                                        <span className='icon'>+</span>
                                        : <span className='icon'>-</span>
                                    }
                                </div>
                                {
                                    multiSelection ? 
                                    multiple.includes(data.id) && 
                                    <div className='content'>
                                        {/* answer */}
                                        {data.answer}
                                    </div>
                                    : selected === data.id &&
                                    (<div className='content'>
                                        {/* answer */}
                                        {data.answer}
                                    </div>)
                                }
                            </div>
                        )
                    })}
                </div>
                : <div>Data Not Found.</div>
            }
        </div>
    )
}

export default Accordian