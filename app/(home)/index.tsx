import { Strings } from '@/assets/strings';
import { showAppAlert } from '@/components/AppAlert';
import { URLS } from '@/constants/urls';
import { useUser } from '@/context/UserContext';
import { apiClient } from '@/services/api';
import { Entypo, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  // const userData = {
  //   name: 'Aswin',
  //   totalTests: 0,
  //   avgScore: 0,
  //   mistakesCount: 0,
  // };

  const [userData, setData] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const { setUserData, setLoading } = useUser();
  const [isLoading, setIsLoading] = useState(true);
useFocusEffect(
  useCallback(() => {
    collectDetails();
    getDashboardData();
  }, [])
);

  const getDashboardData = async () => {
    try {
      const response = await apiClient.get(URLS.GET_DASHBOARD_DATA);
      if (!(response as any)?.error) {
        console.log('rsess', response)
        setDashboardData(response);
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  const collectDetails = async () => {
    const data = await AsyncStorage.getItem('userData');
    const parsedData = data ? JSON.parse(data) : null;
    //  setUserData(parsedData);
    setData(parsedData);
    try {
      const response = await apiClient.get(URLS.GET_PROFILE); // Call your login API
      // Save token to AsyncStorage
      // Check if API call was successful
      if (!(response as any)?.error) {
        console.log('rsess', response)
        // AsyncStorage.setItem('userProfile',JSON.stringify(response?.student))
        setUserData(response?.student);
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  // Animated scale values
  const studyScale = useRef(new Animated.Value(1)).current;
  const testScale = useRef(new Animated.Value(1)).current;
  const mistakesScale = useRef(new Animated.Value(1)).current;

  const onPressIn = (scale: any) => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = (scale: any) => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const hasActiveAssessments = dashboardData?.statistics?.active_assessments > 0;
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>{Strings.COMMON.LOADING}</Text>
        </View>
      </SafeAreaView>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Hello, {userData?.first_name}! <MaterialCommunityIcons name="hand-wave" size={24} color="#fdc233" /></Text>
          <Text style={styles.headerSubtitle}>Keep learning and stay consistent</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <MaterialIcons name="notifications-active" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, styles.blueCard]}>
            <View style={{
              padding: 8,
              backgroundColor: '#3051e2',
              width: 40,
              height: 40,
              borderRadius: 10,
              alignItems: 'center'
            }}>
              {/* <MaterialCommunityIcons name="clipboard-list-outline" size={25} color="#f1f6fc" /> */}
              <FontAwesome5 name="clipboard-list" size={24} color="#fdfaff" />
            </View>
            <Text style={styles.statLabel}>{Strings.HOME.TOTAL_TESTS_LABEL}</Text>
            <Text style={styles.statValue}>{dashboardData?.statistics?.total_assessments || 0}</Text>
          </View>

          <View style={[styles.statCard, styles.greenCard]}>
            <View style={{
              padding: 8,
              backgroundColor: '#36a845',
              width: 40,
              height: 40,
              borderRadius: 10,
              alignItems: 'center'
            }}>
              <MaterialCommunityIcons name="google-analytics" size={24} color="#fdfaff" />
            </View>
            <Text style={styles.statLabel}>{Strings.HOME.AVG_SCORE_LABEL}</Text>
            <Text style={styles.statValue}>{dashboardData?.statistics?.average_percentage || 0}%</Text>
          </View>
        </View>

        {/* Analyze Mistakes Section */}
        <Animated.View style={{ transform: [{ scale: mistakesScale }] }}>
          <TouchableOpacity
            style={styles.mistakesCard}
            activeOpacity={0.9}
            onPressIn={() => onPressIn(mistakesScale)}
            onPressOut={() => onPressOut(mistakesScale)}
            onPress={() => router.push('/screens/AssesmentOverallResults')}
          >
            <View style={styles.mistakesLeft}>
              <Image
                source={require('../../assets/images/overallAssesment.jpg')}
                style={{ width: 60, height: 60, transform: [{ rotate: '-18deg' }], }}
              />
              <View style={styles.mistakesTextContainer}>
                <Text style={styles.mistakesTitle}>{Strings.HOME.OVERALL_ASSESSMENT_TITLE}</Text>
                <Text style={styles.mistakesSubtitle}>
                  {Strings.HOME.OVERALL_ASSESSMENT_SUBTITLE}
                </Text>
              </View>
            </View>
            <View style={styles.mistakesBadge}>
              <FontAwesome6 name="angle-right" size={20} color="#FFFF" />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Animated.View style={{ flex: 1, transform: [{ scale: studyScale }] }}>
            <TouchableOpacity
              style={[styles.actionButton, styles.studyButton]}
              activeOpacity={0.9}
              onPressIn={() => onPressIn(studyScale)}
              onPressOut={() => onPressOut(studyScale)}
              onPress={() => {
                if (hasActiveAssessments) {
                  showAppAlert('You have an Pending Assesment', 'Complete it to take New Assesment ', [
                    {
                      text: 'OK',
                      style: 'cancel',
                    },
                  ]);
                }
                else {
                  router.push('/screens/study')
                }
              }
              }
            >
              <View style={{ width: 50, height: 50, backgroundColor: '#683bd6', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesome6 name="book-open" size={24} color="#fffeff" />
              </View>
              <View>
                <Text style={styles.actionButtonText}>{Strings.HOME.STUDY_BUTTON}</Text>
                <Text style={{ color: '#f0effb' }}>{`Learn and improve \nyour knowledge`}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ flex: 1, transform: [{ scale: testScale }] }}>
            <TouchableOpacity
              style={[styles.actionButton, styles.testButton]}
              activeOpacity={0.9}
              onPressIn={() => onPressIn(testScale)}
              onPressOut={() => onPressOut(testScale)}
              onPress={() => {
                if (hasActiveAssessments) {
                  showAppAlert('You have an Pending Assesment', 'Complete it to take New Assesment ', [
                    {
                      text: 'OK',
                      style: 'cancel',
                    },
                  ]);
                }
                else {
                  router.push('/screens/take-test')
                }
              }}
            >
              <View style={{ width: 50, height: 50, backgroundColor: '#1e64de', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name="clipboard-check-outline" size={24} color="#FFF" />
              </View>
              <View>
                <Text style={styles.actionButtonText}>{Strings.HOME.TAKE_TEST_BUTTON}</Text>
                <Text style={{ color: '#f0effb' }}>{`Test Yourself and\ntrack progress`}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={{ paddingLeft: 16, paddingTop: 16, width: 115 }}>
          <Text style={{
            color: '#1a1b38',
            borderBottomWidth: 1.5,
            borderBottomColor: '#5f43d2',
            fontSize: 16,
            fontWeight: 'bold'
          }}>Your Progress</Text>
        </View>

        {/* New Analytics Cards */}
        <View style={styles.analyticsContainer}>
          <View style={[styles.analyticsCard, styles.bestCard]}>
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#fedda6', alignItems: "center", justifyContent: "center" }}>
              <MaterialIcons name="emoji-events" size={24} color="#F59E0B" />
            </View>
            <Text style={styles.analyticsLabel}>{Strings.HOME.BEST_SCORE_LABEL}</Text>
            <Text style={[styles.analyticsValue, { paddingTop: 15 }]}>{dashboardData?.statistics?.best_percentage || 0}%</Text>
          </View>

          {/* {hasActiveAssessments ? ( */}
          <TouchableOpacity
            style={[styles.analyticsCard, styles.activeCard]}
            activeOpacity={0.9}
            disabled={!hasActiveAssessments}
            onPress={() => router.push({
              pathname: "/screens/AssesmentScreen",
              params: { activeAssesment: true },
            })} // Add your route
          >
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#e7ddff', alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="time-outline" size={24} color="#463488" />
            </View>
            <Text style={styles.analyticsLabel}>{Strings.HOME.ACTIVE_ASSESSMENTS_LABEL}</Text>
            <Text style={styles.analyticsValue}>{dashboardData?.statistics?.active_assessments}</Text>
          </TouchableOpacity>

          <View style={[styles.analyticsCard, styles.completedCard]}>
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#c6f0c9', alignItems: "center", justifyContent: "center" }}>
              <Entypo name="check" size={24} color="#289d3d" />
            </View>
            <Text style={styles.analyticsLabel}>{Strings.HOME.COMPLETED_LABEL}</Text>
            <Text style={[styles.analyticsValue, { paddingTop: 15 }]}>{dashboardData?.statistics?.completed_assessments || 0}</Text>
          </View>
        </View>
        <Image
          source={require('../../assets/images/consistency.jpg')}
          style={{ width: Dimensions.get('window').width * 0.92, height: Dimensions.get('window').height * 0.2, resizeMode: 'cover', marginHorizontal: 16, borderRadius: 25 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5fd' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#f5f5fd',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  headerTitle: { fontSize: 26, fontWeight: '700', color: '#1A1A1A' },
  headerSubtitle: { fontSize: 14, color: '#888', marginTop: 4 },
  logoutButton: { padding: 8 },
  statsContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 20, gap: 12 },
  statCard: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    // alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  blueCard: { backgroundColor: '#E3F2FD' },
  greenCard: { backgroundColor: '#E8F5E9' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 10 },
  statValue: { fontSize: 36, fontWeight: '700', color: '#1A1A1A', marginTop: 6 },
  mistakesCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff3f3',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#F8D7DA',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  mistakesLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  mistakesTextContainer: { marginLeft: 14, flex: 1 },
  mistakesTitle: { fontSize: 17, fontWeight: '600', color: '#1A1A1A' },
  mistakesSubtitle: { fontSize: 13, color: '#666', marginTop: 3 },
  mistakesBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  mistakesBadgeText: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  actionsContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 28, gap: 12, justifyContent: "space-between" },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 20,
    gap: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    backgroundColor: '#8B5CF6', // default, can override for each button
  },
  studyButton: { backgroundColor: '#3a2b90' },
  testButton: { backgroundColor: '#1b56c7' },
  actionButtonText: { color: '#f0effb', fontSize: 17, fontWeight: '600' },

  // New Analytics Styles
  analyticsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 12,
  },
  analyticsCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    // alignItems: 'center',
    // justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  bestCard: {
    backgroundColor: '#f9eddb',
  },
  activeCard: {
    backgroundColor: '#d8c7fa',
  },
  completedCard: {
    backgroundColor: '#e1faea',
  },
  analyticsLabel: {
    fontSize: 13,
    color: '#3f3d46',
    fontWeight: 'bold',
    marginTop: 8,
    textTransform: 'uppercase',
    // textAlign: 'center',
    letterSpacing: 0.5,
  },
  analyticsValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 4,
    alignSelf: 'baseline'
  },
});

export default HomeScreen;
