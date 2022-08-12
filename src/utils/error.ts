export interface Error {
    errorType: string;
    message: string;
}

export const throwError = (error: Error) => {
    return (e: any) => {
        if (!e) e = new Error(error.message || "Default Error");
        e.errorType = error.errorType;
        throw e;
    };
};

export const throwIf = (fn: (res: any) => boolean, error: Error) => {
    return (result: any) =>
        fn(result) ? throwError(error)(undefined) : result;
};
