// App.js - Improved Assessment History Screen
import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { apiClient } from "@/services/api";
import { URLS } from "@/constants/urls";

const mockData = {
  assessments: [
    {
      session_id: "cfb0372a-f2ad-459c-9539-7f8e6620661b",
      session_name: "Tamil - அறிவியல், தொழில்நுட்பம் Assessment",
      total_questions: 5,
      total_marks: 5,
      score: 1,
      percentage: "20.00",
      started_at: "2025-11-25T19:06:10.552Z",
      completed_at: "2025-11-25T19:06:15.916Z",
      subject_name: "Tamil",
    },
    {
      session_id: "cfb0372a-f2ad-459c-9539-7f8e6620661c",
      session_name: "English - Grammar Assessment",
      total_questions: 10,
      total_marks: 10,
      score: 8,
      percentage: "80.00",
      started_at: "2025-11-24T14:06:10.552Z",
      completed_at: "2025-11-24T14:15:15.916Z",
      subject_name: "English",
    },
    {
      session_id: "cfb0372a-f2ad-459c-9539-7f8e6620661d",
      session_name: "Mathematics - Algebra Test",
      total_questions: 15,
      total_marks: 15,
      score: 12,
      percentage: "80.00",
      started_at: "2025-11-23T10:00:00.552Z",
      completed_at: "2025-11-23T10:30:15.916Z",
      subject_name: "Mathematics",
    },
    {
      session_id: "cfb0372a-f2ad-459c-9539-7f8e6620661e",
      session_name: "Science - Physics Fundamentals",
      total_questions: 20,
      total_marks: 20,
      score: 15,
      percentage: "75.00",
      started_at: "2025-11-22T09:00:00.552Z",
      completed_at: "2025-11-22T09:45:15.916Z",
      subject_name: "Science",
    },
  ],
  pagination: { page: 1, limit: 10, total: 4, total_pages: 1 },
};

const getScoreColor = (percentage) => {
  const percent = parseFloat(percentage);
  if (percent >= 80)
    return { primary: "#059669", bg: "#ECFDF5", light: "#D1FAE5" };
  if (percent >= 50)
    return { primary: "#D97706", bg: "#FFFBEB", light: "#FEF3C7" };
  return { primary: "#DC2626", bg: "#FEF2F2", light: "#FECACA" };
};

const getSubjectIcon = (subject) => {
  const icons = {
    Tamil: "language",
    English: "book",
    Mathematics: "calculator",
    Science: "flask",
  };
  return icons[subject] || "document-text";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatDuration = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate - startDate;
  const diffMins = Math.round(diffMs / 60000);

  if (diffMins < 1) return "< 1 min";
  if (diffMins === 1) return "1 min";
  return `${diffMins} mins`;
};

const AssessmentItem = ({ item, onPress }) => {
  const colors = getScoreColor(item.percentage);
  const percentage = parseFloat(item.percentage);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      {/* Header Row */}
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: colors.bg }]}>
          <Ionicons
            name={getSubjectIcon(item.subject_name)}
            size={20}
            color={colors.primary}
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.subjectName}>{item.subject_name}</Text>
          <Text style={styles.dateText}>{formatDate(item.completed_at)}</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#CBD5E1" />
      </View>

      {/* Session Name */}
      <Text style={styles.sessionName} numberOfLines={2}>
        {item.session_name}
      </Text>

      {/* Score Section */}
      <View style={styles.scoreSection}>
        <View style={styles.scoreHeader}>
          <Text style={styles.scoreLabel}>Score</Text>
          <View style={styles.scoreValues}>
            <Text style={[styles.scoreMain, { color: colors.primary }]}>
              {item.score}
            </Text>
            <Text style={styles.scoreDivider}>/</Text>
            <Text style={styles.scoreTotal}>{item.total_marks}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBg, { backgroundColor: colors.light }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${percentage}%`,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </View>
          <Text style={[styles.percentageText, { color: colors.primary }]}>
            {Math.round(percentage)}%
          </Text>
        </View>
      </View>

      {/* Footer Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="help-circle-outline" size={14} color="#94A3B8" />
          <Text style={styles.statText}>{item.total_questions} Questions</Text>
        </View>
        <View style={styles.statDot} />
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={14} color="#94A3B8" />
          <Text style={styles.statText}>
            {formatDuration(item.started_at, item.completed_at)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function AssesmentOverallResults() {
  const [assessments, setAssessments] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(
    mockData.pagination.page < mockData.pagination.total_pages
  );

  const loadAssessment = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(URLS.GET_OVERALL_RESULT);
      if (!(response as any).error) {
        setAssessments(response?.assessments);
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

  const handleItemPress = (item:any) => {
    // alert(`Opening: ${item.session_name}\nScore: ${item.score}/${item.total_marks}`);
    router.push({
        pathname: "/screens/AssesmentResult",
        params: { assessmentSessionId: item?.session_id, fromOverall:true },
      });
  };

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading, hasMore]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(page+1);
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#6366F1" />
        <Text style={styles.loadingText}>Loading more...</Text>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="clipboard-outline" size={48} color="#94A3B8" />
      </View>
      <Text style={styles.emptyTitle}>No Assessments Yet</Text>
      <Text style={styles.emptyText}>
        Complete your first assessment to see your history here
      </Text>
    </View>
  );

  const totalScore = assessments?.reduce((sum, a) => sum + a.score, 0);
  const totalMarks = assessments?.reduce((sum, a) => sum + a.total_marks, 0);
  const avgPercentage =
    totalMarks > 0 ? Math.round((totalScore / totalMarks) * 100) : 0;
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Assessment History</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Summary Stats */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{assessments?.length}</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{avgPercentage}%</Text>
            <Text style={styles.summaryLabel}>Avg. Score</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {totalScore}/{totalMarks}
            </Text>
            <Text style={styles.summaryLabel}>Total Marks</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={assessments}
        renderItem={({ item }) => (
          <AssessmentItem item={item} onPress={handleItemPress} />
        )}
        keyExtractor={(item) => item.session_id}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    height: 32,
    backgroundColor: "#E2E8F0",
  },
  listContent: {
    padding: 16,
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  dateText: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 2,
  },
  sessionName: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 16,
  },
  scoreSection: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  scoreLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#64748B",
  },
  scoreValues: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  scoreMain: {
    fontSize: 24,
    fontWeight: "700",
  },
  scoreDivider: {
    fontSize: 18,
    color: "#CBD5E1",
    marginHorizontal: 2,
  },
  scoreTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#94A3B8",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressBg: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 12,
    minWidth: 40,
    textAlign: "right",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 13,
    color: "#94A3B8",
    marginLeft: 6,
  },
  statDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E2E8F0",
    marginHorizontal: 12,
  },
  footer: {
    paddingVertical: 24,
    alignItems: "center",
  },
  loadingText: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 8,
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 20,
  },
});
