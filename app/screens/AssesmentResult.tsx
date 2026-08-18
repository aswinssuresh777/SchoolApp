import { URLS } from "@/constants/urls";
import { apiClient } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ---- Replace this with your API response ----

// --------------------------------------------------

const renderEmptyAnswers = () => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIconContainer}>
      <Ionicons name="document-text-outline" size={48} color="#94A3B8" />
    </View>

    <Text style={styles.emptyTitle}>No Answers Found</Text>

    <Text style={styles.emptyText}>
      Your assessment has no recorded answers.
    </Text>
  </View>
);

const AssesmentResult = () => {
  // const { statistics } = response;
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const { assessmentSessionId,fromOverall } = useLocalSearchParams();

  useEffect(() => {
    if(!fromOverall){
      const backAction = () => {
        router.replace('/(home)');
      };

      const handler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          backAction();
          return true;
        }
      );

      return () => handler.remove();
    }
  }, []);


  const loadAssessment = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        URLS.GET_ASSESMENT_RESULT(assessmentSessionId)
      );
      if (!(response as any).error) {
        setAssessment(response?.assessment);
        setAnswers(response?.answers);
        setLoading(false);
      }

      console.log(response);
    } catch (error) {
      console.log("Error calling API:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAssessment();
  }, []);

  if (answers?.length === 0) {
    renderEmptyAnswers();
  }
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }
  const statusColor =
    assessment?.status === "Completed" ? "#16a34a" : "#f59e0b";

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar barStyle="dark-content" /> */}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
          {
            if(fromOverall)
            {
                router.back()
            }
            else{
            router.replace("/(home)")
            }
        }
        }
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={{ flexDirection:'row',alignItems:"center",justifyContent:"space-between"}}>
          <View>
          <Text style={styles.headerTitle}>Assessment Results</Text>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {assessment.status}
          </Text>
          </View>
              <Image
                          source={require('../../assets/images/completed.jpg')}
                          style={{ width: 80, height: 80,  }}
                        />
        </View>

        <View style={styles.placeholder} />
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{assessment.total_marks}</Text>
          <Text style={styles.summaryLabel}>Total Marks</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{assessment.score}</Text>
          <Text style={styles.summaryLabel}>Your Score</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{assessment.percentage}%</Text>
          <Text style={styles.summaryLabel}>Percentage</Text>
        </View>
      </View>

      {/* Mistakes List */}
      <ScrollView
        style={styles.mistakesList}
        showsVerticalScrollIndicator={false}
      >
        {answers.map((item, index) => {
          return (
            <View key={index} style={styles.mistakeCard}>
              {/* Header row */}
              <View style={styles.mistakeHeader}>
                <Text style={styles.subjectTag}>{item.topic_name}</Text>
                <Text
                  style={[
                    styles.statusBadgeText,
                    {
                      backgroundColor: item.is_correct ? "#DCFCE7" : "#FEE2E2",
                      color: item.is_correct ? "#16A34A" : "#DC2626",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                    },
                  ]}
                >
                  {item.is_correct ? "Correct" : "Wrong"}
                </Text>
              </View>

              {/* Question */}
              <Text style={styles.questionText}>{item.question_text}</Text>

              {/* Answers */}
              <View style={styles.answerContainer}>
                <View style={styles.answerRow}>
                  {/* User Answer */}
                  <View>
                  <Text style={styles.answerLabel}>Your Answer:</Text>
                  <Text
                    style={
                      item.is_correct
                        ? styles.correctAnswer
                        : styles.wrongAnswer
                    }
                  >
                    {item.selected_option_text || "—"}
                  </Text>
</View>
<View style={styles.summaryDivider} />
<View>
                  {/* Correct Answer */}
                  <Text style={[styles.answerLabel, { marginTop: 6 }]}>
                    Correct Answer:
                  </Text>
                  <Text style={styles.correctAnswer}>
                    {item.correct_answer?.option_letter +
                      ")" +
                      item.correct_answer?.option_text}
                  </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssesmentResult;

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, backgroundColor: "#F5F7FA" },

  header: {
    // flexDirection: "row",
    // alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
  },

  backButton: { padding: 4 },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    // textAlign: "center",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },

  placeholder: { width: 40 },

  summaryCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    margin: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  summaryNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  summaryLabel: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },

  summaryDivider: {
    width: 1,
    backgroundColor: "#E6E6E6",
  },

  mistakesList: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },

  mistakeCard: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 1,
  },

  mistakeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  subjectTag: {
    backgroundColor: "#E3F2FD",
    color: "#1976D2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
  },

  dateText: { fontSize: 12, color: "#888" },

  questionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
    lineHeight: 22,
    flexWrap: "wrap",
  },

  answerContainer: { flexDirection: "column", },

  answerRow: { flexDirection: "row" ,justifyContent:'space-between',alignItems:'center' },

  answerLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },

  wrongAnswer: {
    fontSize: 14,
    color: "#DC2626",
    fontWeight: "700",
    width:200
  },

  correctAnswer: {
    fontSize: 14,
    color: "#059669",
    fontWeight: "700",
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
