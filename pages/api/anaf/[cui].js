const API = "https://webservicesp.anaf.ro/PlatitorTvaRest/api/v6/ws/tva"

const HEADERS = new Headers({
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "POST"
})

const TODAY = new Date().toISOString().split('T')[0]

const anaf = async (req, res) => {
    let result 
    const {query} = req;
    const {cui} = query;
    console.log("DATA:", TODAY)
    try {
        result = await fetch(API, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify([{cui:cui, data: TODAY}])
        })
        result = await result.json()
    } catch (error) {
        result = {err:true, msg: error.toString()}
    } finally {
        res.send(result.found ? result.found[0] : result )
    }
}

export default anaf