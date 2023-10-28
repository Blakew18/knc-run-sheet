//Npm Imports
import React from "react";
import { observer } from "mobx-react";
import { InputTextarea } from "primereact/inputtextarea";

//Local Imports
import { useRootStore } from "../../providers/RootStoreProvider";
import { JobInformationModelType } from "../../models/job-information-model";
import "./job-notes.css";

const JobNotes: React.FC = observer(() => {
  const { jobInformation }: { jobInformation: JobInformationModelType } =
    useRootStore();

  const updateJobSetOutNotes = (jobSetOutNotes: string) => {
    console.log(jobSetOutNotes);
    jobInformation.setJobSetOutNotes(jobSetOutNotes);
  };

  return (
    <div className="w-full h-full p-4">
      <span className="flex px-4">
        <h3 className="font-bold">Set out Notes:</h3>&nbsp;
        <p>(Example: Use off cut, board due date, lots of small parts, etc.)</p>
      </span>
      <div className="w-full h-full p-4">
        <InputTextarea
          value={jobInformation.jobSetOutNotes}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            updateJobSetOutNotes(e.target.value)
          }
        />
      </div>
    </div>
  );
});

export default JobNotes;
