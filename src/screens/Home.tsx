import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid
} from "react-native";
import CurrencyElement from "../components/CurrencyElement";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from "../theme";
import { ThemeContext, ThemeType } from "../theme/ThemeContext";
import i18n from "i18next";
import { IconButton } from "@react-native-material/core";
import { Currency, CurrencyType } from "../components/Currency";
import { getLocalData, setData, updateData } from "../data/SaveData";
import InputValueModal from "../components/InputValueModal";
import DefaultData from "../data/DefaultData";
import DisplaySize from "../data/DisplaySize";
import options from "axios";
import i18next from "i18next";
import InfoDialog from "../components/InfoDialog";
import Calculator from "../components/Calculator";
import * as StoreReview from 'react-native-store-review';
import { Data } from '../data/Data'

export function formatLastUpdate(lastUpdate: string | undefined): string {
  if (!lastUpdate)
    return "";
  const date = new Date(lastUpdate);
  return i18n.t("Last update") + ": " + date.toLocaleString();
}


export default function Home({ navigation, route }: { navigation: any, route: any }) {

  // static contextType = ThemeContext;
  const { theme, changeTheme } = useContext(ThemeContext);
  const [data, setData] = useState(DefaultData as Data)
  const [refreshing, setRefreshing] = useState(false)
  const [calculatorVisible, setCalculatorVisible] = useState(true)
  const [isGoingBack, setIsGoingBack] = useState(false)
  const [calculatorValue, setCalculatorValue] = useState('1')
  const [dialogAsk, setDialogAsk] = useState({
    isActive: false,
    title: "",
    description: "",
    onAccept: () => { },
  })
  const [orientation, setOrientation] = useState('portrait')
  const prevDataRef = useRef<Data>(DefaultData);

  useEffect(() => {
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };
    setOrientation(isPortrait() ? 'portrait' : 'landscape')

    Dimensions.addEventListener('change', () => {
      setOrientation(isPortrait() ? 'portrait' : 'landscape')
    });

    loadData();
    updateHeader();

    navigation.addListener('focus', async () => {
      const newData = await getLocalData();
      if (newData) {
        setData({ ...prevDataRef.current, selectedCurrencies: newData.selectedCurrencies, settings: newData.settings })
        convertValue(data.providedAmount)
      }
    });
  }, [])


  useEffect(() => {
    prevDataRef.current = data
    updateHeader();
  }, [data])

  // constructor(props: any) {
  //   super(props);

  //   const isPortrait = () => {
  //     const dim = Dimensions.get('screen');
  //     return dim.height >= dim.width;
  //   };

  //   this.state = {
  //     data: DefaultData,
  //     refreshing: false,
  //     calculatorVisible: true,
  //     isGoingBack: false,
  //     calculatorValue: '1',
  //     dialogAsk: {
  //       isActive: false,
  //       title: "",
  //       description: "",
  //       onAccept: undefined,
  //     },
  //     orientation: isPortrait() ? 'portrait' : 'landscape'
  //   };

  //   Dimensions.addEventListener('change', () => {
  //     this.setState({
  //       orientation: isPortrait() ? 'portrait' : 'landscape'
  //     });
  //   });
  // }


  const updateHeader = () => {
    // const { navigation } = this.props;
    // const { theme } = this.context;

    navigation.setOptions({
      headerTitle: i18n.t("currencyConverter"),
      headerRight: () => (
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <IconButton
            onPress={() => navigation.navigate("Settings", { settings: data.settings })}
            icon={(props) => (
              <Ionicons
                name="settings-outline"
                size={24}
                color={Colors[theme].white}
              />
            )}
          />
        </View>
      )
    });
  }

  const loadData = async () => {
    const localData = await getLocalData();

    await setData(localData)
    // changeTheme(localData.settings.theme as ThemeType)
    // await this.setState({ data: localData });
    // const { changeTheme } = useContext(ThemeContext);
    // const { changeTheme } = this.context;

    // this.props.changeTheme(localData.settings.theme as ThemeType)
    // i18n.changeLanguage(localData.settings.language)
    fetchData();
  }

  // useEffect(() => {
  //   updateHeader();
  //   loadData();

  //   navigation.addListener('focus', async () => {
  //     const newData = await getLocalData();
  //     if (newData) {
  //       setData({ ...prevDataRef.current, selectedCurrencies: newData.selectedCurrencies, settings: newData.settings })
  //       convertValue(data.providedAmount)
  //     }
  //   });
  // }, [])
  // componentDidMount() {
  //   // const { navigation } = this.props;
  //   // const { theme } = this.context;
  //   // const { theme } = useContext(ThemeContext);

  //   this.updateHeader();
  //   this.loadData();

  //   navigation.addListener('focus', async () => {
  //     const newData = await getLocalData();
  //     if (newData) {
  //       await this.setState((prevState: { data: any; }) => ({
  //         data: { ...prevState.data, selectedCurrencies: newData.selectedCurrencies, settings: newData.settings }
  //       }));
  //       this.convertValue(this.state.data.providedAmount)
  //     }
  //   });
  // }

  useEffect(() => {
    if (prevDataRef.current.providedAmount !== data.providedAmount || prevDataRef.current.selectedCurrency !== data.selectedCurrency) {
      convertValue(data.providedAmount);
    }

    updateHeader();

    if (data)
      if (data.selectedCurrencies.length != 7) {
        const randomBoolean = Math.random() < 0.5;
        if (randomBoolean)
          reviewApp();
      }
  }, [prevDataRef.current.providedAmount, prevDataRef.current.selectedCurrency])

  // componentDidUpdate(prevProps: any, prevState: any) {
  //   if (prevState.providedAmount !== this.state.providedAmount || prevState.data.selectedCurrency !== this.state.data.selectedCurrency) {
  //     this.convertValue(this.state.data.providedAmount);
  //   }

  //   this.updateHeader();

  //   if (this.state.data)
  //     if (this.state.data.selectedCurrencies.length != 7) {
  //       const randomBoolean = Math.random() < 0.5;
  //       if (randomBoolean)
  //         this.reviewApp();
  //     }
  // }

  const reviewApp = async () => {
    // if (await StoreReview.hasAction()) {
    //   await StoreReview.requestReview()
    // }
    await StoreReview.requestReview()
  }

  const fetchData = async () => {
    try {
      const newData = await updateData(data);
      if (newData === null) {
        ToastAndroid.show(i18n.t("Error updating exchange rates"), ToastAndroid.SHORT);
        return;
      }
      setData(newData)
      setRefreshing(false)
      // this.setState({ data: newData, refreshing: false });
      convertValue(data.providedAmount);
    } catch (error) {
      console.error(error);
    }
  };

  const saveData = () => {
    setData(data);
  }

  const removeCurrency = (selectedCurrency: string) => {
    const new_selected = [...data.selectedCurrencies];
    const index = data.selectedCurrencies.findIndex((currency: { name: string; }) => currency.name === selectedCurrency);
    if (index !== -1) {
      new_selected.splice(index, 1);
    }

    setData({
      ...prevDataRef.current,
      selectedCurrencies: new_selected
    })
    setDialogAsk({
      ...dialogAsk,
      isActive: false
    })
    saveData()
    // this.setState((prevState: { data: any; }) => (
    //   {
    //     data: {
    //       ...prevState.data,
    //       selectedCurrencies: new_selected
    //     },
    //     dialogAsk: {
    //       isActive: false
    //     }
    //   }), () => this.saveData());
  }

  const cancelDialogAsk = () => {
    setDialogAsk({
      ...dialogAsk,
      isActive: false
    })
    // this.setState(
    //   {
    //     dialogAsk: {
    //       isActive: false
    //     }
    //   })
  }

  const removeCurrencyAsk = (selectedCurrency: { full_name: string; name: string; }) => {
    setDialogAsk({
      isActive: true,
      title: i18n.t("Remove") + " " + selectedCurrency.full_name,
      description: i18n.t("Are you sure you want to delete") + " " + selectedCurrency.full_name + " (" + selectedCurrency.name + ") " + i18n.t("from quick access?"),
      onAccept: () => removeCurrency(selectedCurrency.name)
    })
    // this.setState(
    //   {
    //     dialogAsk: {
    //       isActive: true,
    //       title: i18n.t("Remove") + " " + selectedCurrency.full_name,
    //       description: i18n.t("Are you sure you want to delete") + " " + selectedCurrency.full_name + " (" + selectedCurrency.name + ") " + i18n.t("from quick access?"),
    //       onAccept: () => this.removeCurrency(selectedCurrency.name)
    //     }
    //   }
    // )
  }

  const hideCalculator = () => {
    setCalculatorVisible(false)
    // this.setState({
    //   calculatorVisible: false
    // })
  }

  const handleCalculatorView = (value: string) => {
    setData({
      ...prevDataRef.current,
      selectedCurrencies: prevDataRef.current.selectedCurrencies.map((item) => {
        if (item.name === data.selectedCurrency?.name) {
          return {
            ...item,
            convertedResult: value
          };
        }
        return item;
      })
    })
    setCalculatorValue(value)

    // this.setState((prevState: { data: { selectedCurrencies: any[]; }; }) => ({
    //   data: {
    //     ...prevState.data,
    //     calcaulatorValue: value,
    //     selectedCurrencies: prevState.data.selectedCurrencies.map((item: { name: any; }) => {
    //       if (item.name === this.state.data.selectedCurrency.name) {
    //         return {
    //           ...item,
    //           convertedResult: value
    //         };
    //       }
    //       return item;
    //     })
    //   }
    // }));
  };

  const selectCurrency = (selectedCurrency: any) => {
    if (!selectedCurrency) return;

    if (selectedCurrency.name === data.selectedCurrency?.name) {
      setCalculatorVisible(true)
      // this.setState({
      //   calculatorVisible: true,
      // });
      return;
    }

    setCalculatorVisible(true)
    setData({
      ...prevDataRef.current,
      selectedCurrency: selectedCurrency
    })

    // this.setState((prevState: { data: any; }) => ({
    //   calculatorVisible: true,
    //   data: {
    //     ...prevState.data,
    //     selectedCurrency: selectedCurrency
    //   }
    // }));
  };


  const convertValue = (value: number) => {
    if (isNaN(value)) {
      value = 0;
    }
    const { selectedCurrencies } = data;
    let currencyBase = data.selectedCurrency;

    if (selectedCurrencies) {
      const updatedCurrencies = selectedCurrencies.map((currency: { convertedResult: any; name: any; rate: number; full_name: string; symbol: string; imageUrl: string; type: CurrencyType; }) => {
        let result = currency.convertedResult;
        if (currency.name === data.selectedCurrency?.name) {
          if (currency.rate == currency.convertedResult && currency.convertedResult != data.providedAmount) {
            result = calculatorValue
          }
        }
        if (currency.name != data.selectedCurrency?.name && currencyBase != undefined) {
          const rateBase = currency.rate / currencyBase.rate;
          result = value * rateBase;
        }
        return {
          ...currency,
          convertedResult: result
        }
      });
      setData({
        ...prevDataRef.current,
        selectedCurrencies: updatedCurrencies,
        providedAmount: value
      })
      // this.setState((prevState: { data: any; }) => ({
      //   data: {
      //     ...prevState.data,
      //     selectedCurrencies: updatedCurrencies,
      //     providedAmount: value
      //   }
      // }), () => this.saveData());
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchData()
    // this.setState({ refreshing: true }, () => {
    //   this.fetchData();
    // });
  };

  // get refreshContolStyle() {
  //   // const { theme } = useContext(ThemeContext);
  //   // const theme = this.props.theme === 'dark' ? 'dark' : 'light'

  //   return [this.ColorTheme.primary, this.ColorTheme.disabled]
  // }

  // get ColorTheme() {
  //   const theme = this.props.theme === 'dark' ? 'dark' : 'light'

  //   return Colors[theme]
  // }

  // get GetTheme() {
  //   const theme = this.props.theme === 'dark' ? 'dark' : 'light'
  //   console.log("current theme is: " + theme)
  //   return theme
  // }


  const styles = () => {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: Colors[theme].common,
        flexDirection: orientation === 'portrait' ? "column" : "row"
      },
      titleStyle: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors[theme].white,
        padding: 10
      },
      textStyle: {
        fontSize: 16,
        color: Colors[theme].white,
        textAlign: "center",
        padding: 10
      },

      touchableOpacityStyle: {
        position: "absolute",
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        bottom: 30,
        backgroundColor: Colors[theme].primary,
        borderRadius: 30
      },
      floatingButtonStyle: {
        resizeMode: "contain",
        width: 50,
        height: 50
        //backgroundColor:'black'
      },
      iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 120
      },
      addButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: Colors[theme].darkThemeColor,
        borderStyle: "dotted",
        marginHorizontal: 10,
        marginTop: DisplaySize[data.settings.size].space,
        marginBottom: DisplaySize[data.settings.size].space,
        padding: 10,
        paddingVertical: DisplaySize[data.settings.size].padding,
        borderRadius: 10,
      },
      addButtonText: {
        color: Colors[theme].darkWhite,
        padding: 5
      },
      emptyListView: {
        marginVertical: 20,
        flexGrow: 1,
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      },
      emptyListText: {
        marginTop: 10,
        color: Colors[theme].darkWhite,
        fontSize: 16,
      },
    })
  }


  const EmptyList = () => {
    return (
      <View style={styles().emptyListView}>
        <MaterialIcons name="highlight-off" size={34} color={'grey'} />
        <Text style={styles().emptyListText}>{i18n.t("No currencies found")}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles().container}>
      <InfoDialog title={dialogAsk.title} information={dialogAsk.description} modalVisible={dialogAsk.isActive} button={{ title: i18n.t("Remove"), onPress: dialogAsk.onAccept }} setModalVisible={cancelDialogAsk} />
      <View style={styles().container}>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors[theme].primary, Colors[theme].disabled]} progressBackgroundColor={Colors[theme].common} />}
        >
          <View style={{ height: DisplaySize[data.settings.size].space }} />
          {
            data?.selectedCurrencies.length > 0 ?
              data?.selectedCurrencies.map((currency: { name: React.Key | null | undefined; }) =>
                <CurrencyElement
                  key={currency.name}
                  onPress={selectCurrency}
                  onLongPress={removeCurrencyAsk}
                  currency={currency}
                  displaySize={data.settings.size}
                  selected={data.selectedCurrency?.name === currency.name}
                  theme={theme} />
              ) : <EmptyList />
          }

          <TouchableOpacity onPress={() => navigation.navigate("Selector", {
            data: data
          })} style={[styles().addButton]}>
            <Ionicons name="add-circle" size={24} color={Colors[theme].primary} />
            <Text style={[styles().textStyle, styles().addButtonText]}>{i18n.t("Add new")}</Text>
          </TouchableOpacity>
          <Text style={{
            alignSelf: "flex-end",
            margin: 5,
            marginHorizontal: 10,
            color: Colors[theme].darkWhite
          }}>{formatLastUpdate(data?.lastUpdate)}</Text>
          <View style={{ height: DisplaySize[data.settings.size].space }} />
        </ScrollView>
        <Calculator handleCalculatorView={handleCalculatorView} convertValue={convertValue} hideCalculator={hideCalculator} visible={calculatorVisible} orientation={orientation} />
      </View>
    </SafeAreaView>
  );

  // render() {
  //   // const { theme } = useContext(ThemeContext);
  //   // const { theme } = this.context;    
  // }
}

// export default Home;




