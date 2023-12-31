import React, { useContext, useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { ThemeContext, ThemeType } from "../theme/ThemeContext";
import { Colors } from "../theme";
import { useTheme } from "@react-navigation/native";
import { Currency, CurrencyType } from "./Currency";
import CurrencyElementBase from "./CurrencyElementBase";
import DisplaySize from "../data/DisplaySize";


class CurrencyElement extends CurrencyElementBase {
    state = {
        ...this.state,
    }

    static context = ThemeContext;

    componentDidMount() {
        super.setTheme(this.props.theme)
    }

    componentDidUpdate() {
        super.setTheme(this.props.theme)
    }

    get styles() {
        // const { theme } = useContext(ThemeContext);
        // const { theme } = this.context;
        
        return StyleSheet.create(
            Object.assign({},
                super.styles,
                {
                    currencyValue: {
                        color: Colors[this.props.theme]?.primaryText,
                        fontWeight: 'bold',
                        fontSize: DisplaySize[this.props.displaySize].fontSizeValue,
                    },
                    selectedCurrency: {
                        borderWidth: 1,
                        borderColor: Colors[this.props.theme]?.primary,
                        backgroundColor: Colors[this.props.theme]?.common,
                    }
                }));
    }

    getAmount(roundDecimalValue) {

        let [integerPart, decimalPart] = [this.props.currency.convertedResult, null]

        if (typeof this.props.currency.convertedResult === 'number') {

            const roundedValue = Math.round(this.props.currency.convertedResult * roundDecimalValue) / roundDecimalValue;
            [integerPart, decimalPart] = String(roundedValue).split(".");
        }

        return (
            <Text style={this.styles.currencyValue}>

                {this.props.currency.symbol + " " + integerPart}
                <Text style={{ color: Colors[this.props.theme].disabled, fontWeight: 'normal' }}>{decimalPart ? "." + decimalPart : null}</Text>
            </Text>
        );
    }

    render() {
        super.render();
        const roundDecimalValue = this.props.currency.type === CurrencyType.Crypto ? 10000 : 100;

        return (
            (this.props.currency.full_name !== "" && this.props.currency.name !== "" && this.props.currency.convertedResult !== undefined) ?
                (<TouchableOpacity onPress={() => this.props.onPress(this.props.currency)} onLongPress={() => this.props.onLongPress(this.props.currency)} style={[this.styles.container, this.props.selected && this.styles.selectedCurrency]}>
                    {this.baseCurrencyView()}
                    <View style={{ flex: 1.5, alignItems: "flex-end" }}>
                        {this.getAmount(roundDecimalValue)}
                    </View>
                </TouchableOpacity>) : null
        );
    }
}

export default CurrencyElement;
