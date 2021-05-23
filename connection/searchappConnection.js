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
    SELECT ?id ?title ?kategori ?harga ?urlweb ?urlFoto
    WHERE{
        ?sub rdf:type data:aplikasi
        OPTIONAL {?sub data:id ?id.}
        OPTIONAL {?sub data:title ?title.}
        OPTIONAL {?sub data:kategori ?kategori.}
        OPTIONAL {?sub data:harga ?harga.}
        OPTIONAL {?sub data:urlweb ?urlweb.}
        OPTIONAL {?sub data:urlFoto ?urlFoto.}
        FILTER regex(?id, "${param.id ? param.id : ''}", "i")
        FILTER regex(?title, "${param.title ? param.title : ''}", "i")
        FILTER regex(?kategori, "${param.kategori ? param.kategori : ''}", "i")
        FILTER regex(?harga, "${param.harga ? param.harga : ''}", "i")
        FILTER regex(?urlweb, "${param.urlweb ? param.urlweb : ''}", "i")
        FILTER regex(?urlFoto, "${param.urlFoto ? param.urlFoto : ''}", "i")
    }`
    };
    try{
        const {data} = await axios(`${DATA_URL}/searchapp/query`,{
            method: 'POST',
            headers,
            data: qs.stringify(queryData)

        });
        console.log(data.results)
        return data.results;
    }catch(err){
        res.status(400).json(err);
    }
};

module.exports = exports;