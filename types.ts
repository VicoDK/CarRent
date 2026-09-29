export type RootStackParamList = {
  Home: undefined;
  Cars: undefined; //scene without parameter and this is how to use it navigation.navigate("Cars");
  LookingAtCar: { car: any }; //scene with parameter and car is the name and any meant it can recieve many diffrent types and this is how to use it navigation.navigate("LookingAtCar", { car: item });
  CarOdered: { car: any };
};
/*this is the file that defines all the scenes with paramenters*/