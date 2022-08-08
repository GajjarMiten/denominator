module.exports.throwIf = (fn, error) => {
    return (result) => (fn(result) ? throwError(error)() : result);
};

module.exports.throwError = (error) => {
    return (e) => {
        if (!e) e = new Error(error.message || "Default Error");
        e.errorType = error.errorType;
        throw e;
    };
};
