export const mssqlAllPanelStockQuery = `SELECT 
sub.MaxPatNo AS qty,
sub.MaterialID,
m.Name
FROM 
Materials AS m
INNER JOIN 
(
    SELECT 
        MAX(pl.PatNo) AS MaxPatNo, 
        pl.MaterialID
    FROM 
        PanelLayout AS pl
    GROUP BY 
        pl.MaterialID
)  AS sub
ON 
m.ID = sub.MaterialID;`;

export const mssqlUpdatePaneStockQuery = (currentMaterial) => {
  `UPDATE Materials SET Name = "${currentMaterial.newName}" WHERE name = "${currentMaterial.cvMaterial}"`;
};
