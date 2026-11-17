import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles/styles';
import CarOrderDetail from './Components/CarOrderDetail';
import { Booking } from './Booking';
import { AuthContext } from "./AuthContext";
import { useContext, type ContextType  } from "react";

export default function Profil() {

    const auth = useContext(AuthContext); //gives scene acces to the logged in bool
    
    
    if (!auth) {
        throw new Error("Something wrong");
    } //throw a error if it doesnt have accese to logged in bool

    const [bookings, setBookings] = useState<Booking[]>([]);
    const myBookings = bookings.filter((booking) => booking.userName === auth.currentUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBookings();
    }, []);

    async function loadBookings() {
        const data = await AsyncStorage.getItem("bookings");

        if (data) {
            setBookings(JSON.parse(data));
        }

        setLoading(false);


    }

    return (
        <View style={styles.container}>
            <Text>Name:  {auth.currentUser ?? "Not logged in"}</Text>

            <Text>Your bookings:</Text>

            <CarOrderDetail
                bookings={myBookings}
                loading={loading}
            />
        </View>
    );
}