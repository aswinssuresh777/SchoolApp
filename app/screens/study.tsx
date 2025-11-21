import { URLS } from '@/constants/urls';
import { useUser } from '@/context/UserContext';
import { apiClient } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StudyScreen = () => {
  // Simulated API response
  const apiResponse = {
    success: true,
    message: 'Class details retrieved successfully',
    class: {
      class_id: 'b8b92e6b-6ec3-4db5-b0d5-4f0d7f19fa74',
      class_name: 'Class 1',
      class_level: 1,
      board_name: 'Central Board of Secondary Education',
      subjects: [
        {
          subject_id: 'b795d2d4-b033-4c30-98ab-61f55e95b300',
          subject_name: 'English',
          subject_code: 'ENG',
          is_compulsory: true,
        },
        {
          subject_id: '08e203ac-2d88-4c99-a2b8-7ae7042ee83a',
          subject_name: 'Mathematics',
          subject_code: 'MATH',
          is_compulsory: true,
        },
        {
          subject_id: '36206c13-9454-4dfb-9226-21a7290a7a12',
          subject_name: 'Science',
          subject_code: 'SCI',
          is_compulsory: true,
        },
      ],
    },
  };

  // Filter only compulsory subjects
  const subjects = apiResponse.class.subjects
    .filter((sub) => sub.is_compulsory)
    .map((sub, index) => ({
      id: sub.subject_id,
      name: sub.subject_name,
      code: sub.subject_code,
      icon:
        sub.subject_name === 'Mathematics'
          ? 'calculator'
          : sub.subject_name === 'Science'
          ? 'flask'
          : 'book-open',
      color:
        sub.subject_name === 'Mathematics'
          ? '#3B82F6'
          : sub.subject_name === 'Science'
          ? '#10B981'
          : '#8B5CF6',
      topics: Math.floor(Math.random() * 15) + 5, // dummy topic count
      progress: Math.floor(Math.random() * 80) + 20, // dummy progress
    }));

  const studyMaterials = [
    {
      id: 1,
      title: 'Algebra Basics',
      type: 'Video',
      duration: '15 min',
      subject: 'Mathematics',
    },
    {
      id: 2,
      title: 'Chemical Reactions',
      type: 'Article',
      duration: '8 min',
      subject: 'Science',
    },
    {
      id: 3,
      title: 'Grammar Rules',
      type: 'Quiz',
      duration: '10 min',
      subject: 'English',
    },
  ];
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
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/(home)')}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Study</Text>
      </View>
     {isLoading?
       <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="blue" />
      </View>:
<View>
      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{subjectData?.length}</Text>
          <Text style={styles.statLabel}>Subjects</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>45</Text>
          <Text style={styles.statLabel}>Topics</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>66%</Text>
          <Text style={styles.statLabel}>Progress</Text>
        </View>
      </View>

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
                  pathname: "/screens/unitTopicsScreen",
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

      {/* Study Materials */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Materials</Text>
        <ScrollView style={styles.materialsList} showsVerticalScrollIndicator={false}>
          {studyMaterials.map((material) => (
            <TouchableOpacity key={material.id} style={styles.materialCard}>
              <View style={styles.materialLeft}>
                <View style={styles.materialIcon}>
                  <Ionicons
                    name={
                      material.type === 'Video'
                        ? 'play-circle'
                        : material.type === 'Article'
                        ? 'document-text'
                        : 'help-circle'
                    }
                    size={20}
                    color="#666"
                  />
                </View>
                <View style={styles.materialInfo}>
                  <Text style={styles.materialTitle}>{material.title}</Text>
                  <Text style={styles.materialSubject}>{material.subject}</Text>
                </View>
              </View>
              <View style={styles.materialRight}>
                <Text style={styles.materialDuration}>{material.duration}</Text>
                <Ionicons name="chevron-forward" size={16} color="#999" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      </View>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statNumber: { fontSize: 24, fontWeight: '700', color: '#1A1A1A' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
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
});

export default StudyScreen;
