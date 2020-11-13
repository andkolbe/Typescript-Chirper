import { Router } from 'express'; // import * as express from 'express';
import chirpStore from '../utils/chirpstore'; // connecting chirpstore to our chirps route

const router = Router();

router.get('/:id?', (req, res) => { // get = read // ? means it's not required // this lets you access id if you provide the optional argument
    const id = Number(req.params.id) // req.params are always cast as strings. Write Number in front to turn it into a number // explicit coercion
    const data = chirpStore.GetChirps();
    const chirp = chirpStore.GetChirp(id);
    const chirps = Object.keys(data).map(key => ({ // take the object data and tell me what its keys are. This returns an array
         // you have to convert your object of objects into an array of objects to manipulate it
            id: Number(key),
            name: data[key].name, // get the data of the name attached to the id: key  
            text: data[key].text  // get the data of the text attached to the id: key
    }));
   
    // const chirps = Object.keys(data).map(key => ({ id: key, ...data[key] })); // can also use this shorthand
  
    chirps.pop(); // pops the nextid off the end of the array
   
    if (id || id === 0) { // if you provide a parameter, return that chirp 
        res.json({id, ...chirp}); // ...chirp says take the rest of the chirp properties, spread them out, and display them
    } else { // if you don't provide a paramenter, return all chirps
        res.json(chirps); // always use res.json instead of res.send. most modern servers respond with json. it's the standard
    }
}); // if your first chirp has the key of 0, it evaluates false, and goes to the else statement. start your array with 1, or add it to your if statement to avoid this

router.post('/', (req, res) => { // post = create // networking layer
    const chirpDTO = req.body // best practice to store in variable // req.body is all of the form data
    chirpStore.CreateChirp(chirpDTO); // data layer // DTO - data transfer object. transfers data from the networking layer to the data layer
    res.status(200).json({ msg: 'Chirp Added!' });
}) // test out posts on postman

router.put('/:id', (req, res) => { // you need the id because you need to know exactly which one you are changing. put is a combo of get and post
    const id = Number(req.params.id);
    const chirpDTO = req.body;
    chirpStore.UpdateChirp(id, chirpDTO);
    res.status(200).json(`chirp ${id} edited`);
}) 

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    chirpStore.DeleteChirp(id);
    res.status(200).json('You are banished to the shadow realm!');
})


export default router; // this will be imported into index.js

// each resource should be in its own route file
// use Router() to create a router for each resource
// index.ts in the route directory will import and add the routes to the Express app

// chain get, post, put, and delete onto router