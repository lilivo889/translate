import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import Button from '../../components/ui/Button';
import { startSession, stopSession, sendUserText, onTranscript } from '../../lib/vapi';

interface TranscriptItem {
  speaker: 'user' | 'agent';
  text: string;
}

/**
 * Speak screen: provides a push‑to‑talk interface for conversing with the
 * VAPI agent.  Transcripts appear in a scrollable feed.  In this stub
 * implementation the VAPI client echoes back your message after a short
 * delay.
 */
export default function SpeakScreen() {
  const [inSession, setInSession] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TranscriptItem[]>([]);

  useEffect(() => {
    // Subscribe to transcript events emitted by the VAPI client
    const unsubscribe = onTranscript(({ speaker, text }: TranscriptItem) => {
      setHistory((prev) => [...prev, { speaker, text }]);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const toggleSession = () => {
    if (inSession) {
      stopSession();
    } else {
      startSession();
    }
    setInSession(!inSession);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    // Immediately append the user's message to the transcript
    setHistory((prev) => [...prev, { speaker: 'user', text: input.trim() }]);
    sendUserText(input.trim());
    setInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speak with your tutor</Text>
      <ScrollView style={styles.feed} contentContainerStyle={styles.feedContent}>
        {history.map((item, idx) => (
          <View key={idx} style={[styles.message, item.speaker === 'user' ? styles.userMessage : styles.agentMessage]}>
            <Text style={styles.messageSpeaker}>{item.speaker === 'user' ? 'You' : 'Tutor'}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message…"
          style={styles.textInput}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
      <Button
        title={inSession ? 'End Session' : 'Start Session'}
        onPress={toggleSession}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  feed: {
    flex: 1,
    marginBottom: 12,
  },
  feedContent: {
    paddingBottom: 12,
  },
  message: {
    marginBottom: 8,
    borderRadius: 8,
    padding: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#e0f7fa',
  },
  agentMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f8e9',
  },
  messageSpeaker: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
});