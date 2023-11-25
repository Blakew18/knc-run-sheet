//Npm Imports
import { types, flow, Instance } from "mobx-state-tree";

//Local Imports
import { nextJobNumber } from "../providers/Services";
import { CompanyInformationModelType } from "./company-information-model";
//Constants for Selection Arrays
const jobTypeOptions = [
  "KNC Queesnland",
  "Supply Cabinets",
  "Urban Pad Furniture",
];
const jobStackingDetailsOptions = [
  "KNC Starndard Trolley with Cabinet Numbers",
  "UPF Standard Trolley - Urban Pad Furniture",
  "SC Pallet - 1200 x 1200 Supply Cabinets",
  "SC Pallet - 1700 x 1200 Supply Cabinets",
  "SC Pallet - 2400 x 1200 Supply Cabinets",
  "SC Standard Trolley - Supply Cabinets",
];

const jobAssemblyDetailsOptions = [
  "KNC Queensland",
  "Supply Cabinets",
  "Urban Pad Furniture",
  "Customer / Flat Pack",
];

const jobPaymentTermsOptions = [
  "Pay Upfront",
  "14 Days",
  "30 Days | 5% Surcharge",
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
    jobStackingDetails: types.enumeration(
      "JobStackingDetails",
      jobStackingDetailsOptions
    ),
    jobAssemblyDetails: types.enumeration(
      "JobAssemblyDetails",
      jobAssemblyDetailsOptions
    ),
    jobPaymentTerms: types.enumeration(
      "JobPaymentTerms",
      jobPaymentTermsOptions
    ),
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
      get jobStackingDetailsOptions() {
        return jobStackingDetailsOptions.map((option) => ({
          name: option,
          value: option,
        }));
      },
      get jobAssemblyDetailsOptions() {
        return jobAssemblyDetailsOptions.map((option) => ({
          name: option,
          value: option,
        }));
      },
      get jobPaymentTermsOptions() {
        return jobPaymentTermsOptions.map((option) => ({
          name: option,
          value: option,
        }));
      },
      get jobNumberAs4DigitString() {
        return self.kncJobNumber.toString().padStart(4, "0");
      },
      get jobImage() {
        switch (self.jobType) {
          case "KNC Queesnland":
            return "static://assets/knc.svg";
          case "Supply Cabinets":
            return "static://assets/supplyCabinets.svg";
          case "Urban Pad Furniture":
            return "static://assets/urbanPad.svg";
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
      setJobStackingDetails(jobStackingDetails: string) {
        self.jobStackingDetails = jobStackingDetails;
        return;
      },
      setJobAssemblyDetails(jobAssemblyDetails: string) {
        self.jobAssemblyDetails = jobAssemblyDetails;
        return;
      },
      setJobPaymentTerms(jobPaymentTerms: string) {
        self.jobPaymentTerms = jobPaymentTerms;
        return;
      },
      setJobSetOutNotes(jobSetOutNotes: string) {
        self.jobSetOutNotes = jobSetOutNotes;
        return;
      },
      resetJobInfoStore: flow(function* resetJobInfoStore(
        company: CompanyInformationModelType
      ) {
        const NewJobNumber = yield nextJobNumber(company);
        self.clientJobNumber = "";
        self.kncJobNumber = NewJobNumber;
        self.jobName = "";
        self.jobNestDate = new Date();
        self.jobType = "KNC Queesnland";
        self.jobSetOutBy = "";
        self.jobNestedBy = "";
        self.jobNestingComputer = "";
        self.jobStackingDetails = "KNC Starndard Trolley with Cabinet Numbers";
        self.jobAssemblyDetails = "KNC Queensland";
        self.jobPaymentTerms = "14 Days";
        self.jobSetOutNotes = "";
      }),
    };
  });

export type JobInformationModelType = Instance<typeof JobInformationModel>;
export default JobInformationModel;
