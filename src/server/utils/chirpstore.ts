import * as fs from 'fs';

/*
    {
        1: {  // the ids are strings by default
            name: string;
            text: string;
        },
        2: {
            name: string;
            text: string;
        },
        nextid: number;
    }   
*/

// a type is just an interface with less options

export interface IRawDataChirp { // each individual chirp
    id: number;
    name: string;
    text: string;
}

export interface ChirpData { // the object that holds all of the chirps
    [key: number]: IRawDataChirp; // key-value pair. The key is a number and the value is IChirp
    nextid: number;
}

let chirps: ChirpData = { nextid: 0 };

if(fs.existsSync('chirps.json')) {
    chirps = JSON.parse(fs.readFileSync('chirps.json').toString());
}

let getChirps = () => {
    return Object.assign({}, chirps); //create a copy and return it
}

let getChirp = (id: number) => {
    return Object.assign({}, chirps[id]); //create a copy and return it
}

let createChirp = (chirp: IRawDataChirp) => {
    chirps[chirps.nextid++] = chirp;
    writeChirps();
};

let updateChirp = (id: number, chirp: IRawDataChirp) => {
    chirps[id] = chirp;
    writeChirps();
}

let deleteChirp = (id: number) => {
    delete chirps[id];
    writeChirps();
}

let writeChirps = () => {
    fs.writeFileSync('chirps.json', JSON.stringify(chirps));
};

export default {
    CreateChirp: createChirp,
    DeleteChirp: deleteChirp,
    GetChirps: getChirps,
    GetChirp: getChirp,
    UpdateChirp: updateChirp
}