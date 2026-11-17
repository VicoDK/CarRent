import { useState } from 'react';
import { Button, Modal, Platform, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type DateSelectionModalProps = {
  visible: boolean;
  startDate: Date | null;
  endDate: Date | null;
  onClose: () => void;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
};

type PickerField = 'start' | 'end';

const formatDateInput = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export default function DateSelectionModal({
  visible,
  startDate,
  endDate,
  onClose,
  onStartDateChange,
  onEndDateChange,
}: DateSelectionModalProps) {
  const [pickerFor, setPickerFor] = useState<PickerField | null>(null);

  function updateDate(date: Date) {
    if (pickerFor === 'start') {
      onStartDateChange(date);
      if (endDate !== null && date > endDate) {
        onEndDateChange(date);
      }
    } else if (pickerFor === 'end') {
      onEndDateChange(date);
    }
  }

  function close() {
    setPickerFor(null);
    onClose();
  }

  const today = new Date();
  const minimumDate =
    pickerFor === 'end' ? startDate ?? today : today;
  const selectedDate =
    (pickerFor === 'start' ? startDate : endDate) ?? minimumDate;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={close}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
        <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 12 }}>
          <Text>Select your rental dates</Text>

          <Button
            title={`Pickup: ${startDate?.toLocaleDateString()}`}
            onPress={() => setPickerFor('start')}
          />
          <Button
            title={`Return: ${endDate?.toLocaleDateString()}`}
            onPress={() => setPickerFor('end')}
          />

          {pickerFor && (
            Platform.OS === 'web' ? (
              <input
                type="date"
                value={formatDateInput(selectedDate)}
                min={formatDateInput(minimumDate)}
                onChange={(event) => {
                  if (event.currentTarget.value) {
                    updateDate(new Date(`${event.currentTarget.value}T00:00:00`));
                  }
                }}
              />
            ) : (
              <DateTimePicker
                value={selectedDate}
                minimumDate={minimumDate}
                mode="date"
                onValueChange={(_, date) => {
                  if (date) updateDate(date);
                }}
                onDismiss={() => setPickerFor(null)}
              />
            )
          )}

          {pickerFor && (
            <Button title="Done" onPress={close} />
          )}
          <Button title="Close" onPress={close} />
        </View>
      </View>
    </Modal>
  );
}