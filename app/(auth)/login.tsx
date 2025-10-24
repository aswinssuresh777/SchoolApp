import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../../assets/colors';
import { Strings } from '../../assets/strings';

export  const backgroundImage = require('../../assets/images/BackgroundImage.png');

  export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [touched, setTouched] = useState(false);
    const router = useRouter();

    const validateEmail = (text: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(text);
      if (touched) {
        setEmailError(isValid ? '' : Strings.LOGIN.EMAIL_ERROR);
      }
      return isValid;
    };

    const handleLogin = async () => {
      try {
        if (!validateEmail(email)) {
          return;
        }
        // Here you would typically make an API call to verify credentials
        // For demo, we'll just set a dummy token
        await AsyncStorage.setItem('userToken', 'dummy-token');
        router.replace('/(home)');
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    return (
      <ImageBackground 
        source={backgroundImage} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
      <View style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={{flex:1}}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
            <Text style={styles.title}>{Strings.LOGIN.TITLE}</Text>
            <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={Strings.LOGIN.EMAIL_PLACEHOLDER}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
            onBlur={() => setTouched(true)}
            maxLength={50}
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={Strings.LOGIN.PASSWORD_PLACEHOLDER}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            maxLength={20}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color={Colors.ICON_PRIMARY}
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[styles.button, (!email || !password) && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={!email || !password}
        >
          <Text style={styles.buttonText}>{Strings.LOGIN.LOGIN_BUTTON}</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>{Strings.LOGIN.REGISTER_LINK_TEXT}</Text>
          <TouchableOpacity onPress={() => router.push('./register')}>
            <Text style={styles.registerLink}>{Strings.LOGIN.REGISTER_LINK}</Text>
          </TouchableOpacity>
        </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    );
  }

  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: Colors.BACKGROUND_OVERLAY,
    },
    keyboardView: {
      flex: 1,
    },
    scrollView: {
      flexGrow: 1,
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
    },
    registerText: {
      fontSize: 14,
      color: Colors.TEXT_PRIMARY,
    },
    registerLink: {
      fontSize: 14,
      color: Colors.PRIMARY,
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      minHeight: '100%',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 24,
      color: Colors.TEXT_PRIMARY,
      textAlign: 'center',
    },
    inputContainer: {
      width: '100%',
      position: 'relative',
      marginBottom: 16,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: Colors.BORDER,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingRight: 50,
      backgroundColor: Colors.INPUT_BACKGROUND,
      fontSize: 16,
    },
    eyeIcon: {
      position: 'absolute',
      right: 12,
      top: 12,
      padding: 4,
    },
    errorText: {
      color: Colors.ERROR,
      fontSize: 14,
      alignSelf: 'flex-start',
      marginBottom: 16,
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: Colors.BUTTON_PRIMARY,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
    },
    buttonDisabled: {
      backgroundColor: Colors.BUTTON_DISABLED,
    },
    buttonText: {
      color: Colors.TEXT_WHITE,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });