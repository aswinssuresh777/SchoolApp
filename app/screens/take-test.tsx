import { URLS } from '@/constants/urls';
import { useUser } from '@/context/UserContext';
import { apiClient } from '@/services/api';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TakeTestScreen = () => {
  const testCategories = [
    {
      id: 1,
      name: 'Quick Quiz',
      icon: 'flash',
      color: '#3B82F6',
      questions: 10,
      duration: '15 min',
      difficulty: 'Easy',
    },
    {
      id: 2,
      name: 'Full Test',
      icon: 'clipboard-check',
      color: '#10B981',
      questions: 50,
      duration: '60 min',
      difficulty: 'Medium',
    },
    {
      id: 3,
      name: 'Challenge',
      icon: 'trophy',
      color: '#F59E0B',
      questions: 25,
      duration: '30 min',
      difficulty: 'Hard',
    },
  ];

  const recentTests = [
    {
      id: 1,
      subject: 'Mathematics',
      score: 85,
      date: '2024-01-15',
      questions: 20,
    },
    {
      id: 2,
      subject: 'Science',
      score: 92,
      date: '2024-01-14',
      questions: 15,
    },
    {
      id: 3,
      subject: 'English',
      score: 78,
      date: '2024-01-13',
      questions: 25,
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  };

  const [isLoading, setIsLoading] = useState(false);
  const [subjectData, setSubjectData] = useState([]);
  const { state, clearUserData } = useUser();
  const { userData } = state;
  useEffect(()=>{
    collectDetails();
  
  },[])
  
  const collectDetails=async()=>{
setIsLoading(true);
  try{
  const response = await  apiClient.get(URLS.GET_SUBJECTS(userData?.class_id)); // Call your login API
  if ((response as any)?.success) {
  console.log('classs',response?.class?.subjects)
  setSubjectData(response?.class?.subjects)
  setIsLoading(false)
  }
  } catch (error) {
  setIsLoading(false)
  }
  }  


  const renderTestItem = ({ item }) => (
    <TouchableOpacity style={styles.testCard} onPress={() => router.push({
      pathname: "/screens/AssesmentUnitScreen",
      params: { subjectId: item.subjectId },
    })}>
      <View style={styles.testLeft}>
        <View style={styles.testIcon}>
          <MaterialCommunityIcons name="clipboard-check" size={20} color="#666" />
        </View>
        <View style={styles.testInfo}>
          <Text style={styles.testSubject}>{item.subject}</Text>
          <Text style={styles.testDate}>{item.date}</Text>
          <Text style={styles.testQuestions}>{item.questions} questions</Text>
        </View>
      </View>
      <View style={styles.testRight}>
        <View style={[styles.scoreBadge, { backgroundColor: getScoreColor(item.score) + '20' }]}>
          <Text style={[styles.scoreText, { color: getScoreColor(item.score) }]}>{item.score}%</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#999" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.replace('/(home)')}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Take Test</Text>
      </View>
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Choose Your Subject</Text>
      {/* Scrollable Content */}
      <ScrollView
         showsVerticalScrollIndicator={false}
         contentContainerStyle={styles.subjectContainer}>
         {subjectData?.map((subject, index) => {
           const iconBg = [
             '#EEF2FF',
             '#DBEAFE',
             '#DCFCE7',
             '#FEF3C7',
             '#FEE2E2',
           ];
     
           const iconColor = [
             '#6366F1',
             '#2563EB',
             '#10B981',
             '#F59E0B',
             '#EF4444',
           ];
     
           const icons = [
             'book-outline',
             'calculator-outline',
             'flask-outline',
             'earth-outline',
             'language-outline',
           ];
     
           return (
             <TouchableOpacity
               activeOpacity={0.9}
               key={subject.subject_id}
               style={styles.subjectCard}
               onPress={() =>
                 router.push({
                   pathname: '/screens/AssesmentUnitScreen',
                   params: {
                     subjectId: subject.class_subject_id,
                   },
                 })
               }>
               <View style={styles.row}>
                 <View
                   style={[
                     styles.iconBox,
                     {
                       backgroundColor: iconBg[index % 5],
                     },
                   ]}>
                   <Ionicons
                     name={icons[index % 5]}
                     size={24}
                     color={iconColor[index % 5]}
                   />
                 </View>
     
                 <View style={styles.content}>
                   <Text style={styles.subjectName}>
                     {subject.subject_name}
                   </Text>
                 </View>
     
                 {/* <Ionicons
                   name="chevron-forward"
                   size={20}
                   color="#94A3B8"
                 /> */}
               </View>
     
               <View style={styles.startButton}>
                 <Text style={styles.startText}>
                   Start Your Test
                 </Text>
     
                 <Ionicons
                   name="arrow-forward"
                   size={15}
                   color="#4F46E5"
                 />
               </View>
             </TouchableOpacity>
           );
         })}
       </ScrollView>
       </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  scrollContainer: { flex: 1 },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  historyButton: { padding: 8 },
  // section: { marginTop: 24 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    // paddingHorizontal: 16,
    marginBottom: 14,
  },
  subjectsContainer: { paddingLeft: 16 },
  // subjectCard: {
  //   backgroundColor: '#FFF',
  //   borderRadius: 16,
  //   padding: 16,
  //   margin: 10,
  //   // marginRight: 12,
  //   // width: 140,
  //   borderLeftWidth: 4,
  //   elevation: 1,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.05,
  //   shadowRadius: 2,
  // },
  // subjectName: { fontSize: 14, fontWeight: '600', color: '#1A1A1A', marginTop: 8 },
  subjectTopics: { fontSize: 12, color: '#666', marginTop: 2 },
  progressBar: {
    height: 4,
    backgroundColor: '#E6E6E6',
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: { height: '100%', borderRadius: 2 },
  progressText: { fontSize: 10, color: '#666', marginTop: 4 },
  categoriesContainer: { paddingLeft: 16 },
  categoryCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginRight: 12,
    width: 160,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryName: { fontSize: 16, fontWeight: '600', color: '#1A1A1A', marginTop: 12 },
  categoryDetails: { fontSize: 12, color: '#666', marginTop: 4 },
  categoryDuration: { fontSize: 12, color: '#666', marginTop: 2 },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  difficultyText: { fontSize: 10, fontWeight: '600' },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButton: { backgroundColor: '#3B82F6' },
  secondaryButton: { backgroundColor: '#F5F7FA', borderWidth: 1, borderColor: '#E6E6E6' },
  actionButtonText: { fontSize: 14, fontWeight: '600', color: '#FFF' },
  testsList: { paddingHorizontal: 16, marginBottom: 20 },
  testCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  testLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  testIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testInfo: { flex: 1 },
  testSubject: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  testDate: { fontSize: 12, color: '#666', marginTop: 2 },
  testQuestions: { fontSize: 12, color: '#666', marginTop: 2 },
  testRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  scoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  scoreText: { fontSize: 12, fontWeight: '600' },
    // subjectsContainer: { paddingLeft: 16 },
  // subjectCard: {
  //   backgroundColor: '#FFF',
  //   borderRadius: 16,
  //   padding: 16,
  //   margin: 10,
  //   // marginRight: 12,
  //   // width: 140,
  //   borderLeftWidth: 4,
  //   elevation: 1,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 1 },
  //   shadowOpacity: 0.05,
  //   shadowRadius: 2,
  // },
  // subjectName: { fontSize: 14, fontWeight: '600', color: '#1A1A1A', marginTop: 8 },
  // subjectTopics: { fontSize: 12, color: '#666', marginTop: 2 },
  // progressBar: {
  //   height: 4,
  //   backgroundColor: '#E6E6E6',
  //   borderRadius: 2,
  //   marginTop: 8,
  // },
  // progressFill: { height: '100%', borderRadius: 2 },
  // progressText: { fontSize: 10, color: '#666', marginTop: 4 },
  materialsList: { paddingHorizontal: 16 },
  materialCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  materialLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  materialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  materialInfo: { flex: 1 },
  materialTitle: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  materialSubject: { fontSize: 12, color: '#666', marginTop: 2 },
  materialRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  materialDuration: { fontSize: 12, color: '#666' },
  section: {
  flex: 1,
  paddingHorizontal: 20,
  marginTop: 18,
},

// sectionTitle: {
//   fontSize: 24,
//   fontWeight: '700',
//   color: '#0F172A',
//   marginBottom: 20,
// },

subjectContainer: {
  paddingBottom: 30,
},

subjectCard: {
  backgroundColor: '#FFF',

  borderRadius: 20,

  padding: 18,

  marginBottom: 16,

  borderWidth: 1,

  borderColor: '#EEF2F7',

  // shadowColor: '#000',

  shadowOpacity: 0.05,

  shadowRadius: 12,

  shadowOffset: {
    width: 0,
    height: 4,
  },

  elevation: 1.5,
},

row: {
  flexDirection: 'row',
  alignItems: 'center',
},

iconBox: {
  width: 54,
  height: 54,
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 15,
},

content: {
  flex: 1,
},

subjectName: {
  fontSize: 18,
  fontWeight: '700',
  color: '#111827',
},

subjectDesc: {
  fontSize: 13,
  color: '#6B7280',
  marginTop: 4,
},

startButton: {
  marginTop: 14,
  alignSelf: 'flex-end',
  flexDirection: 'row',
  alignItems: 'center',
},

startText: {
  color: '#4F46E5',
  fontWeight: '700',
  fontSize: 14,
  marginRight: 6,
},
});

export default TakeTestScreen;
