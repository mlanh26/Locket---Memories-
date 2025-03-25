import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING } from '@constants/index';

interface ImagePostProps {
  uri: string;
  caption: string;
}

export const ImagePost: React.FC<ImagePostProps> = ({ uri, caption }) => {
  console.log('Rendering ImagePost:', { uri, caption });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        style={styles.image}
        resizeMode="cover"
        onError={(error) => console.log('Image loading error:', error)}
      />
      {caption && (
        <Text style={styles.caption}>{caption}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.background,
    borderRadius: SPACING.sm,
    overflow: 'hidden',
  },
  image: {
    width: Dimensions.get('window').width - (SPACING.md * 2),
    height: Dimensions.get('window').width - (SPACING.md * 2),
  },
  caption: {
    padding: SPACING.md,
    fontSize: 14,
  },
});
