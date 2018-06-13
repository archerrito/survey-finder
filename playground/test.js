// write a function that retrieve json
//make afax request
//https:

// function fetchAlbums() {
//     //async request that returns a promise
//     fetch('https://rallycoding.herokuapp.com/api/musi_albums')
//         //called if response successful, retrieve json data from promiseresponse
//         .then(res => res.json())
//         //get json, log it
//         .then(json => console.log(json));
// }


//refactored
async function fetchAlbums() {
    //async request that returns a promise
    const res = await fetch('https://rallycoding.herokuapp.com/api/musi_albums')
        //called if response successful, retrieve json data from promiseresponse
        const json = res.json()
        //get json, log it
        console.log(json);
}

fetchAlbums();