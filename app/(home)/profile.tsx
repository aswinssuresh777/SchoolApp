import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/colors';
import { Strings } from '../../assets/strings';
import { useUser } from '../../context/UserContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { state, clearUserData } = useUser();
  const { userData } = state;

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      clearUserData();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.title}>{Strings.PROFILE.NO_USER_DATA_TITLE}</Text>
          <Text style={styles.subtitle}>{Strings.PROFILE.NO_USER_DATA_SUBTITLE}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.headerTitle}>{Strings.PROFILE.TITLE}</Text>
        
        <View style={styles.profileCard}>
          <Text style={styles.cardTitle}>{Strings.PROFILE.PERSONAL_INFO_TITLE}</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userData.first_name} {userData.last_name}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Student Code:</Text>
            <Text style={styles.value}>{userData.student_code}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>{userData.gender}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>{Strings.PROFILE.EMAIL_LABEL}</Text>
            <Text style={styles.value}>{userData.email}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>{Strings.PROFILE.DOB_LABEL}</Text>
            <Text style={styles.value}>{userData.dob.toLocaleDateString()}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>{Strings.PROFILE.BOARD_LABEL}</Text>
            <Text style={styles.value}>{userData.board}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>{Strings.PROFILE.CLASS_LABEL}</Text>
            <Text style={styles.value}>{userData.class}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>{Strings.PROFILE.STATUS_LABEL}</Text>
            <Text style={[styles.value, styles.statusText]}>
              {userData.isLoggedIn ? Strings.PROFILE.ACTIVE_STATUS : Strings.PROFILE.INACTIVE_STATUS}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>{Strings.PROFILE.LOGOUT_BUTTON}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: 24,
  },
  profileCard: {
    backgroundColor: Colors.CARD_BACKGROUND,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.CARD_SHADOW,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.TEXT_PRIMARY,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_LIGHT,
  },
  label: {
    fontSize: 16,
    color: Colors.TEXT_SECONDARY,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: Colors.TEXT_PRIMARY,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: Colors.BUTTON_ERROR,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: Colors.TEXT_WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.TEXT_PRIMARY,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.TEXT_SECONDARY,
    textAlign: 'center',
  },
  statusText: {
    color: Colors.SUCCESS,
    fontWeight: 'bold',
  },
});