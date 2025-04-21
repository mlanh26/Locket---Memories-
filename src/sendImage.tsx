import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Dummy friends data - replace with real data from your store or API
type Friend = { id: string; name: string; avatar: string };
const friends: Friend[] = [
  { id: '1', name: 'Tất cả', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Vân', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', name: 'Lê', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
];

export default function SendImageScreen() {
  const router = useRouter();
  const { imageUri } = useLocalSearchParams();
  const [caption, setCaption] = useState('');
  const [selected, setSelected] = useState<string>('1'); // Default: 'Tất cả'

  const sendImage = () => {
    // Logic gửi ảnh + caption cho bạn đã chọn
    // ...
    router.replace('/messages');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Gửi đến...</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Image preview */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUri as string }} style={styles.image} resizeMode="cover" />
        <TextInput
          style={styles.caption}
          placeholder="Thêm một tin nhắn"
          placeholderTextColor="#ccc"
          value={caption}
          onChangeText={setCaption}
        />
      </View>
      {/* Friends selector */}
      <FlatList
        data={friends}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.friendsList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.friend, selected === item.id && styles.friendSelected]}
            onPress={() => setSelected(item.id)}
          >
            <Image source={{ uri: item.avatar }} style={styles.friendAvatar} />
            <Text style={[styles.friendName, selected === item.id && styles.friendNameSelected]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {/* Send button */}
      <TouchableOpacity style={styles.sendButton} onPress={sendImage}>
        <Ionicons name="send" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#181818' 
},

  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16 
},

  headerText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
},
  imageWrapper: { 
    alignItems: 'center', 
    marginTop: 8, 
    marginBottom: 8 
},
  image: { 
    width: 220, 
    height: 220, 
    borderRadius: 20, 
    marginBottom: 8 
},

  caption: { 
    backgroundColor: '#222', 
    color: '#fff', borderRadius: 18, 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    fontSize: 16, 
    width: 220, 
    position: 'absolute', 
    bottom: 10 
  },
  
  friendsList: { 
    paddingHorizontal: 10, 
    paddingVertical: 10 
  },

  friend: { 
    alignItems: 'center', 
    marginHorizontal: 8 
  },

  friendSelected: { 
    borderColor: '#FFB800', 
    borderWidth: 2, 
    borderRadius: 30 
  },

  friendAvatar: { 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    marginBottom: 4 
  },

  friendName: { 
    color: '#fff', 
    fontSize: 14, 
    marginTop: 2 
  },

  friendNameSelected: { 
    color: '#FFB800', 
    fontWeight: 'bold' },
  sendButton: { 
    backgroundColor: '#FFB800', 
    borderRadius: 32, 
    padding: 18, 
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'absolute', 
    bottom: 30, right: 30, 
    elevation: 3 },
});
