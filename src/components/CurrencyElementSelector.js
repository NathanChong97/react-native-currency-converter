import React, { useContext, useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Checkbox from '@react-native-community/checkbox';
import CurrencyElementBase, { Props as BaseProps }  from "./CurrencyElementBase";
import { Colors } from "../theme";
import { ThemeContext } from "../theme/ThemeContext";


class CurrencyElementSelector extends CurrencyElementBase {

    state = {
        ...this.state,
        isSelected: false
    }

    selectCurrency() {
        const selection = !this.state.isSelected;

        this.setState({
            isSelected: selection
        })
        this.props.onPress(this.props.currency.name, selection);
    }

    componentDidMount() {
        super.componentDidMount();
        super.setTheme(this.props.theme)
        this.setState({ isSelected: this.props.stateSelection })
    }

    componentDidUpdate() {
        super.setTheme(this.props.theme)
    }

    static context = ThemeContext;

    get styles() {
        const { theme } = this.context;
        return StyleSheet.create(
            Object.assign({},
                super.styles,
                {
                    checkbox: {
                        alignSelf: "center",
                        marginVertical: 5,
                        marginHorizontal: 10,
                    }
                }));
    }

    render() {
        super.render();

        return (
            (this.props.currency.full_name !== "" && this.props.currency.name !== "" && this.props.currency.convertedResult !== undefined) ?
                (<TouchableOpacity onPress={() => this.selectCurrency()} style={this.styles.container}>
                    {this.baseCurrencyView()}
                    <Checkbox
                        value={this.state.isSelected}
                        onValueChange={() => this.selectCurrency()}
                        style={this.styles.checkbox}
                        tintColors={this.state.isSelected ? Colors[this.props.theme].primary : undefined}
                    />
                </TouchableOpacity>) : null
        );
    }
}

export default CurrencyElementSelector;
