import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../assets/colors';
import { Strings } from '../../assets/strings';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Strings.HOME.WELCOME_TITLE}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND,
  },
  title: {
    fontSize: 20,
    color: Colors.TEXT_PRIMARY,
    textAlign: 'center',
  },
});