// Limpiar de LOD, quitar espacios de los costados, reemplazar '.' por ','
export const limpiarLod = (obj) => {
  return obj.data.map(row => {
    return row.map(e => e === "< LOD" ? '0' : e.trim().replace('.', ','))
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
        row[index] === '' ? arrPivot.push('0') : arrPivot.push(row[index])
      } else {
        arrPivot.push('0')
      }
    }
    arrFinal.push(arrPivot)
  }
  return arrFinal
}