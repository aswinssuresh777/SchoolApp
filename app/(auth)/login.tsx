import { URLS } from '@/constants/urls';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
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
import { apiClient } from '../../services/api'; // Assuming you have apiClient

export const backgroundImage = require('../../assets/images/BackgroundImage.png');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    if (!email) return Strings.VALIDATION.EMAIL_REQUIRED;
    if (email.length > 255) return Strings.VALIDATION.EMAIL_TOO_LONG;
    if (!email.includes('@')) return Strings.VALIDATION.EMAIL_MUST_CONTAIN_AT;
    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) return Strings.VALIDATION.EMAIL_INVALID_FORMAT;
    if (localPart.length > 64) return Strings.VALIDATION.EMAIL_LOCAL_PART_TOO_LONG;
    if (/^[.-]|[.-]$/.test(localPart)) return Strings.VALIDATION.EMAIL_INVALID_START_END;
    if (!/^[a-zA-Z0-9.-]+$/.test(domain)) return Strings.VALIDATION.EMAIL_INVALID_DOMAIN_CHARS;
    if (!domain.includes('.')) return Strings.VALIDATION.EMAIL_INVALID_DOMAIN_FORMAT;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return Strings.VALIDATION.EMAIL_VALID_FORMAT;
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return Strings.VALIDATION.PASSWORD_REQUIRED;
    if (password.length < 8) return Strings.VALIDATION.PASSWORD_MIN_LENGTH;
    if (password.length > 20) return Strings.VALIDATION.PASSWORD_MAX_LENGTH;
    if (!/[A-Z]/.test(password)) return Strings.VALIDATION.PASSWORD_UPPERCASE;
    if (!/[a-z]/.test(password)) return Strings.VALIDATION.PASSWORD_LOWERCASE;
    if (!/[0-9]/.test(password)) return Strings.VALIDATION.PASSWORD_NUMBER;
    if (!/[!@#$%^&*]/.test(password)) return Strings.VALIDATION.PASSWORD_SPECIAL;
    if (/\s/.test(password)) return Strings.VALIDATION.PASSWORD_NO_SPACES;
    return '';
  };

  const handleLogin = async () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return;

const data={
  email:email,
  password:password
}
setIsLoading(true)
    try {
      const response = await  apiClient.post(URLS.LOGIN,data); // Call your login API
      // Save token to AsyncStorage
      // Check if API call was successful
      if (!(response as any)?.error) {
      console.log('rsess',response)
      await AsyncStorage.setItem('userToken',response?.token);
      await AsyncStorage.setItem('userData',JSON.stringify(response?.student));
      router.replace('/(home)');
      setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Login failed:', error);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
            {isLoading?
       <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="white" />
      </View>:
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <View style={styles.headerContainer}>
                <Text style={styles.title}>{Strings.LOGIN.TITLE}</Text>
                <Text style={styles.subtitle}>Welcome back! Please login to continue</Text>
              </View>

              <View style={styles.formContainer}>
                {/* Email Input */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Email Address</Text>
                  <View style={[styles.inputContainer, emailError && styles.inputError]}>
                    <Ionicons name="mail-outline" size={20} color={Colors.ICON_PRIMARY} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={Strings.LOGIN.EMAIL_PLACEHOLDER}
                      placeholderTextColor={Colors.TEXT_SECONDARY}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        setEmailError(validateEmail(text));
                      }}
                      maxLength={50}
                    />
                  </View>
                  {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>

                {/* Password Input */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View style={[styles.inputContainer, passwordError && styles.inputError]}>
                    <Ionicons name="lock-closed-outline" size={20} color={Colors.ICON_PRIMARY} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder={Strings.LOGIN.PASSWORD_PLACEHOLDER}
                      placeholderTextColor={Colors.TEXT_SECONDARY}
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        setPasswordError(validatePassword(text));
                      }}
                      maxLength={20}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={22}
                        color={Colors.ICON_PRIMARY}
                      />
                    </TouchableOpacity>
                  </View>
                  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>

                {/* Login Button */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>{Strings.LOGIN.LOGIN_BUTTON}</Text>
                  <Ionicons name="arrow-forward" size={20} color={Colors.TEXT_WHITE} style={styles.buttonIcon} />
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>{Strings.LOGIN.REGISTER_LINK_TEXT}</Text>
                  <TouchableOpacity onPress={() => router.push('./register')} activeOpacity={0.7}>
                    <Text style={styles.registerLink}>{Strings.LOGIN.REGISTER_LINK}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    minHeight: '100%',
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 8,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    fontWeight: '400',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.TEXT_PRIMARY || '#1a1a1a',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 56,
    borderColor: Colors.BORDER || '#e0e0e0',
    borderWidth: 1.5,
    borderRadius: 14,
    backgroundColor: Colors.INPUT_BACKGROUND || '#fafafa',
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: Colors.ERROR || '#ef4444',
    borderWidth: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.TEXT_PRIMARY || '#1a1a1a',
    height: '100%',
  },
  eyeIcon: {
    padding: 8,
    marginLeft: 8,
  },
  errorText: {
    color: Colors.ERROR || '#ef4444',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    backgroundColor: Colors.BUTTON_PRIMARY || '#3b82f6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    shadowColor: Colors.BUTTON_PRIMARY || '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: Colors.BUTTON_DISABLED || '#9ca3af',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: Colors.TEXT_WHITE || '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER || '#e0e0e0',
  },
  registerText: {
    fontSize: 15,
    color: Colors.TEXT_SECONDARY || '#6b7280',
    fontWeight: '400',
  },
  registerLink: {
    fontSize: 15,
    color: Colors.PRIMARY || '#3b82f6',
    fontWeight: '700',
    marginLeft: 4,
  },
});
