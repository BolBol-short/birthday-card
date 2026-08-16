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
    // Optional chaining guards against a row where Name is present but the
    // Valid? column is missing/undefined (would otherwise crash on .toLowerCase()).
    return row.Name && row['Valid?']?.toLowerCase() === 'yes'
}

function CreateFormattedJSON(data){
    const parsedData = Papa.parse(data, {header: true}).data

    // Assign ids in CSV ROW ORDER (top to bottom). First valid row is id 1,
    // next is id 2, and so on. Appending at the bottom is safe; reordering or
    // deleting a row above someone will shift every id below it.
    const validRows = parsedData.filter(validUser)
    const formattedJSON = {}
    const seen = new Set()
    let id = 0

    validRows.forEach(r => {
        const slug = getName(r.Name.trim())

        // Guard: two rows slugify to the same slug -> collision. Warn, keep the first.
        if (seen.has(slug)) {
            console.warn(`Duplicate slug "${slug}" (from "${r.Name.trim()}") — skipping the later row.`)
            return
        }
        seen.add(slug)

        id++   // only incremented for kept rows, so skipped duplicates leave no gaps
        formattedJSON[slug] = {
            id: id,
            name: r.Name.trim(),
            gender: r.Gender,
            age: getAge(r['Date of Birth']),
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