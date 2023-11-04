//NPM Imports
import React, { useRef, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { observer } from "mobx-react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

//Local Imports
import { useRootStore } from "../../providers/RootStoreProvider";
import { SettingsInformationModelType } from "../../models/settings-information-model";

const FileNameSettings: React.FC = observer(() => {
  const { settings }: { settings: SettingsInformationModelType } =
    useRootStore();
  const toast = useRef(null);

  const initialItems = settings.outputStringOptions;

  const [items, setItems] = useState(initialItems);
  const [updating, setUpdating] = useState(false);

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Output String Updated Successfully",
      life: 3000,
    });
  };

  const exampleString = () => {
    return items
      .map((item) => {
        if (item.content === "Name") {
          return "Prime Oak";
        } else if (item.content === "Brand") {
          return "Polytec";
        } else if (item.content === "Finish") {
          return "Woodmatt";
        }
      })
      .join("_");
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  const updateFileName = () => {
    setUpdating(true);
    settings.updateOutputString(items);
    setTimeout(() => {
      setUpdating(false);
    }, 300);
    showSuccess();
  };

  return (
    <div className="flex flex-col items-center justify-center space-x-4 p-4 ">
      <Toast ref={toast} />
      <h2>Example</h2>
      <p>{exampleString()}</p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div
              className="flex space-x-4 p-4 bg-slate-100 rounded shadow"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      className="p-4 bg-blue-400 text-white rounded cursor-move"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        label="Submit"
        className="mt-4 px-6 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded shadow"
        onClick={() => updateFileName()}
        icon="pi pi-check"
        loading={updating}
      />
    </div>
  );
});

export default FileNameSettings;
