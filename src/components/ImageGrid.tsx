import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SPACING } from '@constants/index';

interface ImageGridProps {
  images: Array<{
    id: string;
    imageUrl: string;
  }>;
  onPressImage: (image: any) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, onPressImage }) => {
  return (
    <View style={styles.grid}>
      {images.map((image) => (
        <TouchableOpacity
          key={image.id}
          onPress={() => onPressImage(image)}
          style={styles.imageContainer}
        >
          <Image source={{ uri: image.imageUrl }} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: '33.33%',
    padding: SPACING.xs,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default ImageGrid;
