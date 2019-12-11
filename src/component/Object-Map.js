function convertValueAndKey(obj) {
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    values = values.map((elem) => elem.toUpperCase())

    let map = new Map();

    for (let i = 0; i < keys.length; i++) {
        map.set(values[i], keys[i]);
    }

    return map;
}

export default convertValueAndKey