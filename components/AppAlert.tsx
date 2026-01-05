import React, { ReactNode, useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type AlertButton = {
  text?: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
};

// Internal setter that the provider exposes to the module.
let showAlertInternal: ((title: string, message?: string, buttons?: AlertButton[]) => void) | null = null;

export function showAppAlert(title: string, message?: string, buttons?: AlertButton[]) {
  if (showAlertInternal) {
    showAlertInternal(title, message, buttons);
  } else {
    // Provider not mounted yet — fallback to console so we still have some visibility.
    console.warn('AppAlertProvider not mounted. Alert:', title, message);
  }
}

export const AppAlertProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string | undefined>(undefined);
  // Default to two buttons: Cancel (left) and OK (right).
  const [buttons, setButtons] = useState<AlertButton[]>([
    { text: 'Cancel', onPress: () => setVisible(false), style: 'cancel' },
    { text: 'OK', onPress: () => setVisible(false), style: 'default' },
  ]);

  useEffect(() => {
    showAlertInternal = (t: string, m?: string, bs?: AlertButton[]) => {
      // Prevent showing another modal while one is visible
      if (visible) return;
      setTitle(t || '');
      setMessage(m);

      // If caller provided buttons, use them; otherwise use default Cancel + OK
      setButtons(bs && bs.length
        ? bs
        : [
            { text: 'Cancel', onPress: () => setVisible(false), style: 'cancel' },
            { text: 'OK', onPress: () => setVisible(false), style: 'default' },
          ]);

      setVisible(true);
    };

    return () => {
      showAlertInternal = null;
    };
  }, [visible]);

  function handlePress(btn: AlertButton) {
    try {
      btn.onPress && btn.onPress();
    } catch (e) {
      console.error('Error in alert button onPress:', e);
    } finally {
      setVisible(false);
    }
  }

  return (
    <>
      {children}

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <View style={styles.backdrop}>
          <View style={styles.card}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {message ? <Text style={styles.message}>{message}</Text> : null}

            {
              // If only one button, make it full width; if two (or more), make them split the row
            }
            {(() => {
              const isSingle = buttons.length === 1;
              return (
                <View style={[styles.buttonRow, isSingle ? styles.singleButtonRow : styles.buttonRowTwo]}>
                  {buttons.map((b, i) => {
                    const isPrimary = i === buttons.length - 1; // rightmost button is primary (OK)
                    return (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.button,
                          isPrimary ? styles.primaryButton : styles.secondaryButton,
                          isSingle ? styles.fullButton : styles.halfButton,
                        ]}
                        onPress={() => handlePress(b)}
                      >
                        <Text style={[isPrimary ? styles.buttonText : styles.buttonTextSecondary]}>{b.text ?? 'OK'}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })()}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginBottom: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    // margin handled in layout styles
  },
  primaryButton: {
    backgroundColor: '#1976D2',
  },
  secondaryButton: {
    backgroundColor: '#E0E0E0',
  },
  fullButton: {
    width: '100%',
  },
  halfButton: {
    width: '48%',
  },
  singleButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonRowTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    alignSelf: 'center',
  },
  buttonTextSecondary: {
    color: '#000',
    fontWeight: '600',
    alignSelf: 'center',
  },
});
