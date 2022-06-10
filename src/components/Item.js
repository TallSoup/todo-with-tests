import React, { useState, useRef } from 'react';

const Item = (props) => {
  const [editable, setEditable] = useState(false);
  const inputRef = useRef(props.item);

  const checkHandler = (event) => {
    event.preventDefault();
    props.check(props.item, props.itemID, props.listID, props.listType);
  };
  const deleteHandler = (event) => {
    event.preventDefault();
    props.delete(props.item, props.listID, props.listType);
  };

  const editHandler = (event) => {
    event.preventDefault();
    setEditable(true);
  };

  const sendEdit = (event) => {
    event.preventDefault();
    setEditable(false);
    props.edit(
      props.itemID,
      inputRef.current.value,
      props.listID,
      props.listType
    );
  };

  return (
    <li>
      {editable ? (
        <input type='text' ref={inputRef} defaultValue={props.item} />
      ) : (
        props.item
      )}
      {editable && <button onClick={sendEdit}>✔️</button>}
      {!editable && (
        <>
          <button data-cy='doneButton' type='button' onClick={checkHandler}>
            {props.listType === 'todo' ? 'Done' : 'Not Done'}
          </button>
          <button onClick={editHandler}>Edit</button>
          <button data-cy='deleteButton' onClick={deleteHandler}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default Item;
