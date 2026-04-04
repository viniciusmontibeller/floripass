import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FavoriteButton({
  isFavorite = false,
  onPress = () => {},
  style,
}) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress} hitSlop={10}>
      <Ionicons
        name={isFavorite ? 'star' : 'star-outline'}
        size={20}
        color={isFavorite ? '#F59E0B' : '#CBD5E1'}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    // backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});