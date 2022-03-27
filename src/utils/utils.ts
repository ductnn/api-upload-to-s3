import { Response } from "express"

function routeResSuccess(res: Response, data?: any) {
    if (data) res.json({
        error_code: "",
        data,
    });
    else res.json({
        error_code: "",
    });
};

export {
    routeResSuccess,
}
