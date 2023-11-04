export const mssqlAllPanelStockQuery = `
SELECT SUM(sub.MaxPatNo) AS qty, First(m.Name) AS Name, m.MatDBID
FROM (Materials AS m 
      INNER JOIN 
      (SELECT MAX(pl.PatNo) AS MaxPatNo, pl.MaterialID 
       FROM PanelLayout AS pl 
       GROUP BY pl.MaterialID)  AS sub 
       ON m.ID = sub.MaterialID)
GROUP BY m.MatDBID;
`;

export const mssqlUpdatePaneStockQuery = (currentMaterial) => {
  console.log(
    `UPDATE Materials SET Name = "${currentMaterial.materialNewName}" WHERE MatDBID = ${currentMaterial.cvMaterialID}`
  );
  return `UPDATE Materials SET Name = "${currentMaterial.materialNewName}" WHERE MatDBID = ${currentMaterial.cvMaterialID}`;
};
