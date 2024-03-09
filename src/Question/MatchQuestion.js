import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState } from 'react';
import './Matching.css';

function MatchQuestion() {
  const [items, setItems] = useState([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
    { id: '4', content: 'Item 4' },
    { id: '5', content: 'Item 5' },
    { id: '6', content: 'Item 6' },
    { id: '7', content: 'Item 7' },
    { id: '8', content: 'Item 8' },
  ]);

  const correctOrder = [
    { id: '1', content: "Item 1" },
    { id: '2', content: "Item 2" },
    { id: '3', content: "Item 3" },
    { id: '4', content: "Item 4" },
    { id: '5', content: "Item 5" },
    { id: '6', content: "Item 6" },
    { id: '7', content: "Item 7" },
    { id: '8', content: "Item 8" },
  ];

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newItems = [...items];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };

  function checkOrder(finalOrder, correctOrder) {
    // Compare the length of the arrays
    if (finalOrder.length !== correctOrder.length) {
      return false;
    }

    // Check each item in the final order array against the corresponding item in the correct order array
    for (let i = 0; i < finalOrder.length; i++) {
      if (finalOrder[i].id !== correctOrder[i].id) {
        return false;
      }
    }

    // If we made it this far, the orders match
    return true;
  }

  const handleCheckOrder = () => {
    const finalOrder = items;
    const isCorrectOrder = checkOrder(finalOrder, correctOrder);
    console.log(isCorrectOrder);
  };

  return (
    <div className="containerMatch">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="columns">
              <div className="column">
                {items.slice(0, 4).map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <li
                        className="item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.content}
                      </li>
                    )}
                  </Draggable>
                ))}
              </div>
              <div className="column">
                {items.slice(4).map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index + 4}>
                    {(provided) => (
                      <li
                        className="item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.content}
                      </li>
                    )}
                  </Draggable>
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button className="reorder" onClick={handleCheckOrder}>
        Check Order
      </button>
    </div>
  );
}

export default MatchQuestion;
