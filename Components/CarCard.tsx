
import { Text, View, Image, Pressable } from 'react-native';
import styles from '../styles/styles';

export interface CarResponse {
  id: string;
  name: string;
  model: string;
  year: number;
  pricePerDay: number;
  isAvailable: boolean;
}

type CarCardProps = {
  item: CarResponse;
  onPress: (car: CarResponse) => void;
};

export default function CarCard({ item, onPress }: CarCardProps) {
  return (
    <Pressable
      style={styles.loggedInItem}
      onPress={() => onPress(item)}
    >
      <Text>
        {item.name} - {item.pricePerDay}kr/day
      </Text>

      <Image
        source={{
          uri: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/1925_Ford_Model_T_touring.jpg/1280px-1925_Ford_Model_T_touring.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=thumbnail',
        }}
        style={styles.carImage}
      />
    </Pressable>
  );
}