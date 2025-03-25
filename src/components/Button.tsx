import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '@constants/colors';
import { SPACING } from '@constants/spacing';
import { FONTS } from '@constants/fonts';

interface ButtonProps {
  title: string;  // Chỉ giữ lại title, bỏ label
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  style?: object;  // Thêm prop style để tùy chỉnh style
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,  // Thêm style vào destructuring
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'secondary' && styles.secondaryButton,
        disabled && styles.disabledButton,
        style,  // Áp dụng custom style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : COLORS.primary} />
      ) : (
        <Text style={[
          styles.text,
          variant === 'secondary' && styles.secondaryText,
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    color: 'white',
    fontSize: FONTS.sizes.md,
    fontFamily: FONTS.medium,
  },
  secondaryText: {
    color: COLORS.primary,
  },
});
