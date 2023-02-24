import http from './http-common';

async function getAllBooks(){
    return await http.get("/books")
}

async function getBookById(id){
    return await http.get(`/books/${id}`)
}

async function addBook(book){
    return await http.post(`/books`, book)
}

async function deleteBook(id){
    return await http.delete(`/books/${id}`)
}

async function updateBook(book){
    return await http.put(`/books/${book._id}`, book)
}

const bookService = {
    getAllBooks,
    getBookById,
    deleteBook,
    addBook,
    updateBook
}

export default bookService
