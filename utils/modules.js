import ExcelJS from "exceljs";

// Limpiar de LOD, quitar espacios de los costados, reemplazar '.' por ','
export const limpiarLod = (obj) => {
  return obj.data.map(row => {
    return row.map(e => (e === "< LOD" || e === '0') ? '0.0' : e.trim())
  })
}

// Retorna una arreglo con todas las columnas que hay
export const recaudarColumnas = (arr) => {
  return [
    ...new Set(arr
      .filter(e => e[0].includes('File #'))
      .reduce((acc, cv) => [...acc, ...cv], []))  
  ].filter(e => e.split(' ').at(-1) !== "Err")
}

// ordenar toda la información en la columna correspondiente
export const ordenarValores = (data, columnas) => {
  const arrFinal = [columnas]
  let cabeceraActual = []
  for (const row of data) {
    if(row[0] === 'File #') {
      cabeceraActual = [...row]
      continue
    }
    if(row[0] === '') {
      continue
    }
    const arrPivot = []
    for (const nombreColumna of columnas) {
      const index = cabeceraActual.indexOf(nombreColumna)
      if(index !== -1) {
        row[index] === '' ? arrPivot.push('0.0') : arrPivot.push(row[index])
      } else {
        arrPivot.push('0.0')
      }
    }
    arrFinal.push(arrPivot)
  }
  return arrFinal
}

export const csvStringToXlsx = async(csvString, outputPath) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Datos");

  // convertir CSV string → filas
  const rows = csvString
    .trim()
    .split(/\r?\n/)
    .map(line => line.split(","));

  rows.forEach(row => worksheet.addRow(row));

  // worksheet.eachRow({ includeEmpty: true }, (row) => {
  //   row.eachCell({ includeEmpty: true }, (cell) => {
  //     cell.value = cell.value.replaceAll(".", ",");
  //   });
  // });

  await workbook.xlsx.writeFile(outputPath);
}