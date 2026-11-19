/*--------------------------------------*/
/* IMPORT SHARED FEATURES */
import { initializeCommon } from "./common.js";

initializeCommon();
/*--------------------------------------*/
/* TIMESTAMP */
const timestampInfo = document.querySelector("#timestamp");

if (timestampInfo) {
    timestampInfo.value = new Date().toLocaleString();
}
/*--------------------------------------*/