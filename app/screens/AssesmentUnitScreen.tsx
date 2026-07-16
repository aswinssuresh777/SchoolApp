import QuestionCountComponent from '@/components/QuestionCountComponent';
import { URLS } from '@/constants/urls';
import { apiClient } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TOPICS_DATA = [
  {
    topic_id: 'd2de3cc2-437d-452d-b843-33f4bb4bcbb4',
    topic_name: 'Unit 1',
    description: 'Introduction to Programming',
  },
  {
    topic_id: '4aecf185-204c-4a6f-a0bd-91bfb1f5fb5d',
    topic_name: 'Unit 2',
    description: 'Data Structures',
  },
  {
    topic_id: 'd739c9d3-e6dd-4396-99eb-7932e51857fb',
    topic_name: 'Unit 3',
    description: 'Algorithms',
  },
  {
    topic_id: 'a6e9d364-ef9e-4f0d-a1b6-3d583988754a',
    topic_name: 'Unit 4',
    description: 'Object-Oriented Concepts',
  },
  {
    topic_id: '80845b00-f1dd-445f-9e1e-dc01d701945c',
    topic_name: 'Unit 5',
    description: 'Databases',
  },
  {
    topic_id: 'b2186ac6-4ab2-411f-bae1-e15d8b81c503',
    topic_name: 'Unit 6',
    description: 'Operating Systems',
  },
  {
    topic_id: '55ff4ef0-d271-4a65-b255-77ed5e0c710f',
    topic_name: 'Unit 7',
    description: 'Networking',
  },
];

export default function AssesmentUnitScreen() {
  const { subjectId } = useLocalSearchParams();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allUnitsData, setAllUnitsData] = useState([]);
  const [questionCount, setQuestionCount] = useState(5);

  React.useEffect(() => {
    callApi();
  }, []);



  const callApi = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(URLS.GET_UNITS(subjectId as string));
      if(!(response as any).error){
        
        setAllUnitsData(response?.topics);
      }
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.log('Error calling API:', error);
    }
  };

  const handleSelect = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleStartAssessment = (selected: string[]) => {
    console.log('Selected Topics:', selected);
    router.push({
      pathname: "/screens/AssesmentScreen",
      params: { selectedTopics:  JSON.stringify(selected),questionCount:questionCount,subjectId:subjectId },
    
    });
    // TODO: Add your navigation or logic here
  };

  const renderTopicItem = ({ item,index }: any) => {
    const isSelected = selectedTopics.includes(item.topic_id);
    return (
      <TouchableOpacity
        style={[styles.topicCard, isSelected && styles.topicCardSelected]}
        onPress={() => handleSelect(item.topic_id)}
        activeOpacity={0.8}
      >
        <View style={styles.topicRow}>
          {/* Custom checkbox */}
          <View
            style={[
              styles.checkbox,
              isSelected && styles.checkboxSelected,
            ]}
          >
            {isSelected && (
              <Ionicons name="checkmark" size={16} color="#fff" />
            )}
          </View>

          {/* Topic details */}
          <View style={styles.topicTextContainer}>
            <View style={styles.unitBadge}>
              <Text style={styles.unitBadgeText}>Unit {index+1}</Text>
            </View>
            <Text style={styles.unitTitle}>{item.topic_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

if(isLoading){
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
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
        <Text style={styles.headerTitle}>Select Units</Text>
      </View>
      <View style={{flex:1}}>
      <FlatList
        data={allUnitsData}
        keyExtractor={(item) => item.topic_id}
        renderItem={renderTopicItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
<View
  style={[
    styles.questionCountContainer,
    selectedTopics.length > 0 && { paddingBottom: 20 }
  ]}
>
  <QuestionCountComponent
    value={questionCount}
    setValue={setQuestionCount}
  />
</View>
</View>
{selectedTopics.length > 0 && (
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => handleStartAssessment(selectedTopics)}
          activeOpacity={0.9}
        >
          <Text style={styles.startButtonText}>Start Assessment</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
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
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  topicCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  topicCardSelected: {
    borderColor: '#2563eb',
    borderWidth: 1.5,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#9ca3af',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  topicTextContainer: {
    flex: 1,
  },
  unitBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },
  unitBadgeText: {
    color: '#2563eb',
    fontWeight: '600',
    fontSize: 12,
  },
  unitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  startButton: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    margin:16
  },
  startButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  questionCountContainer: {
    padding: 16,
  
  },
});
