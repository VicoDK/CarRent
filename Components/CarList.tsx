
import { FlatList, Text } from 'react-native';
import CarCard, { CarResponse } from './CarCard';

type CarListProps = {
  cars: CarResponse[];
  loading: boolean;
  onCarPress: (car: CarResponse) => void;
};

export default function CarList({
  cars,
  loading,
  onCarPress,
}: CarListProps) {
  return (
    <FlatList
      data={cars.filter((car) => car.isAvailable)}
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