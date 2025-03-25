import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from '@components/Button';
import { api } from '@services/api';
import { COLORS, SPACING, FONTS } from '@constants/index';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Feed: undefined;
  Upload: {
    photo: {
      uri: string;
      base64?: string;
    };
  };
};



type UploadScreenProps = {
  route: RouteProp<RootStackParamList, 'Upload'>;
  navigation: NavigationProp<RootStackParamList>;
};

export const UploadScreen = ({ route, navigation }: UploadScreenProps) => {
  const { photo } = route.params;
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any); // FormData trong RN yêu cầu cast type

      formData.append('caption', caption);

      await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Thành công', 'Đăng bài thành công', [
        { text: 'OK', onPress: () => navigation.navigate('Feed') },
      ]);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể đăng bài');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} style={styles.preview} />
      <TextInput
        style={styles.input}
        placeholder="Thêm mô tả..."
        value={caption}
        onChangeText={setCaption}
        multiline
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Hủy"
          onPress={() => navigation.goBack()}
          variant="secondary"
        />
        <Button
          title="Đăng bài"
          onPress={handleUpload}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  preview: {
    width: '100%',
    height: 300,
    borderRadius: SPACING.sm,
    marginBottom: SPACING.md,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SPACING.xs,
    padding: SPACING.md,
    fontSize: FONTS.sizes.md,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
  },
});

export default UploadScreen;
