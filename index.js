import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {typeDefs} from './schema.js';
import db from './_db.js'

const resolvers={
    Query:{
        games(){
            return db.games
        },
        game(_,args){
            return db.games.find(e=>e.id === args.id )
        },
        authors(){
            return db.authors
        },
        author(_,args){
            return db.authors.find(e=>e.id === args.id )
        },
        reviews(){
            return db.reviews
        },
        review(_,args){
            return db.reviews.find(e=>e.id === args.id )
        },
    },
       
    Game :{
        reviews(parent){
            return db.reviews.filter(r => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
          return db.reviews.filter((r) => r.author_id === parent.id)
        }
      },
    Review:{
        game(parent){
            return db.games.find(e=>e.id === parent.game_id )
        },
        author(parent){
            return db.authors.find(e=>e.id === parent.author_id )
        }
    },
    Mutation:{
        addGame(_, args) {
            let game = {
              ...args.game, 
              id: Math.floor(Math.random() * 10000).toString()
            }
            db.games.push(game)
      
            return game
          },
        deleteGame(_,args){
          db.games= db.games.filter(g=>g.id!==args.id)
          return db.games
        }
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server,{
    listen : {port : 4000}
})


console.log("server listen at:",4000)