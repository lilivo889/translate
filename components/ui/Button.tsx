import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  /** Label displayed inside the button. */
  title: string;
  /** Called when the button is pressed. */
  onPress: () => void;
  /** If true the button will appear disabled and ignore presses. */
  disabled?: boolean;
}

/**
 * A reusable primary button.  The colour palette reflects the
 * application's brand (teal).  Uses Pressable to provide feedback
 * on press.
 */
const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00897b',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: '#b2dfdb',
  },
  pressed: {
    backgroundColor: '#00695c',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;