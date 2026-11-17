import { FlatList, Text } from 'react-native';
import CarCard, { CarResponse } from './CarCard';
import type { Booking } from '../Booking';

type CarListProps = {
  cars: CarResponse[];
  loading: boolean;
  onCarPress: (car: CarResponse) => void;
  bookings: Booking[];
  startDate: Date | null;
  endDate: Date | null;
};

export default function CarList({
  cars,
  loading,
  onCarPress,
  bookings,
  startDate,
  endDate,
}: CarListProps) {
  return (
    <FlatList
      data={cars.filter((car) => {
        if (!car.isAvailable) return false;
        if (startDate === null || endDate === null) return true;

        const requestedStart = startDate.getTime();
        const requestedEnd = endDate.getTime();

        const hasConflict = bookings.some((booking) => {
          if (booking.carId !== car.id) return false;

          const bookedStart = new Date(booking.StartDate).getTime();
          const bookedEnd = new Date(booking.EndDate).getTime();

          return bookedStart <= requestedEnd && bookedEnd >= requestedStart;
        });

        return !hasConflict;
      })}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <CarCard
          item={item}
          onPress={onCarPress}
        />
      )}
      ListEmptyComponent={
        !loading ? <Text>No cars available.</Text> : null
      }
    />
  );
}