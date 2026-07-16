import { URLS } from '@/constants/urls';
import { apiClient } from '@/services/api';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  LayoutAnimation,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UNITS_DATA = [
  {
    id: '1',
    unitNumber: 1,
    name: 'Introduction to Programming and Software Development Fundamentals',
    topics: [
      { id: 't1', name: 'Variables and Data Types', totalQuestions: 15 },
      { id: 't2', name: 'Control Structures', totalQuestions: 20 },
      { id: 't3', name: 'Functions and Methods', totalQuestions: 18 },
    ],
  },
  {
    id: '2',
    unitNumber: 2,
    name: 'Object-Oriented Concepts and Principles of Encapsulation',
    topics: [
      { id: 't4', name: 'Classes and Objects', totalQuestions: 25 },
      { id: 't5', name: 'Inheritance', totalQuestions: 18 },
      { id: 't6', name: 'Polymorphism', totalQuestions: 22 },
    ],
  },
  {
    id: '3',
    unitNumber: 3,
    name: 'Data Structures and Algorithms for Problem Solving',
    topics: [
      { id: 't7', name: 'Arrays and Lists', totalQuestions: 12 },
      { id: 't8', name: 'Stacks and Queues', totalQuestions: 15 },
      { id: 't9', name: 'Trees and Graphs', totalQuestions: 20 },
    ],
  },
];




export default function UnitTopicsScreen() {
  const { subjectId } = useLocalSearchParams();
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allUnitsData, setAllUnitsData] = useState([]);

  React.useEffect(() => {
    callApi();
  }, []);



  const callApi = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(URLS.GET_UNITS(subjectId));
      if(!(response as any).error){
        
        setAllUnitsData(response?.topics);
      }
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.log('Error calling API:', error);
    }
  };


  const handleUnitPress = (topicId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // setSelectedUnitId((prev) => (prev === unitId ? null : unitId));
       router.push({
                  pathname: "/screens/StudyQuestions",
                  params: { subjectId: subjectId, topicId: topicId },
                });
  };

  const handleTopicPress = (topic) => {
    console.log('Topic pressed:', topic.name);
  };

  const renderTopic = (topic) => (
    console.log('topic',topic),
    <TouchableOpacity
      key={topic.id}
      style={styles.topicCard}
      onPress={() => handleTopicPress(topic)}
      activeOpacity={0.7}
    >
      <View style={styles.topicContent}>
        <Ionicons name="book-outline" size={18} color="#2563eb" />
        <View style={styles.topicTextContainer}>
          <Text style={styles.topicName}>{topic.topic_name}</Text>
          <View style={styles.topicMeta}>
            <Ionicons name="help-circle-outline" size={14} color="#6b7280" />
            <Text style={styles.topicMetaText}>
              {topic.totalQuestions} questions
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderUnit = ({ item,index }) => {
    const isExpanded = selectedUnitId === item.id;
    return (
      <View style={styles.unitContainer}>
        <TouchableOpacity
          style={styles.unitHeader}
          onPress={() => handleUnitPress(item.topic_id)}
          activeOpacity={0.8}
        >
          <View style={styles.unitInfo}>
            <View style={styles.unitBadge}>
              <Text style={styles.unitBadgeText}>Unit {index+1}</Text>
            </View>
            <Text style={styles.unitTitle}>{item.topic_name}</Text>
          </View>
          <Feather
            name={'arrow-right-circle'}
            size={28}
            color="#4b5563"
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.topicsWrapper}>
            {item.topics.map(renderTopic)}
          </View>
        )}
      </View>
    );
  };

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
  <Text style={styles.headerTitle}>Units</Text>
</View>

      <FlatList
        data={allUnitsData}
        renderItem={renderUnit}
        keyExtractor={(item) => item.topic_id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  },
  unitContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    overflow: 'hidden',
  },
  unitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexWrap: 'wrap',
  },
  unitInfo: {
    flex: 1,
    marginRight: 10,
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
    flexShrink: 1, // allow wrapping
    flexWrap: 'wrap',
  },
  topicsWrapper: {
    backgroundColor: '#f9fafb',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  topicCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  topicContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  topicTextContainer: {
    flex: 1,
    marginLeft: 8,
    flexWrap: 'wrap',
  },
  topicName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  topicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  topicMetaText: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 4,
  },
});
