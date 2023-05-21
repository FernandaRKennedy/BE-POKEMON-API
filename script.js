const axios = require('axios')
const mongoose = require ('mongoose')
require('dotenv').config()
const Pokemon = require('.models/Pokemon')

//db connection 
mongoose.connect(process.env.MOMGO_URL,{ userUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DBconnected'))
.catch(err => console.log(err))

async function processPokemon(){
    console.log('processing...')
    let pokemonToProcess = true
    let url = 'https://pokeapi.co/api/v2/pokemon/'
    while (pokemonToProcess){
        const { data } = await axios.get(url)
        await Pokemon.isertMany(data.results)
        if (!data.next) {
            pokemonToProcess = false
        }else{
            url = data.next
        }
    }
    console.log('complete...')
}

async function main(){
   await Pokemon.deleteMany({})//start with a clran collection
   await processPokemon()
   mongoose.connection.close()
}

main()