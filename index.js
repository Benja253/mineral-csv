import Papa from 'papaparse'
import { readFileSync, writeFileSync } from 'node:fs'
import { limpiarLod, ordenarValores, recaudarColumnas } from './utils/modules.js'

// Leer archivo csv
const textFile = readFileSync('ejemplo_info_minerales.csv', "utf-8")

// Converstir texto en javascript
const info = Papa.parse(textFile, {
  header: false,
  skipEmptyLines: false,
  delimiter: ","
})

const infoLimpio = limpiarLod(info)

const listaDeColumnas = recaudarColumnas(infoLimpio)

const dataOrdenada = ordenarValores(infoLimpio, listaDeColumnas)

const infoFinal = Papa.unparse(dataOrdenada, {
  delimiter: ',',
  header: false,
})

writeFileSync('info_mineral_limpio.csv', infoFinal, 'utf-8')