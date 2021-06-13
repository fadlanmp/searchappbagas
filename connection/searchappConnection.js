const axios = require('axios');
const qs = require('qs');

const DATA_URL = "http://localhost:3030";

const headers = {
    'Accept': 'application/sparql-results+json,*/*;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

exports.getApp = async(param)=>{
    // Query
    const queryData = {
        query: `PREFIX data:<http://example.com/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        SELECT ?uri ?id ?title ?harga ?urlweb ?urlFoto

        WHERE{
            ?uri rdf:type data:aplikasi
            OPTIONAL {?uri data:id ?id.}
            OPTIONAL {?uri data:title ?title.}
            OPTIONAL {?uri data:harga ?harga.}
            OPTIONAL {?uri data:urlweb ?urlweb.}
            OPTIONAL {?uri data:urlFoto ?urlFoto.}
            FILTER regex(?uri, "${param.uri ? param.uri : ''}", "i")
            FILTER regex(?id, "${param.id ? param.id : ''}", "i")
            FILTER regex(?title, "${param.title ? param.title : ''}", "i")
            FILTER regex(?harga, "${param.harga ? param.harga : ''}", "i")
        }`
    }

    try{
        const {data} = await axios(`${DATA_URL}/searchapp/query`,{
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        })
        return data.results;
    }catch(err){
        return Promise.reject(err);
    }
}

exports.getPlatformApp = async(param) => {
    const queryData = {
        query: `PREFIX data:<http://example.com/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        
        SELECT DISTINCT ?platformID ?platformName
        
        WHERE {
        ?uri rdf:type data:platform.
        ?uri data:onPlatform ?platformID.
        ?platformID data:platform ?platformName.
        FILTER(regex(str(?uri), "${param.uri ? param.uri : ''}", "i"))
        }`
    }

    try {
        const { data } = await axios(`${BASE_URL}/gareco/query`, {
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        })
        return data.results;
    } catch (err) {
        return Promise.reject(err)
    }
}

exports.getAppByPlatform = async(param) => {
    const queryData = {
        query: `PREFIX data:<http://example.com/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        
        SELECT ?uri ?id ?title ?harga ?urlweb ?urlFoto ?platformName
        
        WHERE {
            ?uri rdf:type data:aplikasi
            OPTIONAL {?uri data:id ?id.}
            OPTIONAL {?uri data:title ?title.}
            OPTIONAL {?uri data:harga ?harga.}
            OPTIONAL {?uri data:urlweb ?urlweb.}
            OPTIONAL {?uri data:urlFoto ?urlFoto.}
            ?uri data:onPlatform ?platformID.
            ?platformID data:platform ?platformName.
            FILTER(regex(str(?platformName), "${param.platform ? param.platform : ''}", "i"))
        }`
    }

    try {
        const { data } = await axios(`${BASE_URL}/searchapp/query`, {
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        })
        return data.results;
    } catch (err) {
        return Promise.reject(err)
    }
}
module.exports = exports;