module.exports = fn = data => {
    return {
        "id": data.id ? data.id.value : '',
        "title": data.title ? data.title.value : '',
        "kategori": data.kategori ? data.kategori.value : '',
        "harga": data.harga ? data.harga.value : '',
        "urlweb": data.urlweb ? data.urlweb.value : '',
        "urlFoto": data.urlFoto ? data.urlFoto.value : '',
    }
}