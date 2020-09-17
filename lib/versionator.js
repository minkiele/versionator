(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Versionator = void 0;
    var Versionator;
    (function (Versionator) {
        var VSEP = '-';
        var DEFAULT_LOWER_LIMIT = 2;
        var DEFAULT_UPPER_LIMIT = 6;
        var DEFAULT_PROBABILITY = .5;
        function flipCoin(probabilityOfSuccess) {
            if (probabilityOfSuccess === void 0) { probabilityOfSuccess = DEFAULT_PROBABILITY; }
            return Math.random() < probabilityOfSuccess;
        }
        function caseInput(input, probabilityOfSuccess) {
            if (probabilityOfSuccess === void 0) { probabilityOfSuccess = DEFAULT_PROBABILITY; }
            return input[flipCoin(probabilityOfSuccess) ? 'toUpperCase' : 'toLowerCase']();
        }
        function getProgressive(probabilityOfSuccess, lowerLimit, upperLimit) {
            if (probabilityOfSuccess === void 0) { probabilityOfSuccess = DEFAULT_PROBABILITY; }
            if (lowerLimit === void 0) { lowerLimit = DEFAULT_LOWER_LIMIT; }
            if (upperLimit === void 0) { upperLimit = DEFAULT_UPPER_LIMIT; }
            return flipCoin(probabilityOfSuccess) ? (Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit) + '' : '';
        }
        var suffixes = [
            function () { return caseInput('def', .333) + getProgressive(.125); },
            function () { return caseInput('finale', .333) + getProgressive(.125); },
            function () { return caseInput('ok', .333) + getProgressive(.125); },
            function () { return caseInput('nuovo', .333) + getProgressive(.125); },
            function () { return caseInput('nuova', .333) + getProgressive(.125); },
            function () { return caseInput('draft', .333) + getProgressive(.125); },
            function () { return caseInput('ultimo', .333) + getProgressive(.125); },
            function () { return caseInput('ultima', .333) + getProgressive(.125); },
            function () { return caseInput('v', .333) + getProgressive(1); },
            function () { return caseInput('test', .333) + getProgressive(.125); },
            function () { return caseInput('bozza', .333) + getProgressive(.125); },
        ];
        function pickRandomElement(elements) {
            return elements[Math.floor(Math.random() * elements.length)];
        }
        function version(input) {
            var suffixFn = pickRandomElement(suffixes);
            var suffix = suffixFn();
            var output = "" + input + VSEP + suffix;
            return flipCoin(.666) ? version(output) : output;
        }
        Versionator.version = version;
    })(Versionator = exports.Versionator || (exports.Versionator = {}));
});
