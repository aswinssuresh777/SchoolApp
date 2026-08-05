import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/colors';
import { Strings } from '../../assets/strings';
import { useUser } from '../../context/UserContext';
import RazorpayCheckout from "react-native-razorpay";
import { apiClient } from '@/services/api';
import { URLS } from '@/constants/urls';
import { showAppAlert } from '@/components/AppAlert';

export default function ProfileScreen(): React.ReactElement {
  const router = useRouter();
  const { state, clearUserData } = useUser();
  const { userData } = state;
  // Add this state at the top of your component
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Subscription handler function
  const handleSubscription = async () => {
    // Navigate to your payment screen or trigger payment gateway
    router.push("/screens/PaymentScreen");

    // After successful payment, you would call:
    // setIsSubscribed(true);
  };

  console.log('userData', userData);

  const handleLogout = async () => {
    // router.push("/screens/PaymentScreen");
    try {
      await AsyncStorage.removeItem('userToken');
      clearUserData();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getInitials = (): string => {
    const first = userData?.first_name?.[0] ?? '';
    const last = userData?.last_name?.[0] ?? '';
    const initials = (first + last).toUpperCase();
    return initials || 'U';
  };

  const startPayment = async () => {
    const paymentRequest = {
      amount: 50,
      currency: "INR",
      productInfo: "Annual Subscription - Student Assessment",
      customerPhone: "9999999999"
    }
    setLoading(true);
    console.log(RazorpayCheckout);


    const response = await apiClient.post(URLS.GET_PAYMENT_DATA, paymentRequest); // Call your login API
    // if (!(response as any)?.error) {

    // }


    const options = {
      description: response?.payment?.paymentParams?.description,
      image: "https://yourlogo.png",
      currency: "INR",
      key: response?.payment?.paymentParams?.key_id,
      amount: response?.payment?.paymentParams?.amount,
      name: "ARIVU AI",
      order_id: response?.payment?.paymentParams?.order_id,
      prefill: {
        email: response?.payment?.paymentParams?.prefill?.email,
        contact: "9999999999",
        name: response?.payment?.paymentParams?.prefill?.name,
      },
      theme: { color: response?.payment?.paymentParams.theme },
    };
    console.log('payment resp', response, options)
    RazorpayCheckout.open(options)
      .then(async (data: any) => {
        setLoading(false);
        const paymentRequest = {
          razorpay_order_id: data?.razorpay_order_id,
          razorpay_payment_id: data?.razorpay_payment_id,
          razorpay_signature: data?.razorpay_signature
        }
        const response = await apiClient.post(URLS.VERIFY_PAYMENT, paymentRequest);
        if (!(response as any)?.error) {
          console.log(data);
          // setIsSubscribed(true);
          showAppAlert('Your Payment Got Success', 'Successfully subscribed to ARIVU AI', [
            {
              text: 'OK',
              style: 'cancel',
              onPress: () => router.back(),
            },
          ]);
        }
      })
      .catch((error: any) => {
        setLoading(false);
        console.log(error);
        showAppAlert('Error', error?.error?.reason, [
          {
            text: 'OK',
            style: 'cancel',
            onPress: () => router.back(),
          },
        ]);
        // alert(`Payment failed: ${error.description}`);
      });
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
          <Text style={styles.loadingText}>Processing Your Payment...</Text>
        </View>
      </SafeAreaView>
    )
  }
  else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* New Header Card with Premium Subscription */}
          <View style={styles.headerCard}>
            {/* User Info Row */}
            <View style={styles.userSection}>
              <View style={[
                styles.avatarContainer,
                isSubscribed && styles.avatarGlow
              ]}>
                <Text style={styles.avatarText}>{getInitials()}</Text>
                {isSubscribed && (
                  <View style={styles.premiumRing} />
                )}
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>
                  {userData?.first_name ?? ''} {userData?.last_name ?? ''}
                </Text>
                {isSubscribed && (
                  <View style={styles.premiumLabel}>
                    <Ionicons name="sparkles" size={12} color="#22d3ee" />
                    <Text style={styles.premiumLabelText}>Premium</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Subscription CTA - Only show if not subscribed */}
            {!isSubscribed && (
              <TouchableOpacity
                style={styles.subscriptionCard}
                onPress={startPayment}
                activeOpacity={0.9}
              >
                <View style={styles.subscriptionLeft}>
                  <View style={styles.sparkleIcon}>
                    <Ionicons name="flash" size={20} color="#0f172a" />
                  </View>
                  <View>
                    <Text style={styles.subscriptionTitle}>Go Premium</Text>
                    <Text style={styles.subscriptionTitle}>₹50/year*</Text>
                  </View>
                </View>
                <View style={styles.upgradeButton}>
                  <Text style={styles.upgradeButtonText}>Upgrade</Text>
                  <Feather name="chevron-right" size={16} color="#0f172a" />
                </View>
              </TouchableOpacity>
            )}
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
              <Text style={styles.logoutButtonText}> {Strings.PROFILE.LOGOUT_BUTTON}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#03295eff',
    fontWeight: '700',
  },
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
  },
  // Header Card - Dark Slate
  headerCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 24,
    padding: 20,
  },

  // User Section
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f8fafc',
  },

  // Avatar
  avatarContainer: {
    backgroundColor: '#334155',
    borderRadius: 50,
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#475569',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },

  // Premium Glow Effect
  avatarGlow: {
    borderColor: '#22d3ee',
    shadowColor: '#22d3ee',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
  premiumRing: {
    position: 'absolute',
    width: 82,
    height: 82,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(34, 211, 238, 0.4)',
  },
  premiumLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  premiumLabelText: {
    color: '#22d3ee',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 4,
  },

  // Subscription Card - Cyan Gradient Look
  subscriptionCard: {
    backgroundColor: '#22d3ee',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subscriptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sparkleIcon: {
    backgroundColor: '#a5f3fc',
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
  },
  subscriptionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },
  subscriptionPrice: {
    fontSize: 12,
    color: '#164e63',
    fontWeight: '500',
    marginTop: 2,
  },
  upgradeButton: {
    backgroundColor: '#a5f3fc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  upgradeButtonText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
    marginRight: 4,
  },



});
