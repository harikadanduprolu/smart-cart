import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mic, MicOff, Volume2, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';

const mockVoiceResults = [
  "Add bananas to my weekly groceries basket",
  "Create a new birthday party basket",
  "Show me baking ingredients",
  "Add milk and eggs to cart"
];

export default function VoiceSearchScreen() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isListening) {
      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Wave animation
      Animated.loop(
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      pulseAnim.setValue(1);
      waveAnim.setValue(0);
    }
  }, [isListening]);

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    setSuggestions([]);
    
    // Simulate voice recognition
    setTimeout(() => {
      setTranscript('Add bananas and milk to my weekly groceries basket');
      setSuggestions(mockVoiceResults);
      setShowResults(true);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const handleSuggestion = (suggestion: string) => {
    setTranscript(suggestion);
    setShowResults(false);
    // Process the voice command
    router.back();
  };

  const clearTranscript = () => {
    setTranscript('');
    setSuggestions([]);
    setShowResults(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voice Search</Text>
        <TouchableOpacity onPress={clearTranscript}>
          <X size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Voice Visualization */}
        <View style={styles.voiceContainer}>
          <Animated.View 
            style={[
              styles.voiceWave,
              {
                transform: [{ scale: waveAnim }],
                opacity: waveAnim,
              }
            ]}
          />
          <Animated.View 
            style={[
              styles.voiceButton,
              {
                transform: [{ scale: pulseAnim }],
              }
            ]}
          >
            <TouchableOpacity
              style={[styles.micButton, isListening && styles.micButtonActive]}
              onPress={isListening ? stopListening : startListening}
            >
              {isListening ? (
                <MicOff size={32} color="#ffffff" />
              ) : (
                <Mic size={32} color="#ffffff" />
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Status Text */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            {isListening ? 'Listening...' : 'Tap to speak'}
          </Text>
          <Text style={styles.statusSubtext}>
            {isListening 
              ? 'Say something like "Add bananas to my basket"'
              : 'Try saying "Create a new basket" or "Add items to cart"'
            }
          </Text>
        </View>

        {/* Transcript */}
        {transcript && (
          <View style={styles.transcriptContainer}>
            <Text style={styles.transcriptLabel}>You said:</Text>
            <Text style={styles.transcriptText}>{transcript}</Text>
          </View>
        )}

        {/* Voice Commands Help */}
        <View style={styles.helpContainer}>
          <Text style={styles.helpTitle}>Voice Commands</Text>
          <View style={styles.helpItem}>
            <Volume2 size={16} color="#0071ce" />
            <Text style={styles.helpText}>"Add [item] to my [basket name]"</Text>
          </View>
          <View style={styles.helpItem}>
            <Volume2 size={16} color="#0071ce" />
            <Text style={styles.helpText}>"Create a new [type] basket"</Text>
          </View>
          <View style={styles.helpItem}>
            <Volume2 size={16} color="#0071ce" />
            <Text style={styles.helpText}>"Show me [category] items"</Text>
          </View>
          <View style={styles.helpItem}>
            <Volume2 size={16} color="#0071ce" />
            <Text style={styles.helpText}>"Add to cart"</Text>
          </View>
        </View>
      </View>

      {/* Results Modal */}
      <Modal visible={showResults} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.resultsModal}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Did you mean?</Text>
              <TouchableOpacity onPress={() => setShowResults(false)}>
                <X size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleSuggestion(suggestion)}
              >
                <Mic size={16} color="#0071ce" />
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={styles.tryAgainButton}
              onPress={() => {
                setShowResults(false);
                startListening();
              }}
            >
              <Text style={styles.tryAgainButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  voiceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 40,
  },
  voiceWave: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#0071ce',
    opacity: 0.1,
  },
  voiceButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0071ce',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0071ce',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  micButtonActive: {
    backgroundColor: '#ef4444',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  statusText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  statusSubtext: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  transcriptContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transcriptLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  transcriptText: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '500',
    lineHeight: 24,
  },
  helpContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  helpText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  resultsModal: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '60%',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  suggestionText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  tryAgainButton: {
    backgroundColor: '#0071ce',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tryAgainButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});