/**
 * This file contains a minimal stub for interacting with the VAPI service.
 * The real VAPI SDK provides methods to start and stop voice sessions and
 * receive transcripts of the conversation.  In this demo environment we
 * simulate that behaviour locally using a simple event emitter and
 * setTimeout.  Replace the functions here with the official SDK once
 * available.
 */

export type TranscriptPayload = { speaker: 'user' | 'agent'; text: string };

type Listener<T> = (payload: T) => void;

const listeners: Record<string, Listener<any>[]> = {};

function emit<T>(event: string, payload: T) {
  (listeners[event] || []).forEach((listener) => listener(payload));
}

function on<T>(event: string, listener: Listener<T>) {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(listener);
  // Return an unsubscribe function
  return () => {
    listeners[event] = listeners[event].filter((l) => l !== listener);
  };
}

/**
 * Start a voice session.  In the stub implementation this simply emits
 * a system message.  In the real implementation this would connect to
 * the VAPI service, authenticate using the API key and assistant ID, and
 * begin streaming audio.
 */
export function startSession(): void {
  emit<TranscriptPayload>('transcript', { speaker: 'agent', text: 'Session started. Begin speaking whenever you are ready.' });
}

/**
 * Stop the active voice session.  This implementation emits a closing
 * message.  The real implementation should clean up any sockets or
 * connections.
 */
export function stopSession(): void {
  emit<TranscriptPayload>('transcript', { speaker: 'agent', text: 'Session ended. ¡Hasta luego!' });
}

/**
 * Send a chunk of user speech to the agent.  Because this stub does not
 * handle audio streaming, it accepts plain text.  After a short delay
 * the stub echoes back a response to demonstrate the UI flow.
 */
export function sendUserText(text: string): void {
  // Simulate network latency and agent processing time
  setTimeout(() => {
    const reply = `You said: "${text}". ¡Buen trabajo!`;
    emit<TranscriptPayload>('transcript', { speaker: 'agent', text: reply });
  }, 1000);
}

/**
 * Subscribe to transcript events.  The returned function can be called
 * to unsubscribe.  In the future you may extend this to other events
 * such as partial transcripts or errors.
 */
export function onTranscript(listener: Listener<TranscriptPayload>): () => void {
  return on<TranscriptPayload>('transcript', listener);
}