const Hapi = require('@hapi/hapi')
const { addBookHandler } = require('./handler')

const routes = [
    {
        method: 'POST',
        url: '/books',
        handler: addBookHandler()
    }
]

module.exports = routes