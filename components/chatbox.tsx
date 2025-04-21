import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Colors } from "../../constants/Colors";

const renderMessage = ({ item }) => (
  <View
    style={[
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.botMessage,
    ]}
  >
    <Text
      style={[
        styles.messageText,
        item.isUser ? styles.userMessageText : styles.botMessageText,
      ]}
    >
      {item.text}
    </Text>
  </View>
);

export default function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Auto response for common questions
  const autoResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    let response = "";

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      response = "Hello! How can I help you plan your trip today?";
    } else if (lowerMessage.includes("destination")) {
      response =
        "I can help you find the perfect destination. What kind of trip are you looking for? (Beach, Mountain, City, etc.)";
    } else {
      // If no auto-response, send to n8n
      return null;
    }

    return response;
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Check for auto-response first
      const autoResp = autoResponse(inputText);

      if (autoResp) {
        setTimeout(() => {
          const botMessage = {
            id: Date.now() + 1,
            text: autoResp,
            isUser: false,
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsTyping(false);
        }, 1000);
      } else {
        // Call n8n webhook
        const response = await fetch(
          "http://localhost:5678/webhook-test/chatbox-request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: inputText }),
          }
        );

        const data = await response.json();
        const botMessage = {
          id: Date.now() + 1,
          text: data.output,
          isUser: false,
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting. Please try again.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsTyping(false);
    setInputText("");
  };

  // Add typing indicator to render function
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messagesList}
      />
      {isTyping && (
        <View style={styles.typingIndicator}>
          <Text style={styles.typingText}>AI is typing...</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: "#fff",
  },
  botMessageText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
  },
  typingIndicator: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    margin: 10,
  },
  typingText: {
    color: "#666",
    fontStyle: "italic",
  },
});
