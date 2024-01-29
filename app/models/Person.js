import { existsSync, readFileSync, writeFileSync } from 'fs';

// global person array
let persons = []

/**
 * Person cst
 */
export function Person(id, firstname, lastname, books) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.books = books;

    this.toString = function() {
        return this.id + ", " + this.firstname + ", " + this.lastname + ", " + this.books;
    }
}

/**
 * Init a Person object array
 *
 * @param data to construct Person object
 */
export function loadPersons () {
    if (existsSync('data/persons.json')) {
        persons = JSON.parse(readFileSync("data/persons.json"));
    }
    return persons;
}

/**
 * Save a Person object array
 */
export function savePersons () {
    writeFileSync("data/persons.json", JSON.stringify(persons));
    return persons;
}

export default Person;
