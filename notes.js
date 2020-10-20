const chalk = require('chalk')
const fs = require('fs')
const { title } = require('process')


const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title)
    

    if  (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else{
        console.log('Note title taken!')
    }
}

const removeNotes = (title) => {

    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notes.length > notesToKeep.length) {

        console.log(chalk.green.bold.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.bold.inverse('No note found!'))
    }



}

const Listnotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes!'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const ReadNotes = (title) => {

    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))

        console.log(note.body)

    }
    else {
        console.log(chalk.red.inverse('Note ot found!'))
    }
}

const saveNotes = (notes) => {

    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)


}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNotes: removeNotes,
    Listnotes: Listnotes,
    ReadNotes: ReadNotes
}