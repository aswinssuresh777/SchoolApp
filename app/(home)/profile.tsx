import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/colors';
import { Strings } from '../../assets/strings';
import { useUser } from '../../context/UserContext';

export default function ProfileScreen(): React.ReactElement {
  const router = useRouter();
  const { state, clearUserData } = useUser();
  const { userData } = state;
  console.log('userData', userData);

  const handleLogout = async () => {
    router.push("/screens/PaymentScreen");
    // try {
    //   await AsyncStorage.removeItem('userToken');
    //   clearUserData();
    //   router.replace('/(auth)/login');
    // } catch (error) {
    //   console.error('Error logging out:', error);
    // }
  };

  const getInitials = (): string => {
    const first = userData?.first_name?.[0] ?? '';
    const last = userData?.last_name?.[0] ?? '';
    const initials = (first + last).toUpperCase();
    return initials || 'U';
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

  const fullName = `${userData?.first_name ?? ''} ${userData?.last_name ?? ''}`.trim();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.headerCard}>
          <View style={styles.headerContent}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{getInitials()}</Text>
            </View>
            <Text style={styles.userName}>
              {userData?.first_name ?? ''} {userData?.last_name ?? ''}
            </Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{Strings.PROFILE.ACADEMIC_INFO_TITLE}</Text>
          
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailIconBox}>
                <Ionicons name="school-outline" size={20} color="#10b981" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>{Strings.PROFILE.BOARD_LABEL}</Text>
                <Text style={styles.detailValue}>{(userData as any)?.board?.board_name ?? Strings.COMMON.NOT_SPECIFIED}</Text>
              </View>
            </View>

            <View style={styles.rowDivider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconBox}>
                <MaterialIcons name="menu-book" size={20} color="#f59e0b" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>{Strings.PROFILE.CLASS_LABEL}</Text>
                <Text style={styles.detailValue}>{(userData as any)?.class?.class_name ?? Strings.COMMON.NOT_SPECIFIED}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Personal Details Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{Strings.PROFILE.PERSONAL_DETAILS_TITLE}</Text>
          
          <View style={styles.detailsCard}>
            {/* <View style={styles.detailRow}>
              <View style={styles.detailIconBox}>
                <Ionicons name="person-outline" size={20} color="#6366f1" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Full Name</Text>
                <Text style={styles.detailValue}>{fullName || 'Not specified'}</Text>
              </View>
            </View>

            <View style={styles.rowDivider} /> */}

            <View style={styles.detailRow}>
              <View style={styles.detailIconBox}>
                <Ionicons name="person-outline" size={20} color="#ec4899" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>{Strings.PROFILE.GENDER_LABEL}</Text>
                <Text style={styles.detailValue}>{(userData as any)?.gender ?? Strings.COMMON.NOT_SPECIFIED}</Text>
              </View>
            </View>

            <View style={styles.rowDivider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconBox}>
                <MaterialIcons name="date-range" size={20} color="#f97316" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>{Strings.PROFILE.DOB_LABEL}</Text>
                <Text style={styles.detailValue}>
                  {(userData as any)?.date_of_birth
                    ? new Date((userData as any).date_of_birth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : Strings.COMMON.NOT_SPECIFIED}
                </Text>
              </View>
            </View>

            <View style={styles.rowDivider} />

            <View style={styles.detailRow}>
              <View style={styles.detailIconBox}>
                <Feather name="mail" size={20} color="#06b6d4" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>{Strings.PROFILE.EMAIL_LABEL}</Text>
                <Text style={styles.detailValue}>{userData?.email ?? Strings.COMMON.NOT_SPECIFIED}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
            <Feather name="log-out" size={18} color="#dc2626" />
            <Text style={styles.logoutButtonText}>{Strings.PROFILE.LOGOUT_BUTTON}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  scrollView: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
    // Header Card
    headerCard: {
      backgroundColor: '#3b82f6',
      marginHorizontal: 16,
      marginTop: 16,
      borderRadius: 24,
      paddingTop: 32,
      paddingBottom: 20,
      paddingHorizontal: 20,
    },
    headerContent: {
      alignItems: 'center',
      flexDirection:'row',
      justifyContent:'space-between'
    },
    avatarContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderRadius: 50,
      paddingVertical: 24,
      paddingHorizontal: 28,
      marginBottom: 16,
      borderWidth: 3,
      borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    avatarText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#fff',
    },
    userName: {
      fontSize: 24,
      fontWeight: '700',
      color: '#fff',
      marginBottom: 4,
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

  // Section
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    marginLeft: 4,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  detailIconBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  rowDivider: {
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  // Logout
  logoutContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#fee2e2',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '700',
  },
});
