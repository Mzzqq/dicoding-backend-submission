const { nanoid } = require('nanoid');
const books = require('./books')

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16)
    const finished = readPage === pageCount
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    if (!name){
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        }).code(400)
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400)
    }

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    }

    books.push(newBook)

    return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id
        }
    }).code(201)
}

const getAllBooksHandler = (request, h) => {
    const bookData = books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }))

    return h.response({
        status: 'success',
        data: {
            books: bookData
        }
    }).code(200)
}

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params
    const book = books.find((b) => b.id === bookId)

    if (!book) {
        return h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404)
    }

    return h.response({
        status: 'success',
        data: {
            book
        }
    }).code(200)
}

const updateBookHandler = (request, h) => {
    const { bookId } = request.params
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const bookIndex = books.findIndex((book) => book.id === bookId)

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400)
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400)
    }

    if (bookIndex === -1) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404)
    }

    books[bookIndex]= {
        ...books[bookIndex],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished: readPage === pageCount,
        updatedAt: new Date().toISOString()
    }

    return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
    }).code(200)
}

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookHandler }