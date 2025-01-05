import {GiftLottie} from '@App/Assets/Lotties';
import colors from '@App/Constant/colors';
import {gWindowWidth} from '@App/Constant/constants';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface ComingSoonModalProps {
  visible: boolean;
  onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <LottieView source={GiftLottie} autoPlay loop style={styles.lottie} />

          <Text style={styles.title}>🚀 Coming Soon...</Text>
          <Text style={styles.message}>
            We're building something amazing! Stay tuned for updates.
          </Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.halfTransparent,
  },
  modalContainer: {
    width: gWindowWidth / 1.2,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  lottie: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.text,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonClose: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    marginRight: 10,
  },
  buttonNotify: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ComingSoonModal;
