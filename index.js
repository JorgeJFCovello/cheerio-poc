const cheerio = require('cheerio')
const axios = require('axios')
const FormData = require('form-data');
const base64 = require('base64topdf');
const fs = require('fs')
const url = 'https://portaltramites.inpi.gob.ar/MarcasConsultas/GrillaMarcasAvanzada'
const urlNormal = 'https://portaltramites.inpi.gob.ar/MarcasConsultas/Grilla'
const urlPuntual = 'https://portaltramites.inpi.gob.ar/MarcasConsultas/GrillaMarcasPuntual'
const urlAvanzada = 'https://portaltramites.inpi.gob.ar/MarcasConsultas/GrillaMarcasAvanzada'
const urlRenovaciones = 'https://portaltramites.inpi.gob.ar/MarcasConsultas/GrillaMarcasRenovaciones'
/*const data = new FormData()
data.append('tipob', 1)
data.append('clase', -1)
data.append('TxtDenominacionTipoBusqueda', 1)
data.append('Denominacion', 'veggie snack')
data.append('TxtTitularTipoBusqueda', 0)
data.append('tipob', 1)
data.append('tipob', 1)
*/
const data = {
  Tipo_Resolucion: "",
  Clase: "-1",
  TipoBusquedaDenominacion: "1",
  Denominacion: "Veggie Snack",
  Titular: "",
  TipoBusquedaTitular: "0",
  Fecha_IngresoDesde: "",
  Fecha_IngresoHasta: "",
  Fecha_ResolucionDesde: "",
  Fecha_ResolucionHasta: "",
  vigentes: false,
  limit: 10,
  offset: 0
}
//Buscar por marca
axios.post(url, data).then((response) => {
  const $ = cheerio.load(response.data)
  console.log('test', response.data)
  //fs.writeFileSync('response.txt', response.data)
  //const result = $('.bootstrap-table > fixed-table-body > .table tbody').html()
  //const result = $('#tblGrillaMarcas').children('tbody').html()
  //console.log('resultado', result)
})
axios.post('https://portaltramites.inpi.gob.ar/Home/GrillaDigitales', {acta: "3751496", direccion: "1", limit: 10, offset: 0}).then((response) => {
  console.log('grilla', response.data)
  //const result = $('.bootstrap-table > fixed-table-body > .table tbody').html()
  //const result = $('#tblGrillaMarcas').children('tbody').html()
  //console.log('resultado', result)
})

//descargar archivo

// https://portaltramites.inpi.gob.ar/Home/edmsxidd?id=0x0100000071BB91ACCA883D902FEA1B89BE59212E03E6C81559374A47&nombre=2022-08637136.pdf

axios.get('https://portaltramites.inpi.gob.ar/Home/edmsxidd?id=0x0100000071BB91ACCA883D902FEA1B89BE59212E03E6C81559374A47&nombre=2022-08637136.pdf')
.then((response) => {
  let buffer = Buffer.from(response.data);
let file = Uint8Array.from(buffer).buffer;
    const fileURL = URL.createObjectURL(file);
//Open the URL on new Window
    window.open(fileURL);
})