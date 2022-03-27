'use strict'

import { ApiService } from "./services";

const main = async () => {
    const runService = process.env.__SERVICE_NAME__;
    console.log("Running service: ", runService);

    switch (runService) {
        default:
            await ApiService.startServe();
            break;
    }
};

main().catch(e => console.log(e))
