import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import dotenv from 'dotenv'
import Papa from 'papaparse'

// 1. Get the absolute path of the directory this script lives in (src/Utils)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 2. Safely point directly to the data folder INSIDE utils
const CSV_PATH = path.join(__dirname, 'data', 'BirthdayCard.csv')
// Only this encrypted file is committed/bundled. LINKS_PATH holds the per-person
// secret links to send out; it is git-ignored together with the CSV.
const JSON_OUTPUT_PATH = path.join(__dirname, 'data', 'Birthday.enc.json')
const LINKS_PATH = path.join(__dirname, 'data', 'links.txt')

// CARD_SECRET lives in <project>/.env (git-ignored). Lose it and every sent link breaks.
dotenv.config({ path: path.join(__dirname, '..', '..', '.env'), quiet: true })

function ReadandGetData(path){
    return fs.readFileSync(path, 'utf8')
}

// Per-person AES-128 key = HMAC(CARD_SECRET, slug). Deterministic, so re-running
// the script never changes a link that was already sent.
function deriveKey(slug){
    return crypto.createHmac('sha256', process.env.CARD_SECRET).update(slug).digest().subarray(0, 16)
}

// Output = base64(iv[12] + ciphertext + gcmTag[16]); WebCrypto AES-GCM reads this as-is.
function encrypt(person, key){
    const iv = crypto.randomBytes(12)
    const cipher = crypto.createCipheriv('aes-128-gcm', key, iv)
    const body = Buffer.concat([cipher.update(JSON.stringify(person), 'utf8'), cipher.final(), cipher.getAuthTag()])
    return Buffer.concat([iv, body]).toString('base64')
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
    const links = []
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
        // Keyed by id only (no name in the file). Age is NOT stored: the browser
        // computes it from dob, so it is never stale.
        const key = deriveKey(slug)
        formattedJSON[id] = encrypt({
            id: id,
            name: r.Name.trim(),
            gender: r.Gender,
            dob: r['Date of Birth'],
            like: r['What you like?']
        }, key)
        links.push(`${r.Name.trim()}\t#/${id}/${key.toString('base64url')}`)
    })

    return { formattedJSON, links }
}

function writeJSONFile(path, data){
    return fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

try {
    if (!process.env.CARD_SECRET) throw new Error('CARD_SECRET missing: add it to .env in the project root')
    console.log('Reading CSV file from:', CSV_PATH)
    const { formattedJSON, links } = CreateFormattedJSON(ReadandGetData(CSV_PATH))
    writeJSONFile(JSON_OUTPUT_PATH, formattedJSON)
    fs.writeFileSync(LINKS_PATH, links.join('\n') + '\n')
    console.log(`Success: ${links.length} people encrypted. Links in ${LINKS_PATH}`)
} catch (e) {
    console.log('Error: ', e)
}