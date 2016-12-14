"use strict";
/**
 * Created by garciparedes on 16/11/2016.
 */
(function (VoteType) {
    VoteType[VoteType["VALID"] = 0] = "VALID";
    VoteType[VoteType["NULL"] = 1] = "NULL";
    VoteType[VoteType["BLANK"] = 2] = "BLANK";
})(exports.VoteType || (exports.VoteType = {}));
var VoteType = exports.VoteType;
