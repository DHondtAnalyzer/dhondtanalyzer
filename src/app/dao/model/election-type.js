"use strict";
/**
 * Created by garciparedes on 16/11/2016.
 */
(function (ElectionType) {
    ElectionType[ElectionType["MUNICIPALEES"] = 0] = "MUNICIPALEES";
    ElectionType[ElectionType["AUTONOMICAS"] = 1] = "AUTONOMICAS";
    ElectionType[ElectionType["GENERALES"] = 2] = "GENERALES";
    ElectionType[ElectionType["EUROPEAS"] = 3] = "EUROPEAS";
})(exports.ElectionType || (exports.ElectionType = {}));
var ElectionType = exports.ElectionType;
