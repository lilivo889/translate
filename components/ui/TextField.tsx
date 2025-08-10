import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface TextFieldProps extends TextInputProps {
  /** Label displayed above the input. */
  label: string;
  /** Helper text displayed below the input. */
  helperText?: string;
}

/**
 * A controlled text input with a label and optional helper text.  This
 * component encapsulates styling to ensure consistency across forms.
 */
const TextField: React.FC<TextFieldProps> = ({ label, helperText, style, ...props }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        {...props}
      />
      {helperText && <Text style={styles.helper}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  helper: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default TextField;