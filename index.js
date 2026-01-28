import Papa from 'papaparse'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { limpiarLod, ordenarValores, recaudarColumnas } from './utils/modules.js'

// Leer archivo csv
const path_input = process.env.INPUT ?? 'input.csv'
const textFile = readFileSync(path_input, "utf-8")

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

mkdirSync("output", { recursive: true });
const outFilePath = path.join('output','info_mineral_limpio.csv')

writeFileSync(outFilePath, infoFinal, 'utf-8')

console.log('Se ejecutó todo correctamente. El archivo está en /output/info_minerales_limpio.cvs')