import { FlatList, Text } from 'react-native';
import BookingCard from './CarCardOrder';
import { Booking } from '../Booking';

type BookingListProps = {
  bookings: Booking[];
  loading: boolean;
};

export default function CarOrderDetail({
  bookings,
  loading,
}: BookingListProps) {
  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BookingCard
          item={item}
        />
      )}
      ListEmptyComponent={
        !loading ? <Text>No bookings found.</Text> : null
      }
    />
  );
}