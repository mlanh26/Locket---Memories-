import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const GRID_SIZE = 5;
const ITEM_SIZE = (width - 40) / GRID_SIZE;

const ProfileScreen = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/camera');
  };

  // Mảng ảnh giả lập cho lưới
  const generateGridItems = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `item-${i}`,
      image: i % 3 === 0 ? require('../../assets/images/profile.png') : null,
    }));
  };

  const currentMonthItems = generateGridItems(15);
  const previousMonthItems = generateGridItems(25);

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
          <TouchableOpacity style={styles.goldBadge}>
            <Text style={styles.goldText}>Thử Locket Gold</Text>
          </TouchableOpacity>
          <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.settingsButton}>
              <Image 
                source={require('../../assets/images/Settings.png')}
                style={styles.settingsIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.friendsButton}
              onPress={() => router.push('/friendsList')}
            >
              <Image 
                source={require('../../assets/images/Group.png')}
                style={styles.friendsIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.userName}>Mai Lan Anh</Text>
        
        <View style={styles.profileImageContainer}>
          <Image 
            source={require('../../assets/images/profile.png')}
            style={styles.profileImage}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Current Month Grid */}
        <View style={styles.monthSection}>
          <Text style={styles.monthTitle}>tháng 2 2025</Text>
          <View style={styles.gridContainer}>
            {currentMonthItems.map((item, index) => (
              <View key={item.id} style={styles.gridItem}>
                {item.image && (
                  <Image source={item.image} style={styles.gridImage} />
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Previous Month Grid */}
        <View style={styles.monthSection}>
          <Text style={styles.monthTitle}>tháng 1 2025</Text>
          <View style={styles.gridContainer}>
            {previousMonthItems.map((item, index) => (
              <View key={item.id} style={styles.gridItem}>
                {item.image && (
                  <Image source={item.image} style={styles.gridImage} />
                )}
                {index === 12 && (
                  <View style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>💛913</Text>
            <Text style={styles.statLabel}>Locket</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>🔥44</Text>
            <Text style={styles.statLabel}>chuỗi</Text>
          </View>
        </View>
      </View>
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
    alignItems: 'center',
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
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButton: {
    padding: 8,
    marginRight: 8,
  },
  settingsIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  goldBadge: {
    backgroundColor: '#FFB800',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#000000',
  },
  goldText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
  friendsButton: {
    padding: 8,
  },
  friendsIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFB800',
    position: 'absolute',
    right: 16,
    top: 45,
  },
  profileImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  scrollView: {
    flex: 1,
  },
  monthSection: {
    marginBottom: 15,
  },
  monthTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: 16,
    marginBottom: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: 2,
    backgroundColor: '#1A1A1A',
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  addButton: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  addButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottomBar: {
    borderTopWidth: 0.5,
    borderTopColor: '#333333',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  statNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#888888',
  },
  statDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#333333',
    marginHorizontal: 8,
  },
  spacer: {
    height: 20,
  },
});

export default ProfileScreen;