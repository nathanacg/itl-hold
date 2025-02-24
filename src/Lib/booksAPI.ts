import axios from 'axios';

export const booksApiRequisition_api = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/',
})

export const axiosBooks_api = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/volumes',
})