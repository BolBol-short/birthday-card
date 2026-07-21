import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Papa from 'papaparse'

// 1. Get the absolute path of the directory this script lives in (src/Utils)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 2. Safely point directly to the data folder INSIDE utils
const CSV_PATH = path.join(__dirname, 'data', 'BirthdayCard.csv')
const JSON_OUTPUT_PATH = path.join(__dirname, 'data', 'Birthday.json')

function ReadandGetData(path){
    return fs.readFileSync(path, 'utf8')
}

function getUserId(){
    let id = 1
    return () => id++
}

function getAge(dobString){
    if(!dobString) return 0

    const today = new Date()
    const birthDate = new Date(dobString)

    let age = today.getFullYear() - birthDate.getFullYear()

    const monthDif = today.getMonth() - birthDate.getMonth()
    const dayDif = today.getDate() - birthDate.getDate()

    if (monthDif < 0 || (monthDif === 0 && dayDif < 0)){
        age--
    }

    return age
}

function getName(name){
    return name.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
}

function validUser(row){
    return row.Name && row['Valid?'] === 'Yes'
}

function sortUsersByCharacter(data){
    return data.filter(validUser).sort((a, b) => {
        const nA = a.Name.trim().toLowerCase()
        const nB = b.Name.trim().toLowerCase()
        return nA.localeCompare(nB)
    })
}

function CreateFormattedJSON(data){
    const parsedData = Papa.parse(data, {header: true}).data

    // Assign ids in SUBMISSION order (original CSV row order) so that adding a
    // new person later never renumbers anyone. Sorting is only for output order.
    const nextId = getUserId()
    const idBySlug = {}
    parsedData.filter(validUser).forEach(r => {
        idBySlug[getName(r.Name.trim())] = nextId()
    })

    const sortedData = sortUsersByCharacter(parsedData)
    const formattedJSON = {}

    sortedData.forEach(r => {
        const cleanName = r.Name.trim()
        const id = getName(cleanName)
        const age = getAge(r['Date of Birth'])

        formattedJSON[id] = {
            id: idBySlug[id],
            name: cleanName,
            gender: r.Gender,
            age: age,
            dob: r['Date of Birth'],
            like: r['Like?']
        }
    })

    return formattedJSON
}

function writeJSONFile(path, data){
    return fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

try {
    console.log('Reading CSV file from:', CSV_PATH)
    writeJSONFile(JSON_OUTPUT_PATH, CreateFormattedJSON(ReadandGetData(CSV_PATH)))
    console.log('Success')
} catch (e) {
    console.log('Error: ', e)
}