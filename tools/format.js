module.exports = fn = data => {
    return {
        "uri": data.uri ? data.uri.value : '',
        "id": data.id ? data.id.value : '',
        "title": data.title ? data.title.value : '',
        "harga": data.harga ? data.harga.value : '',
        "urlweb": data.urlweb ? data.urlweb.value : '',
        "urlFoto": data.urlFoto ? data.urlFoto.value : '',
        "platfor": data.platformName ? data.platformName.value : '',
    }
}