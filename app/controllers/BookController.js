import fs from 'fs';
import { loadBooks, saveBooks, getBooks } from "../models/Book.js";
import { Person } from "../models/Person.js";
import errs from "restify-errors";

/**
 * Init book set.
 */
export function initStorage () {
    let books = loadBooks();
    console.log("Books loaded: %j", books);
}

/**
 * Save book set
 */
export function saveStorage () {
    var data = saveBooks();
    console.log("Data saved: %j", data);
}

/**
 * Returns the specified book (if exists) or all books if isbn is not provided.
 */
export function getBook (req, res, next) {
    //console.log("getBook isbn = %j", req.params.isbn);
    getBooks(function (err, books) {
        if (err) {
            return next(err);
        } else {
            res.json(200, books);
            return next();
        }
    })
}
