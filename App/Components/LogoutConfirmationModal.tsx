import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import colors from '@App/Constant/colors';
import {LogoutLottie} from '@App/Assets/Lotties';
import LottieView from 'lottie-react-native';

interface LogoutConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Are you leaving?</Text>
          </View>
          <LottieView
            source={LogoutLottie}
            autoPlay
            loop
            style={styles.lottie}
          />
          <View style={styles.content}>
            <Text style={styles.message}>
              Make sure to save your progress before logging out!
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}>
              <Text style={styles.cancelText}>Stay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}>
              <Text style={styles.confirmText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: width * 0.85,
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.dark,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: colors.light,
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
  cancelText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
  confirmText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '600',
  },
  lottie: {
    width: 150,
    height: 150,

    alignSelf: 'center',
  },
});

export default LogoutConfirmationModal;
