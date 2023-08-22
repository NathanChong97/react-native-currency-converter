import { Image } from "react-native";

export enum CurrencyType{
  Currency = "currency",
  Crypto = "crypto"
}

export interface Currency {
  rate: number;
  full_name: string;
  name: string;
  symbol: string;
  convertedResult: number | string;
  imageUrl: string;
  type: CurrencyType;
}


export interface CurrenciesDetails {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}



export interface ValueSymbols {
  description: string,
  code: string
}

export interface CryptoData {
  Id: string;
  Url: string;
  ImageUrl: string;
  ContentCreatedOn: number;
  Name: string;
  Symbol: string;
  CoinName: string;
  FullName: string;
  Description: string;
  AssetTokenStatus: string;
  Algorithm: string;
  ProofType: string;
  SortOrder: string;
  Sponsored: boolean;
  Taxonomy: Taxonomy;
  Rating: Rating;
}

interface Taxonomy {
  Access: string;
  FCA: string;
  FINMA: string;
  Industry: string;
  CollateralizedAsset: string;
  CollateralizedAssetType: string;
  CollateralType: string;
  CollateralInfo: string;
}

interface Rating {
  Weiss: Weiss;
}

interface Weiss {
  Rating: string;
  TechnologyAdoptionRating: string;
  MarketPerformanceRating: string;
}