import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Mic, Send, Lightbulb, Volume2 } from "lucide-react-native";
import { useAppState } from "../../store/AppContext";
import GlassCard from "../../components/GlassCard";
import GlassButton from "../../components/GlassButton";
import VoiceWave from "../../components/VoiceWave";
import tw from "../../theme/tailwind";

// Quick test phrases matching natural speech
const SAMPLE_PHRASES = [
  "Spent $28 on Sushi dinner last night",
  "Earned $450 from consulting services today",
  "Paid $85 for gas and transportation",
  "Bought $15 worth of movie tickets",
  "Received $80 cash gift from friends",
];

export default function VoiceScreen() {
  const { addTransaction, voiceState, setVoiceState } = useAppState();
  const [textInput, setTextInput] = useState("");
  const [parsingFeedback, setParsingFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(null);

  // Local parser to convert natural sentences into transaction objects
  const parseStatement = (sentence: string) => {
    const cleanSentence = sentence.toLowerCase().trim();
    if (!cleanSentence) return null;

    // 1. Determine Type: Income vs Expense
    const expenseWords = ["spent", "paid", "bought", "cost", "expense", "purchase", "debited"];
    const incomeWords = ["earned", "received", "got", "salary", "freelance", "deposit", "gift", "income"];

    let type: "income" | "expense" = "expense"; // default
    let isIncome = false;

    for (const word of incomeWords) {
      if (cleanSentence.includes(word)) {
        isIncome = true;
        type = "income";
        break;
      }
    }

    // 2. Extract Amount using Regex
    const amountRegex = /(?:\$|usd)?\s*(\d+(?:\.\d{2})?)/i;
    const amountMatch = cleanSentence.match(amountRegex);
    if (!amountMatch) {
      return { error: "Could not find any monetary amount (e.g. $25 or 25)" };
    }
    const amount = parseFloat(amountMatch[1]);
    if (isNaN(amount) || amount <= 0) {
      return { error: "Invalid transaction amount detected." };
    }

    // 3. Extract description / title & map to category
    // Remove amount indicators and trigger words to extract clean label
    let title = sentence;
    // Strip amount like "$25", "25", "$ 25.00"
    title = title.replace(/\$?\s*\d+(?:\.\d{2})?/, "").trim();

    // Strip starting keywords
    const removeKeywords = [
      ...expenseWords,
      ...incomeWords,
      "on",
      "for",
      "from",
      "worth of",
      "dollars",
      "bucks",
    ];

    let titleWords = title.split(" ");
    titleWords = titleWords.filter((w) => !removeKeywords.includes(w.toLowerCase()));
    title = titleWords.join(" ").trim();

    // Clean dates indicators
    const dateIndicators = ["yesterday", "today", "last night", "tonight", "this morning"];
    for (const dt of dateIndicators) {
      title = title.replace(new RegExp(dt, "i"), "").trim();
    }

    // Capitalize title
    title = title.charAt(0).toUpperCase() + title.slice(1);
    if (!title || title.length < 2) {
      title = type === "income" ? "Other Income" : "Other Expense";
    }

    // Map title to standard categories
    let category = type === "income" ? "Salary" : "Food & Drinks";
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("sushi") || lowerTitle.includes("dinner") || lowerTitle.includes("pizza") || lowerTitle.includes("lunch") || lowerTitle.includes("restaurant") || lowerTitle.includes("coffee") || lowerTitle.includes("cafe")) {
      category = "Food & Drinks";
    } else if (lowerTitle.includes("grocer") || lowerTitle.includes("supermarket") || lowerTitle.includes("whole foods")) {
      category = "Groceries";
    } else if (lowerTitle.includes("gas") || lowerTitle.includes("uber") || lowerTitle.includes("taxi") || lowerTitle.includes("bus") || lowerTitle.includes("fuel") || lowerTitle.includes("car")) {
      category = "Transportation";
    } else if (lowerTitle.includes("movie") || lowerTitle.includes("netflix") || lowerTitle.includes("subscription") || lowerTitle.includes("game") || lowerTitle.includes("ticket")) {
      category = "Entertainment";
    } else if (lowerTitle.includes("electric") || lowerTitle.includes("utility") || lowerTitle.includes("water") || lowerTitle.includes("bill") || lowerTitle.includes("internet")) {
      category = "Utilities";
    } else if (lowerTitle.includes("consult") || lowerTitle.includes("freelance") || lowerTitle.includes("design") || lowerTitle.includes("client")) {
      category = "Freelance";
    } else if (lowerTitle.includes("gym") || lowerTitle.includes("fitness") || lowerTitle.includes("pharma") || lowerTitle.includes("doctor") || lowerTitle.includes("health")) {
      category = "Health & Fitness";
    } else if (lowerTitle.includes("shop") || lowerTitle.includes("amazon") || lowerTitle.includes("target") || lowerTitle.includes("clothes") || lowerTitle.includes("goods")) {
      category = "Shopping";
    } else if (type === "income") {
      category = "Freelance";
    } else {
      category = "Shopping";
    }

    return {
      title,
      amount,
      type,
      category,
      date: new Date().toISOString().split("T")[0],
      notes: `Recorded via Smart Voice Assistant: "${sentence}"`,
    };
  };

  // Process simulated speech / text entry
  const processInput = (sentence: string) => {
    setVoiceState("processing");

    setTimeout(() => {
      const parsed = parseStatement(sentence);

      if (!parsed) {
        setParsingFeedback("Oops! Could not understand that statement. Try saying something like 'Spent $15 on lunch'.");
        setFeedbackType("error");
        setVoiceState("idle");
        return;
      }

      if ("error" in parsed) {
        setParsingFeedback(parsed.error);
        setFeedbackType("error");
        setVoiceState("idle");
        return;
      }

      // Add to store
      addTransaction(parsed);

      setParsingFeedback(`Added successfully!\n💸 ${parsed.type === "income" ? "Income" : "Expense"}: $${parsed.amount.toFixed(2)} for "${parsed.title}" (Category: ${parsed.category})`);
      setFeedbackType("success");
      setVoiceState("idle");
      setTextInput("");
    }, 1500); // 1.5s simulated processing delay for voice feel
  };

  const handleSimulatedMicPress = () => {
    if (voiceState === "idle") {
      setVoiceState("listening");
      setParsingFeedback("Listening... Please select a sample phrase below or speak into the device.");
      setFeedbackType(null);
    } else if (voiceState === "listening") {
      // Pick a random sample phrase to simulate speech input
      const randomPhrase = SAMPLE_PHRASES[Math.floor(Math.random() * SAMPLE_PHRASES.length)];
      setParsingFeedback(`Speech recognized: "${randomPhrase}"`);
      processInput(randomPhrase);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-background`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <ScrollView contentContainerStyle={tw`px-5 pt-4 pb-28 flex-grow justify-between`}>
          <View>
            {/* Header Block */}
            <Text style={tw`text-[24px] font-bold text-on-background tracking-tight mb-2`}>
              Smart Voice Input
            </Text>
            <Text style={tw`text-[14px] text-on-surface-variant mb-6 leading-5`}>
              Our contextual NLP assistant parses normal statements directly into transactional records. No manual form-filling needed!
            </Text>

            {/* Simulated Microphone Ring Section */}
            <View style={tw`items-center my-6`}>
              <Pressable
                onPress={handleSimulatedMicPress}
                style={({ pressed }) => [
                  tw`w-32 h-32 rounded-full justify-center items-center shadow-lg border-4 border-white/60`,
                  voiceState === "listening"
                    ? tw`bg-secondary shadow-secondary/30`
                    : voiceState === "processing"
                    ? tw`bg-orange-500 shadow-orange-500/30`
                    : tw`bg-primary shadow-primary/30`,
                  pressed ? { transform: [{ scale: 0.95 }] } : {},
                ]}
              >
                <Mic color="#ffffff" size={48} />
              </Pressable>

              <Text style={tw`text-[15px] font-bold mt-4 capitalize text-on-background`}>
                {voiceState === "idle"
                  ? "Tap to Start Listening"
                  : voiceState === "listening"
                  ? "Listening... (Tap to simulate speech)"
                  : "AI Parsing Statement..."}
              </Text>
            </View>

            {/* Sound Wave Animation Box */}
            <VoiceWave isListening={voiceState === "listening"} />

            {/* NLP Parsing Feedback Glass Card */}
            {parsingFeedback && (
              <GlassCard
                intensity="high"
                style={[
                  tw`my-4 border`,
                  feedbackType === "success"
                    ? tw`border-emerald-300 bg-emerald-50/70`
                    : feedbackType === "error"
                    ? tw`border-red-300 bg-red-50/70`
                    : tw`border-primary-container/20`,
                ]}
              >
                <View style={tw`flex-row items-start`}>
                  <Volume2
                    style={
                      feedbackType === "success"
                        ? tw`text-secondary mr-2.5 mt-0.5`
                        : feedbackType === "error"
                        ? tw`text-tertiary mr-2.5 mt-0.5`
                        : tw`text-primary mr-2.5 mt-0.5`
                    }
                    size={18}
                  />
                  <Text
                    style={[
                      tw`text-[13.5px] font-medium leading-5 flex-1`,
                      feedbackType === "success"
                        ? tw`text-secondary`
                        : feedbackType === "error"
                        ? tw`text-tertiary`
                        : tw`text-on-background`,
                    ]}
                  >
                    {parsingFeedback}
                  </Text>
                </View>
              </GlassCard>
            )}
          </View>

          <View style={tw`mt-4`}>
            {/* Standard Text Box Fallback */}
            <GlassCard style={tw`mb-5 p-3.5`}>
              <Text style={tw`text-[13px] text-on-surface-variant font-bold mb-2`}>
                ⌨️ TEXT FALLBACK INPUT
              </Text>
              <View style={tw`flex-row items-center bg-white/50 border border-white/40 h-12 rounded-xl px-3 shadow-sm`}>
                <TextInput
                  placeholder="e.g. Spent $35 on food..."
                  placeholderTextColor="#717786"
                  value={textInput}
                  onChangeText={setTextInput}
                  onSubmitEditing={() => processInput(textInput)}
                  style={tw`flex-1 h-full text-[14px] text-on-background mr-2`}
                />
                <Pressable
                  onPress={() => processInput(textInput)}
                  disabled={!textInput.trim() || voiceState !== "idle"}
                  style={({ pressed }) => [
                    tw`w-9 h-9 bg-primary rounded-lg justify-center items-center shadow-sm`,
                    !textInput.trim() || voiceState !== "idle" ? tw`opacity-40` : {},
                    pressed ? { transform: [{ scale: 0.9 }] } : {},
                  ]}
                >
                  <Send color="#ffffff" size={16} />
                </Pressable>
              </View>
            </GlassCard>

            {/* Quick Simulation Sample Chips */}
            <View style={tw`mb-4`}>
              <View style={tw`flex-row items-center mb-2.5`}>
                <Lightbulb size={14} style={tw`text-primary mr-1.5`} />
                <Text style={tw`text-[12.5px] font-semibold text-on-surface-variant`}>
                  SIMULATED SPEECH PHRASES (TAP TO TEST)
                </Text>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`flex-row`}>
                {SAMPLE_PHRASES.map((phrase, idx) => (
                  <Pressable
                    key={idx}
                    onPress={() => {
                      if (voiceState === "idle") {
                        setParsingFeedback(`Recognized speech: "${phrase}"`);
                        processInput(phrase);
                      }
                    }}
                    disabled={voiceState !== "idle"}
                    style={({ pressed }) => [
                      tw`bg-white/70 border border-white/50 px-4 py-2.5 rounded-full shadow-sm mr-2.5`,
                      voiceState !== "idle" ? tw`opacity-45` : {},
                      pressed ? tw`bg-primary/5` : {},
                    ]}
                  >
                    <Text style={tw`text-[12px] text-on-surface font-semibold`}>
                      "{phrase}"
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
