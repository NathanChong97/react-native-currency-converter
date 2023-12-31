import React, { useContext, useEffect } from "react";
import {
    Linking,
    SafeAreaView,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from "../theme";
import { ThemeContext, ThemeType } from "../theme/ThemeContext";
import i18n from "i18next";
import { IconButton } from "@react-native-material/core";
import SettingsComponent from "../components/SettingsComponent";
import { StackActions } from "@react-navigation/native";
import DisplaySize from "../data/DisplaySize";
import { setSettingsData } from "../data/SaveData";

function Settings ({ route, navigation }) {

    const policyUrl = "";
    const rateUrl = "";
    const mailUrl = ''
    const { settings } = route.params;
    const shareMessage = i18n.t("ShareText") + " " + rateUrl;
    const [mySettings, setSettings] = React.useState(settings);
    const [email, setEmail] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [sortBy, setSortBy] = React.useState(null);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const iconSize = 24;
    const getColor = () => { return Colors[theme]?.white }

    const languages = {};
    for (const key in i18n.options.resources) {
        languages[key] =   i18n.options.resources[key].translation.lang;
    }

    const displaySizes = {};
    for (const key in DisplaySize) {
        displaySizes[key] = i18n.t(key)
    }

    const changeLanguage = async (lang) => {
        if (i18n.language === lang)
            return
        await i18n.changeLanguage(lang)
        await setSettings({ ...mySettings, language: lang })
    }

    const changeTheme = async () => {
        setSettings({ ...mySettings, theme: theme === 'dark' ? 'light' : 'dark' })
        toggleTheme();
    }

    const changeDisplaySize = async (size) => {
        setSettings({ ...mySettings, size: size })
    }
    
    useEffect(() => {
        setSettingsData(mySettings);
        console.log("inside useEffect")
    }, [mySettings]);

    const dataSourceInfo = () => {
        return (
            i18n.t("dataSourceInfo-exchange") + "\n\n"
            + i18n.t("dataSourceInfo-currency") + "\n\n"
            + i18n.t("dataSourceInfo-crypto") + "\n\n"
            + i18n.t("dataSourceInfo-flags")
        )
    }

    const settingsOptions = [
        {
            icon:
                <MaterialCommunityIcons
                    name="theme-light-dark"
                    size={iconSize}
                    color={getColor()}
                />,
            title: 'Theme',
            subTitle: theme,
            onPress: changeTheme
        },
        {
            icon:
                <Ionicons
                    name="language"
                    size={iconSize}
                    color={getColor()}
                />,
            title: 'Language',
            subTitle: 'lang',
            onPress: changeLanguage,
            selectElements: languages,
            selected: i18n.language
        },
        {
            icon:
                <MaterialIcons
                    name="table-rows"
                    size={iconSize}
                    color={getColor()}
                />,
            title: 'Display size',
            subTitle: mySettings.size,
            onPress: changeDisplaySize,
            selectElements: displaySizes,
            selected: mySettings.size
        },
        {
            icon:
                <FontAwesome5
                    name="google-play"
                    size={iconSize}
                    color={getColor()}
                />,
            title: 'Rate in Google Play',
            subTitle: null,
            onPress: () => { Linking.openURL(rateUrl).catch((err) => console.error('An error occurred', err)); }
        },
        {
            icon:
                <Entypo
                    name="share"
                    size={iconSize}
                    color={getColor()}
                />,
            title: 'Share',
            subTitle: null,
            onPress: () => { Share.share({ message: shareMessage }).catch((err) => console.error('An error occurred', err)); }
        },
        {
            icon:
                <MaterialIcons
                    name="feedback"
                    size={iconSize}
                    color={getColor()}
                />,
            title: 'Feedback',
            subTitle: null,
            onPress: () => { },
            infoDialog: "sendFeedbackEmail",
            button: {
                title: "email",
                onPress: () => {
                    Linking.openURL(mailUrl).catch((err) => console.error('An error occurred', err));
                }
            }
        },
        {
            icon:
                <MaterialIcons
                    name="policy"
                    size={iconSize}
                    color={getColor()}
                />,
            title: 'Privacy Policy',
            subTitle: null,
            onPress: () => { Linking.openURL(policyUrl).catch((err) => console.error('An error occurred', err)); }
        },
        {
            icon:
                <FontAwesome5
                    name="database"
                    size={iconSize}
                    color={getColor()}
                />,
            title: 'Data source',
            subTitle: null,
            onPress: () => { }, 
            infoDialog: dataSourceInfo()
        },
    ];

    
    React.useEffect(() => {
        navigation.setOptions(({
            headerTitle: i18n.t('Settings')
        }));
    }, [navigation, mySettings.language, mySettings.size, mySettings.theme]);

    const styles = StyleSheet.create({
        option: {
            paddingHorizontal: 20,
            paddingBottom: DisplaySize[mySettings.size].settings.space,
            paddingTop: DisplaySize[mySettings.size].settings.space,
            flexDirection: "row",
            alignItems: "center",
            gap: 20
        },
        title: {
            fontSize: DisplaySize[mySettings.size].settings.title, color: Colors[theme].white
        },
        subtitle: {
            fontSize: DisplaySize[mySettings.size].settings.subTitle, color: Colors[theme].darkWhite, opacity: 0.5, paddingTop: 5
        }
    });

    return (
        <SettingsComponent
            settingsOptions={settingsOptions}
            styles={styles}
        />
    );
}

export default Settings;
