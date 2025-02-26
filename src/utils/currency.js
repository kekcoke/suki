const currenciesList = {
        "USD": {
            "symbol": "$",
            "name": "US Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "USD",
            "name_plural": "US dollars"
        },
        "CAD": {
            "symbol": "CA$",
            "name": "Canadian Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "CAD",
            "name_plural": "Canadian dollars"
        },
        "EUR": {
            "symbol": "€",
            "name": "Euro",
            "symbol_native": "€",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "EUR",
            "name_plural": "euros"
        },
        "AED": {
            "symbol": "AED",
            "name": "United Arab Emirates Dirham",
            "symbol_native": "د.إ.‏",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "AED",
            "name_plural": "UAE dirhams"
        },
        "AUD": {
            "symbol": "AU$",
            "name": "Australian Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "AUD",
            "name_plural": "Australian dollars"
        },
        "BDT": {
            "symbol": "Tk",
            "name": "Bangladeshi Taka",
            "symbol_native": "৳",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "BDT",
            "name_plural": "Bangladeshi takas"
        },
        "BRL": {
            "symbol": "R$",
            "name": "Brazilian Real",
            "symbol_native": "R$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "BRL",
            "name_plural": "Brazilian reals"
        },
        "CDF": {
            "symbol": "CDF",
            "name": "Congolese Franc",
            "symbol_native": "FrCD",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "CDF",
            "name_plural": "Congolese francs"
        },
        "CHF": {
            "symbol": "CHF",
            "name": "Swiss Franc",
            "symbol_native": "CHF",
            "decimal_digits": 2,
            "rounding": 0.05,
            "code": "CHF",
            "name_plural": "Swiss francs"
        },
        "CNY": {
            "symbol": "CN¥",
            "name": "Chinese Yuan",
            "symbol_native": "CN¥",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "CNY",
            "name_plural": "Chinese yuan"
        },
        "EGP": {
            "symbol": "EGP",
            "name": "Egyptian Pound",
            "symbol_native": "ج.م.‏",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "EGP",
            "name_plural": "Egyptian pounds"
        },
        "GBP": {
            "symbol": "£",
            "name": "British Pound Sterling",
            "symbol_native": "£",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "GBP",
            "name_plural": "British pounds sterling"
        },
        "HKD": {
            "symbol": "HK$",
            "name": "Hong Kong Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "HKD",
            "name_plural": "Hong Kong dollars"
        },
        "IDR": {
            "symbol": "Rp",
            "name": "Indonesian Rupiah",
            "symbol_native": "Rp",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "IDR",
            "name_plural": "Indonesian rupiahs"
        },
        "INR": {
            "symbol": "Rs",
            "name": "Indian Rupee",
            "symbol_native": "টকা",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "INR",
            "name_plural": "Indian rupees"
        },
        "JPY": {
            "symbol": "¥",
            "name": "Japanese Yen",
            "symbol_native": "￥",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "JPY",
            "name_plural": "Japanese yen"
        },
        "KRW": {
            "symbol": "₩",
            "name": "South Korean Won",
            "symbol_native": "₩",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "KRW",
            "name_plural": "South Korean won"
        },
        "NGN": {
            "symbol": "₦",
            "name": "Nigerian Naira",
            "symbol_native": "₦",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "NGN",
            "name_plural": "Nigerian nairas"
        },
        "NZD": {
            "symbol": "NZ$",
            "name": "New Zealand Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "NZD",
            "name_plural": "New Zealand dollars"
        },
        "PHP": {
            "symbol": "₱",
            "name": "Philippine Peso",
            "symbol_native": "₱",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "PHP",
            "name_plural": "Philippine pesos"
        },
        "PKR": {
            "symbol": "PKRs",
            "name": "Pakistani Rupee",
            "symbol_native": "₨",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "PKR",
            "name_plural": "Pakistani rupees"
        },
        "SGD": {
            "symbol": "S$",
            "name": "Singapore Dollar",
            "symbol_native": "$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "SGD",
            "name_plural": "Singapore dollars"
        },
        "THB": {
            "symbol": "฿",
            "name": "Thai Baht",
            "symbol_native": "฿",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "THB",
            "name_plural": "Thai baht"
        },
        "TRY": {
            "symbol": "TL",
            "name": "Turkish Lira",
            "symbol_native": "TL",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "TRY",
            "name_plural": "Turkish Lira"
        },
        "TWD": {
            "symbol": "NT$",
            "name": "New Taiwan Dollar",
            "symbol_native": "NT$",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "TWD",
            "name_plural": "New Taiwan dollars"
        },
        "VND": {
            "symbol": "₫",
            "name": "Vietnamese Dong",
            "symbol_native": "₫",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "VND",
            "name_plural": "Vietnamese dong"
        },
        "ZAR": {
            "symbol": "R",
            "name": "South African Rand",
            "symbol_native": "R",
            "decimal_digits": 2,
            "rounding": 0,
            "code": "ZAR",
            "name_plural": "South African rand"
        },
        "ZMK": {
            "symbol": "ZK",
            "name": "Zambian Kwacha",
            "symbol_native": "ZK",
            "decimal_digits": 0,
            "rounding": 0,
            "code": "ZMK",
            "name_plural": "Zambian kwachas"
        }
}

const mapToCurrency = (countryCode) => {
    if (!countryCode || countryCode === undefined || currenciesList[countryCode] === undefined)
        return currenciesList["USD"];

    return currenciesList[countryCode];
}