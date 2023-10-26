//Npm Imports
import { types, flow, Instance } from "mobx-state-tree";

//Local Imports

//Constants for Selection Arrays
const jobTypeOptions = [
  "KNC Queesnland",
  "Supply Cabinets",
  "Urban Pad Furniture",
];

const JobInformationModel = types
  .model("JobInformationModel", {
    clientJobNumber: types.maybe(types.string),
    kncJobNumber: types.maybe(types.integer),
    jobName: types.maybe(types.string),
    jobNestDate: types.maybe(types.Date),
    jobType: types.enumeration("JobType", jobTypeOptions),
    jobSetOutBy: types.maybe(types.string),
    jobNestedBy: types.maybe(types.string),
    jobNestingComputer: types.string,
    jobStackingDetails: types.enumeration("JobStackingDetails", [
      "KNC Starndard Trolley with Cabinet Numbers",
      "UPF Standard Trolley - Urban Pad Furniture",
      "SC Pallet - 1200 x 1200 Supply Cabinets",
      "SC Pallet - 1700 x 1200 Supply Cabinets",
      "SC Pallet - 2400 x 1200 Supply Cabinets",
      "SC Standard Trolley - Supply Cabinets",
    ]),
    jobAssemblyDetails: types.enumeration("JobAssemblyDetails", [
      "KNC Queensland",
      "Supply Cabinets",
      "Urban Pad Furniture",
      "Customer / Flat Pack",
    ]),
    jobPaymentTerms: types.enumeration("JobPaymentTerms", [
      "Pay Upfront",
      "14 Days",
      "30 Days | 5% Surcharge",
    ]),
    jobSetOutNotes: types.maybe(types.string),
  })
  .views((self) => {
    return {
      get jobTypeOptions() {
        return jobTypeOptions.map((option) => ({
          name: option,
          value: option,
        }));
      },
      get jobImage() {
        switch (self.jobType) {
          case "KNC Queesnland":
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc1uRzlkpSeFYLk3nf04hkF9RapDMgTrJpp9keNejrfM0m_dQ1IsSz4v6sSmChtSK-nis&usqp=CAU";
          case "Supply Cabinets":
            return "https://kncqueensland.com.au/__static/05c6f4ff081eaec3/image_quad";
          case "Urban Pad Furniture":
            return "https://cdn11.bigcommerce.com/s-3zg1svpyww/images/stencil/250x100/urban_pad_logo2_1692076588__66187.original.png";
          default:
            return "";
        }
      },
    };
  })
  .actions((self) => {
    return {
      setJobType(jobType: string) {
        self.jobType = jobType;
        return;
      },
      setClientJobNumber(clientJobNumber: string) {
        self.clientJobNumber = clientJobNumber;
        return;
      },
      setKncJobNumber(kncJobNumber: number) {
        self.kncJobNumber = kncJobNumber;
        return;
      },
      setJobName(jobName: string) {
        self.jobName = jobName;
        return;
      },
      setJobSetOutBy(jobSetOutBy: string) {
        self.jobSetOutBy = jobSetOutBy;
        return;
      },
      setJobNestedBy(jobNestedBy: string) {
        self.jobNestedBy = jobNestedBy;
        return;
      },
    };
  });

export type JobInformationModelType = Instance<typeof JobInformationModel>;
export default JobInformationModel;
