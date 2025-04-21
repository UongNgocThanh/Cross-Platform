import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { chatSession } from "../../configs/AIModal";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "red",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 20,
    textAlign: "center",
  },
  heading: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    color: "gray",
    fontSize: 16,
    fontWeight: 300,
    textAlign: "center",
  },
});

const GenerateTripScreen = () => {
  const navigation: any = useNavigation();
  const route: RouteProp<RootStackParamList, "select-budget"> = useRoute();

  const [tripData, setTripData] = useState<ITripData>({
    name: route.params?.name,
    coordinates: {
      lat: route.params?.coordinates.lat,
      lng: route.params?.coordinates.lng,
    },
    photoRef: route.params?.photoRef,
    url: route.params?.url,
    traveler: route.params?.traveler,
    time: route.params?.time,
    budget: route.params?.budget,
  });

  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    GenerateAITrip();
  }, []);

  const AI_PROMPT =
    "Generate Travel Plan for Location: {location} for {totalDays} Days and {totalNight} Night for {traveler} with a {budget} budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {totalDays} days and {totalNight} night with each day plan with best time to visit in JSON format.";

  const GenerateAITrip = async () => {
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replaceAll("{location}", tripData.name)
      .replaceAll("{totalDays}", tripData.time.totalNoOfDays + "")
      .replaceAll("{totalNight}", tripData.time.totalNoOfDays - 1 + "")
      .replaceAll("{traveler}", tripData.traveler.title)
      .replaceAll("{budget}", tripData.budget.title);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    const tripResponse = JSON.parse(result.response.text());
    setLoading(false);

    const docID = Date.now().toString();
    await setDoc(doc(db, "UserTrips", docID), {
      userEmail: user?.email,
      tripPlan: tripResponse,
      tripData: JSON.stringify(tripData),
      docID: docID,
    });

    navigation.popTo("home");
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <Text style={styles.title}>Please Wait...</Text>
      <Text style={styles.heading}>
        We are working to generate your dream trip
      </Text>
      <Image
        contentFit="contain"
        style={{ width: "100%", height: 300 }}
        source={{
          uri: "https://ugokawaii.com/wp-content/uploads/2023/04/plane.gif",
        }}
      ></Image>
      <Text style={styles.description}>Do not Go Back</Text>
    </SafeAreaView>
  );
};

export default GenerateTripScreen;
