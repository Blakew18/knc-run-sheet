//NPM Import
import { types, Instance } from "mobx-state-tree";

const CompanyInformationModel = types
  .model("CompanyInformationModel", {
    companyName: types.string,
    companyKey: types.string,
  })
  .actions((self) => ({
    setCompanyName(name: string) {
      self.companyName = name;
    },
    setCompanyKey(key: string) {
      self.companyKey = key;
    },
  }));

export type CompanyInformationModelType = Instance<
  typeof CompanyInformationModel
>;
export default CompanyInformationModel;
