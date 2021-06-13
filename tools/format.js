module.exports = fn = data => {
    return {
        "id": data.id ? data.id.value : '',
        "uri": data.uri ? data.uri.value : '',
        "title": data.title ? data.title.value : '',
        "harga": data.harga ? data.harga.value : '',
        "urlweb": data.urlweb ? data.urlweb.value : '',
        "urlFoto": data.urlFoto ? data.urlFoto.value : '',
    }
}