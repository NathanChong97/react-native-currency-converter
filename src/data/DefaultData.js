import DisplaySize from "../data/DisplaySize";

let entries = Object.entries(DisplaySize)
let displaySizeKey = entries.map(([key, val] = entry) => {
    return key;
});

let displaySizeValue = entries.map(([key, val] = entry) => {
    return val;
});

export default {
    currency: [],
    crypto: [],
    selectedCurrencies: [],
    lastUpdate: "",
    providedAmount: 1,
    selectedCurrency: undefined,
    settings: {
        theme: 'light',
        size: 'default',
        // size: Object.keys(DisplaySize)[1],
        // size: DisplaySize.default,
        // size: displaySizeKey[1],
        language: 'en'
    }
};
