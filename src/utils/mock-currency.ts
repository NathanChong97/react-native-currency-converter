import { Currency, CurrencyType } from '../components/Currency';


export const CURRENCIES: Currency[] = [
    { 
        rate: 1, 
        full_name: 'US Dollar', 
        name: 'USD', 
        symbol: '$', 
        convertedResult: 1,
        imageUrl: "",
        type: CurrencyType.Currency
    },
    { 
        rate: 1.001, 
        full_name: 'Euro', 
        name: 'EUR', 
        symbol: '€', 
        convertedResult: 1.001,
        imageUrl: "",
        type: CurrencyType.Currency
    },
    { 
        rate: 4.725, 
        full_name: 'Polish Zloty', 
        name: 'PLN', 
        symbol: 'zł', 
        convertedResult: 4.725,
        imageUrl: "",
        type: CurrencyType.Currency
    },
    { 
        rate: 7.524, 
        full_name: 'Croatian Kuna', 
        name: 'HRK', 
        symbol: 'kn', 
        convertedResult: 7.524,
        imageUrl: "",
        type: CurrencyType.Currency 
    },
    { 
        rate: 0.869, 
        full_name: 'British Pound', 
        name: 'GBP', 
        symbol: '£', 
        convertedResult: 0.869,
        imageUrl: "",
        type: CurrencyType.Currency 
    },
    { 
        rate: 143.40, 
        full_name: 'Japanese Yen', 
        name: 'JPY', 
        symbol: '¥', 
        convertedResult: 143.40,
        imageUrl: "",
        type: CurrencyType.Currency 
    },
    { 
        rate: 1.32, 
        full_name: 'Canadian Dollar', 
        name: 'CAD', 
        symbol: '$', 
        convertedResult: 1.32,
        imageUrl: "",
        type: CurrencyType.Currency 
    },
    { 
        rate: 9987.6543210, 
        full_name: 'TEST Money ąęłóź $#%^& Long Name TEST TEST test Money', 
        name: 'TEST', 
        symbol: '$$$', 
        convertedResult: 9987.6543210,
        imageUrl: "",
        type: CurrencyType.Currency 
    },
];

