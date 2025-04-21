import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Friend {
  id: string;
  name: string;
  avatar?: any;
  isOnline?: boolean;
}

const FriendsScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const handleBack = () => {
    // Điều hướng trực tiếp đến trang ProfileScreen
    router.push('/profile');
  };

  const friends: Friend[] = [
    { id: '1', name: 'Văn Đức Anh', avatar: require('../../assets/images/profile.png'), isOnline: true },
    { id: '2', name: 'Lê Việt Hùng', avatar: require('../../assets/images/profile.png'), isOnline: false },
    { id: '3', name: 'Nguyễn Hoài Nam', avatar: require('../../assets/images/profile.png'), isOnline: true },
  ];

  const pendingFriends: Friend[] = [
    { id: '4', name: 'Ngọc Bích', avatar: require('../../assets/images/profile.png') },
  ];

  const socialApps = [
    { id: '1', name: 'Messenger', color: '#0084FF', icon: 'M' },
    { id: '2', name: 'Zalo', color: '#0068FF', icon: 'Z' },
    { id: '3', name: 'Tin nhắn', color: '#34B7F1', icon: 'Tn' },
    { id: '4', name: 'Khác', color: '#555555', icon: '+' },
  ];

  const suggestions: Friend[] = [
    { id: '5', name: 'Tin nhắn Instagram', avatar: require('../../assets/images/profile.png') },
    { id: '6', name: 'Tin nhắn', avatar: require('../../assets/images/profile.png') },
    { id: '7', name: 'Telegram', avatar: require('../../assets/images/profile.png') },
    { id: '8', name: 'Các ứng dụng khác', avatar: require('../../assets/images/profile.png') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Image 
              source={require('../../assets/images/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.title}>27 / 20 người bạn</Text>
          <View style={styles.placeholder} />
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={16} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm người bạn mới"
            placeholderTextColor="#666666"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Find Friends from other apps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Find friends from other apps</Text>
          <View style={styles.appGrid}>
            {socialApps.map(app => (
              <View key={app.id} style={styles.appItem}>
                <View style={[styles.appIcon, { backgroundColor: app.color }]}>
                  <Text style={styles.appIconText}>{app.icon}</Text>
                </View>
                <Text style={styles.appName}>{app.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bạn bè của bạn */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bạn bè của bạn</Text>
          {friends.map(friend => (
            <View key={friend.id} style={styles.friendItem}>
              <View style={styles.friendAvatar}>
                <Image source={friend.avatar} style={styles.avatarImage} />
                {friend.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              <Text style={styles.friendName}>{friend.name}</Text>
              <TouchableOpacity style={styles.removeButton}>
                <Ionicons name="close" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Đang chờ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Các đề xuất</Text>
          {pendingFriends.map(friend => (
            <View key={friend.id} style={styles.friendItem}>
              <View style={styles.friendAvatar}>
                <Image source={friend.avatar} style={styles.avatarImage} />
              </View>
              <View style={styles.pendingInfo}>
                <Text style={styles.friendName}>{friend.name}</Text>
                <Text style={styles.pendingText}> Đã có trên Locket 💛</Text>
              </View>
              <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.acceptText}>+Thêm</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Các đề xuất */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chia sẻ Liên kết Locket của bạn</Text>
          <TouchableOpacity style={styles.suggestionItem}>
            <View style={styles.friendAvatar}>
              <Ionicons name="logo-instagram" size={24} color="#E1306C" style={styles.suggestionIcon} />
            </View>
            <Text style={styles.friendName}>Tin nhắn Instagram</Text>
            <Ionicons name="chevron-forward" size={16} color="#666666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.suggestionItem}>
            <View style={styles.friendAvatar}>
              <Ionicons name="chatbubble" size={24} color="#34B7F1" style={styles.suggestionIcon} />
            </View>
            <Text style={styles.friendName}>Tin nhắn</Text>
            <Ionicons name="chevron-forward" size={16} color="#666666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.suggestionItem}>
            <View style={styles.friendAvatar}>
              <Ionicons name="paper-plane" size={24} color="#0088cc" style={styles.suggestionIcon} />
            </View>
            <Text style={styles.friendName}>Telegram</Text>
            <Ionicons name="chevron-forward" size={16} color="#666666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.suggestionItem}>
            <View style={styles.friendAvatar}>
              <Ionicons name="apps" size={24} color="#888888" style={styles.suggestionIcon} />
            </View>
            <Text style={styles.friendName}>Các ứng dụng khác</Text>
            <Ionicons name="chevron-forward" size={16} color="#666666" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
    paddingBottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 36,
    color: '#FFFFFF',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  appGrid: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  appItem: {
    alignItems: 'center',
    width: '25%',
    marginBottom: 12,
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  appIconText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    position: 'relative',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#000000',
  },
  friendName: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  removeButton: {
    padding: 8,
  },
  pendingInfo: {
    flex: 1,
  },
  pendingText: {
    fontSize: 14,
    color: '#FFB800',
  },
  acceptButton: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  acceptText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
  },
  suggestionIcon: {
    alignSelf: 'center',
  },
  spacer: {
    height: 20,
  },
});

export default FriendsScreen;