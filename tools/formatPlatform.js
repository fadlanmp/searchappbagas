module.exports = fn = data => {
    return {
        "id": data.id ? data.id.value : '',
        "platformID": data.platformID ? data.platformID.value : '',
        "platformName": data.platformName ? data.platformName.value : '',
    }
}