import {
  StyleSheet,
  View,
} from "react-native";

import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  Region,
} from "react-native-maps";
import * as Location from "expo-location";
import "react-native-get-random-values";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  back_icon: {
    zIndex: 1,
    position: "absolute",
    top: 15,
    left: 20,
    padding: 3,
    backgroundColor: "#fff",
    borderRadius: 30,
  },
});

const MapScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, "map"> = useRoute();
  const loc: any = route.params;

  const [region, setRegion] = useState<Region>({
    latitude: loc.latitude,
    longitude: loc.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Oops permission to access location was denied");
    }

    // let location = await Location.getCurrentPositionAsync({});

    // setRegion({
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    //   latitudeDelta: 0.005,
    //   longitudeDelta: 0.005,
    // });
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.container}>
      <Ionicons
          style={styles.back_icon}
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />

        <MapView
          style={styles.map}
          initialRegion={region}
          region={region}
          provider={PROVIDER_DEFAULT}
          // onRegionChangeComplete={(region) => setRegion(region)}
          zoomEnabled={true}
          followsUserLocation
          showsMyLocationButton
          mapType="standard"
          showsUserLocation
        >
          <Marker
            coordinate={region}
            title={loc.placeName}
            // description={"VKU"}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
