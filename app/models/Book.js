import { existsSync, readFileSync, writeFileSync } from 'fs';
import { Person } from './Person.js';

// global book array
let books = []

/**
 * Book cst
 */
export function Book(isbn, title, authors, price) {
    this.isbn = isbn;
    this.title = title;
    this.authors = authors;
    this.price = price;

    this.toString = function() {
        return this.isbn + ", " + this.title + ", " + this.authors + ", " + this.price;
    }
}

/**
 * Init a Book object array
 *
 * @param data data to construct Book object
 */
export function loadBooks () {
    if (existsSync('data/books.json')) {
        books = JSON.parse(readFileSync("data/books.json"));
    }
    return books;
}

/**
 * Save a Book object array
 */
export function saveBooks () {
    writeFileSync("data/books.json", JSON.stringify(books));
    return books;
}

/**
 * Get all Book objects
 */
export function getBooks (callback) {
    callback(null,books);
}
