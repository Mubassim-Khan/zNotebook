import React, { useState } from 'react'

export const NoteItem = (props) => {
    // Context of Notes
    const { note, updateNote, delNote } = props;
    // To change the icon of options and close
    const [toggle, setToggle] = useState("ellipsis");
    const toggleButton = () => {
        setToggle((prevToggle) => (prevToggle === "ellipsis" ? "xmark" : "ellipsis"));
    };

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="cards card-body mb-2 mt-2">
                    <div className="d-inline-flex align-items-center gap-1">
                        {/* Note Title */}
                        <h5 className="card-title">{note.title}</h5>
                        {/* Options Button */}
                        <i
                            className={`fa-solid fa-${toggle} position-absolute top-0 end-0 mx-2 mt-2`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#multiCollapseExample${note.id}`}
                            aria-expanded="false"
                            aria-controls={`multiCollapseExample${note.id}`}
                            onClick={toggleButton}
                        >
                            {/* Delete & Edit Buttons */}
                            <div className="collapse multi-collapse" id={`multiCollapseExample${note.id}`}>
                                <div className="d-flex flex-column">
                                    {/* Delete Note btn */}
                                    <i className="fa-solid fa-trash my-2" onClick={() => { delNote(note) }} ></i>
                                    {/* Update Note btn */}
                                    <i className="fa-solid fa-pen-to-square my-2" onClick={() => { updateNote(note) }}></i>
                                </div>
                            </div>
                        </i>
                    </div>
                    {/* Note Description */}
                    <p className="card-text">{note.content}</p>
                </div>
            </div>
        </div>
    )
}