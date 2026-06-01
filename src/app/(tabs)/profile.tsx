import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  Alert,
  SafeAreaView,
} from "react-native";
import {
  User,
  Settings,
  CreditCard,
  Bell,
  Trash2,
  RefreshCw,
  Edit2,
  Check,
} from "lucide-react-native";
import { useAppState } from "../../store/AppContext";
import GlassCard from "../../components/GlassCard";
import GlassButton from "../../components/GlassButton";
import tw from "../../theme/tailwind";

export default function ProfileScreen() {
  const { budgetLimit, updateBudgetLimit, resetTransactions, transactions } =
    useAppState();

  const [limitInput, setLimitInput] = useState(budgetLimit.toString());
  const [isEditingLimit, setIsEditingLimit] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);
  const [isLocalSyncEnabled, setIsLocalSyncEnabled] = useState(true);

  const handleSaveLimit = () => {
    const parsed = parseInt(limitInput);
    if (isNaN(parsed) || parsed <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid positive number for the monthly budget.");
      return;
    }
    updateBudgetLimit(parsed);
    setIsEditingLimit(false);
  };

  const handleResetLedger = () => {
    Alert.alert(
      "Reset Transactions?",
      "This action will permanently delete all records inside the expense manager database. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            resetTransactions();
            Alert.alert("Success", "All transactional ledger records have been cleared.");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-background`}>
      <ScrollView contentContainerStyle={tw`px-5 pt-4 pb-28`}>
        {/* Header Block */}
        <Text style={tw`text-[24px] font-bold text-on-background tracking-tight mb-1`}>
          Personal Profile
        </Text>
        <Text style={tw`text-[14px] text-on-surface-variant mb-6`}>
          Configure layout preferences, security controls, and budget targets.
        </Text>

        {/* User Card */}
        <GlassCard intensity="high" style={tw`flex-row items-center p-4 mb-5`}>
          <View style={tw`w-14 h-14 rounded-full bg-primary/10 border border-primary/20 justify-center items-center mr-4`}>
            <User color="#0058bc" size={26} />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-[17px] font-bold text-on-background`}>
              ThooChee Beta User
            </Text>
            <Text style={tw`text-[12.5px] text-on-surface-variant mt-0.5`}>
              tester@thoochee.app
            </Text>
          </View>
          <View style={tw`bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full`}>
            <Text style={tw`text-primary text-[10.5px] font-bold uppercase`}>
              Beta v1.0
            </Text>
          </View>
        </GlassCard>

        {/* Edit Budget Limit Glass Card */}
        <GlassCard style={tw`mb-5 p-4`}>
          <View style={tw`flex-row items-center mb-3`}>
            <CreditCard size={18} style={tw`text-primary mr-2`} />
            <Text style={tw`text-[15px] font-bold text-on-background`}>
              Monthly Budget target
            </Text>
          </View>

          {isEditingLimit ? (
            <View style={tw`flex-row items-center mt-1`}>
              <View style={tw`flex-row items-center bg-white/50 border border-white/40 h-11 rounded-lg px-3 flex-1 mr-3 shadow-sm`}>
                <Text style={tw`text-on-surface-variant mr-1 font-semibold`}>$</Text>
                <TextInput
                  keyboardType="numeric"
                  value={limitInput}
                  onChangeText={setLimitInput}
                  style={tw`flex-1 h-full text-[14px] text-on-background font-semibold`}
                />
              </View>
              <Pressable
                onPress={handleSaveLimit}
                style={tw`w-10 h-10 bg-secondary rounded-lg justify-center items-center shadow-sm`}
              >
                <Check color="#ffffff" size={16} />
              </Pressable>
            </View>
          ) : (
            <View style={tw`flex-row justify-between items-center mt-1`}>
              <Text style={tw`text-[20px] font-bold text-on-background tracking-tight`}>
                ${budgetLimit.toLocaleString("en-US")}
              </Text>
              <Pressable
                onPress={() => setIsEditingLimit(true)}
                style={tw`flex-row items-center bg-white/60 border border-white/50 px-3 py-1.5 rounded-lg shadow-sm`}
              >
                <Edit2 size={12} style={tw`text-primary mr-1.5`} />
                <Text style={tw`text-[12px] text-primary font-bold`}>Edit</Text>
              </Pressable>
            </View>
          )}
        </GlassCard>

        {/* Global Layout preferences */}
        <GlassCard style={tw`mb-5 px-4 py-2`}>
          <View style={tw`flex-row items-center py-2.5 border-b border-black/5`}>
            <Settings size={16} style={tw`text-primary mr-3`} />
            <Text style={tw`text-[14px] font-semibold text-on-background flex-1`}>
              Offline Local Cache Sync
            </Text>
            <Switch
              value={isLocalSyncEnabled}
              onValueChange={setIsLocalSyncEnabled}
              trackColor={{ false: "#dad9df", true: "#6ffb85" }}
              thumbColor={isLocalSyncEnabled ? "#006e28" : "#f4f3f8"}
            />
          </View>

          <View style={tw`flex-row items-center py-2.5 border-b border-black/5`}>
            <Bell size={16} style={tw`text-primary mr-3`} />
            <Text style={tw`text-[14px] font-semibold text-on-background flex-1`}>
              Monthly Limit Alerts
            </Text>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={setIsNotificationsEnabled}
              trackColor={{ false: "#dad9df", true: "#6ffb85" }}
              thumbColor={isNotificationsEnabled ? "#006e28" : "#f4f3f8"}
            />
          </View>

          <View style={tw`flex-row items-center py-2.5`}>
            <Settings size={16} style={tw`text-primary mr-3`} />
            <Text style={tw`text-[14px] font-semibold text-on-background flex-1`}>
              Biometric Pin Authentication
            </Text>
            <Switch
              value={isBiometricsEnabled}
              onValueChange={setIsBiometricsEnabled}
              trackColor={{ false: "#dad9df", true: "#6ffb85" }}
              thumbColor={isBiometricsEnabled ? "#006e28" : "#f4f3f8"}
            />
          </View>
        </GlassCard>

        {/* Data Management Section */}
        <Text style={tw`text-[12.5px] font-bold text-on-surface-variant mb-2.5 uppercase tracking-wide px-1`}>
          Database Administration
        </Text>
        <GlassCard style={tw`p-4 mb-6`}>
          <Text style={tw`text-[12px] text-on-surface-variant leading-4.5 mb-4`}>
            Reset transactions to delete all transactional historical metrics or click reset ledger database to clear.
          </Text>

          <View style={tw`gap-3`}>
            <GlassButton
              title="Reset Ledger Database"
              variant="danger"
              onPress={handleResetLedger}
              style={tw`h-12`}
            />
          </View>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}
