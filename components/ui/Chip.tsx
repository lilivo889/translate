import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle } from 'react-native';

interface ChipProps {
  /** Text displayed inside the chip. */
  label: string;
  /** Called when the chip is pressed. */
  onPress?: () => void;
  /** Additional style overrides. */
  style?: ViewStyle;
}

/**
 * A small rounded chip used for tags or suggestion buttons.  When
 * pressed it invokes the optional onPress handler.
 */
const Chip: React.FC<ChipProps> = ({ label, onPress, style }) => (
  <Pressable onPress={onPress} style={({ pressed }) => [styles.chip, style, pressed && styles.pressed]}> 
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#e0f2f1',
    marginRight: 8,
    marginBottom: 8,
  },
  pressed: {
    backgroundColor: '#b2dfdb',
  },
  label: {
    fontSize: 14,
    color: '#00695c',
  },
});

export default Chip;