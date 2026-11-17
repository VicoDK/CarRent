import { View, Text } from 'react-native';
import { Booking } from '../Booking';

type BookingCardProps = {
  item: Booking;
};

export default function CarCardOrder({
  item,
}: BookingCardProps) {
  return (
    <View>
        <hr></hr>
      <Text>{item.carName}</Text>
      <Text>
  {new Date(item.StartDate).toLocaleDateString()} - {new Date(item.EndDate).toLocaleDateString()}
</Text>
      
    </View>
  );
}