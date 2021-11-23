function deepJSONstring(json) {
    let cache = [];
    const data = JSON.stringify(json, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            // Duplicate reference found, discard key
            if (cache.includes(value)) return;

            // Store value in our collection
            cache.push(value);
        }
        return value;
    }, 2);
    cache = null; // Enable garbage collection

    return data;
}

module.exports = {deepJSONstring}