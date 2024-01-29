import fs from 'fs';
import { saveBooks } from "../models/Book.js";

import errs from "restify-errors";
import { loadPersons } from '../models/Person.js';

/**
 * Init book set.
 */

export function initStorage () {
    let persons = loadPersons();
    console.log("Persons loaded: %j", persons);
}

/**
 * Save book set
 */

export function saveStorage () {
    var data = saveBooks();
    console.log("Data saved: %j", data);
}
