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
    const { name, reading, finished } = request.query;

    let filteredBooks = books

    if (name) {
        filteredBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
    }
    if (reading) {
        const isReading = reading === '1'
        filteredBooks = filteredBooks.filter((book) => book.reading === isReading)
    }

    if (finished !== undefined) {
        const isFinished = finished === '1'
        filteredBooks = filteredBooks.filter((book) => book.finished === isFinished)
    }

    return h.response({
        status: 'success',
        data: {
            books: filteredBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            }))
        }
    }).code(200)
}

const getBookByIdHandler = (request, h) => {
    const { id } = request.params
    const book = books.filter((n) => n.id === id)[0]

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book
            }
        }
    }

    return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    }).code(404)
}

const updateBookHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
    }

    books[bookIndex] = {
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
    };

    return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
    }).code(200);
};


const deleteBookHandler = (request, h) => {
    const { id } = request.params
    const index = books.findIndex((book) => book.id === id)

    if (index !== -1) {
        books.splice(index, 1)
        return h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        }).code(200)

    }

    return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        }).code(404)

}

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler }