//NPM Imports
import ADODB from "node-adodb";
import path from "path";

//Local Imports
import {
  mssqlAllPanelStockQuery,
  mssqlUpdatePaneStockQuery,
} from "./mssql-text.js";

if (__dirname.indexOf('app.asar') !== -1) {
  // In that case, we need to set the correct path to adodb.js
  ADODB.PATH = "./resources/adodb.js";
}

//Get Initial Material Data from Database
export const getOriginalPanelStock = async (dbPath, provider, arch) => {
  let cvDatabase = null;
  try {
    cvDatabase = ADODB.open(
      `Provider=${provider};Data Source=${dbPath};`,
      arch
    );
    const materials = await cvDatabase.query(mssqlAllPanelStockQuery);
    return materials.map((i) => ({
      cvMaterialID: i.MatDBID,
      cvMaterialName: i.Name,
      materialQuantity: i.qty,
      materialThickness: i.ImpThickInMM,
    }));
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    cvDatabase = null;
  }
};

//Update Panel Stock in Database
export const updateCabinetVisionPanelStock = async (
  data,
  dbPath,
  provider,
  arch
) => {
  let cvDatabase = null;
  try {
    cvDatabase = ADODB.open(
      `Provider=${provider};Data Source=${dbPath};`,
      arch
    );
    const query = mssqlUpdatePaneStockQuery(data);
    const updatedMaterial = await cvDatabase.execute(query);
    if (updatedMaterial) {
      return true;
    } else {
      throw Error("Update Failed");
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    cvDatabase = null;
  }
};

//Check Database Connection
export const checkDBConnection = async (dbPath, provider, arch) => {
  let cvDatabase = null;
  try {
    cvDatabase = ADODB.open(
      `Provider=${provider};Data Source="${dbPath}";`,
      arch
    );
    await cvDatabase.query(`SELECT * FROM DBInfo`);
    return true;
  } catch (err) {
    throw Error(`${err}___${ADODB.PATH}`);
  } finally {
    cvDatabase = null;
  }
};
