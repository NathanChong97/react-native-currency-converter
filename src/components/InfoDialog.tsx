import React, { useContext, useState } from "react";
import {
    Text,
    RefreshControl,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Pressable,
    StyleProp
} from "react-native";
import { Colors } from "../theme";
import { ThemeContext } from "../theme/ThemeContext";
import {
    Dialog,
} from '@rneui/themed';
import i18n from "i18next";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons'
import { TextProps } from "@react-native-material/core";

interface DialogProps {
    title: string;
    information: string,
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
    button: any;
}

const InfoDialog: React.FC<DialogProps> = ({ title, information, modalVisible, setModalVisible, button }) => {

    const { theme } = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {
            maxHeight: '80%',
            backgroundColor: Colors[theme]?.themeColor
        },
        title: {
            fontSize: 20,
        },
        text: {
            fontSize: 16,
            color: Colors[theme].white
        },
    })



    return (
        <Dialog
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            overlayStyle={styles.container}
        >
            <Dialog.Title titleStyle={[styles.text, styles.title]} title={title} />
            <Text style={styles.text}>
                {i18n.t(information)}
            </Text>
            <Dialog.Actions>
                <Dialog.Button></Dialog.Button>
                {button && <Dialog.Button titleStyle={Colors[theme].primary as StyleProp<TextProps>} title={i18n.t(button.title)} onPress={button.onPress} />}
                <Dialog.Button titleStyle={Colors[theme].primary as StyleProp<TextProps>} title={i18n.t(button ? "Cancel" : "Close")} onPress={() => setModalVisible(false)} />
            </Dialog.Actions>
        </Dialog>
    );
}

export default InfoDialog;
