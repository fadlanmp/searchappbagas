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

        SELECT ?id ?title ?harga ?urlweb ?urlFoto ?platformName

        WHERE{
            ?sub rdf:type data:aplikasi
            OPTIONAL {?sub data:id ?id.}
            OPTIONAL {?sub data:title ?title.}
            OPTIONAL {?sub data:harga ?harga.}
            OPTIONAL {?sub data:urlweb ?urlweb.}
            OPTIONAL {?sub data:urlFoto ?urlFoto.}
            OPTIONAL {?sub data:onPlatform ?platformID.}
        	OPTIONAL {?platformID data:platformName ?platformName.}
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
        ?sub rdf:type data:platform.
        ?sub data:onPlatform ?platformID.
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

        SELECT ?id ?title ?harga ?urlweb ?urlFoto ?platformName
        
        WHERE {
            ?sub rdf:type data:aplikasi
            OPTIONAL {?sub data:id ?id.}
            OPTIONAL {?sub data:title ?title.}
            OPTIONAL {?sub data:harga ?harga.}
            OPTIONAL {?sub data:urlweb ?urlweb.}
            OPTIONAL {?sub data:urlFoto ?urlFoto.}
            OPTIONAL {?sub data:onPlatform ?platformID.}
            OPTIONAL {?platformID data:platformName ?platformName.}
            FILTER regex(?platformName, "${param.platformName ? param.platformName : ''}", "i")
        }ORDER BY RAND() LIMIT 5`
    }

    try {
        const { data } = await axios(`${BASE_URL}/searchapp/query`, {
            method: 'POST',
            headers,
            data: qs.stringify(queryData)
        })
        console.log(data.results);
        return data.results;
    } catch (err) {
        return Promise.reject(err)
    }
}
module.exports = exports;