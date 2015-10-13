module.exports = {
    deepGet(obj, key) {
        return key.split('.').reduce(function(o, k) {
            return (typeof o === 'undefined' || o === null) ? o : o[k];
        }, obj);
    },
    deepfilterFactory(filterString, ignoredKeys) {
        if (!ignoredKeys) {
            ignoredKeys = [];
        }
        function flattenValues(obj, acc) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && ignoredKeys.indexOf(key) === -1) {
                    var value = obj[key];
                    if (typeof value === 'object') {
                        flattenValues(value, acc, ignoredKeys);
                    } else {
                        acc.push(value);
                    }
                }
            }
        }
        return function(obj) {
            var searchTarget = [];
            flattenValues(obj, searchTarget);
            var text = searchTarget.join('');
            text = text.toLowerCase();
            return text.indexOf(filterString) !== -1;
        };
    }
};
