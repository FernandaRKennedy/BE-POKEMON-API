const mongoose = require('mongoose')

const pokemonSchema = new mongoose.Schema({
    name: String,
    url: String
})

module.exports = mongoose.model('Pokemon', pokemonSchema)