import { URLS } from '@/constants/urls';
import { useUser } from '@/context/UserContext';
import { apiClient } from '@/services/api';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
        <TouchableOpacity style={styles.historyButton}>
          <Ionicons name="time" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
             {/* Subjects */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subjects</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.subjectsContainer}
          contentContainerStyle={{ paddingRight: 16 }} // ✅ fix for last item visibility
        >
          {subjectData?.map((subject) => (
            <TouchableOpacity
              key={subject.subject_id}
              style={[styles.subjectCard, { borderLeftColor: 'lightblue' }]}
              onPress={()=>{
                router.push({
                  pathname: "/screens/AssesmentUnitScreen",
                  params: { subjectId: subject.class_subject_id },
                });
                
              }}
            >
              {/* <MaterialCommunityIcons
                name={subject.icon}
                size={24}
                color={subject.color}
              /> */}
              <Text style={styles.subjectName}>{subject.subject_name}</Text>
              {/* <Text style={styles.subjectTopics}>{subject.topics} topics</Text> */}
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${subject.progress}%`, backgroundColor: subject.color },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{subject.progress??0}% complete</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

        
        
        
        {/* Test Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {testCategories.map((category) => (
              <TouchableOpacity key={category.id} onPress={() => router.push('/screens/AssesmentUnitScreen')} style={[styles.categoryCard, { borderLeftColor: category.color }]} >
                <MaterialCommunityIcons name={category.icon} size={28} color={category.color} />
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDetails}>{category.questions} questions</Text>
                <Text style={styles.categoryDuration}>{category.duration}</Text>
                <View style={[styles.difficultyBadge, { backgroundColor: category.color + '20' }]}>
                  <Text style={[styles.difficultyText, { color: category.color }]}>{category.difficulty}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
              <MaterialCommunityIcons name="play-circle" size={24} color="#FFF" />
              <Text style={styles.actionButtonText}>Start Random Test</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
              <MaterialCommunityIcons name="bookmark" size={24} color="#3B82F6" />
              <Text style={[styles.actionButtonText, { color: '#3B82F6' }]}>Saved Tests</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Tests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Tests</Text>
          <FlatList
            data={recentTests}
            renderItem={renderTestItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            style={styles.testsList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  scrollContainer: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  section: { marginTop: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  subjectsContainer: { paddingLeft: 16 },
  subjectCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 140,
    borderLeftWidth: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  subjectName: { fontSize: 14, fontWeight: '600', color: '#1A1A1A', marginTop: 8 },
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
});

export default TakeTestScreen;
