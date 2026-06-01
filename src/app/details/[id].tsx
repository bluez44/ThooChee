import React from "react";
import { View, Text, Pressable, SafeAreaView, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  Tag,
  FileText,
  Trash2,
  Paperclip,
  CheckCircle,
} from "lucide-react-native";
import { useAppState } from "../../store/AppContext";
import { getCategoryConfig } from "../(tabs)/index";
import GlassCard from "../../components/GlassCard";
import GlassButton from "../../components/GlassButton";
import tw from "../../theme/tailwind";

export default function TransactionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { transactions, deleteTransaction } = useAppState();
  const router = useRouter();

  // Find transaction from context
  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return (
      <SafeAreaView style={tw`flex-1 bg-background justify-center items-center px-6`}>
        <GlassCard style={tw`w-full p-6 items-center`}>
          <Text style={tw`text-[16px] font-bold text-tertiary mb-2`}>
            Record Not Found
          </Text>
          <Text style={tw`text-[13px] text-on-surface-variant text-center mb-5`}>
            The transaction record you are attempting to view does not exist or has been deleted.
          </Text>
          <GlassButton title="Go Back" onPress={() => router.back()} style={tw`w-full h-11`} />
        </GlassCard>
      </SafeAreaView>
    );
  }

  const config = getCategoryConfig(transaction.category);
  const IconComp = config.icon;

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete "${transaction.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTransaction(transaction.id);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-background`}>
      <View style={tw`px-5 pt-4 flex-1`}>
        {/* Navigation Header */}
        <View style={tw`flex-row items-center justify-between mb-6`}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              tw`w-10 h-10 bg-white/70 border border-white/50 rounded-full justify-center items-center shadow-sm`,
              pressed ? { transform: [{ scale: 0.9 }] } : {},
            ]}
          >
            <ArrowLeft color="#1a1b1f" size={20} />
          </Pressable>
          <Text style={tw`text-[16px] font-bold text-on-background`}>
            Ledger Entry Details
          </Text>
          <Pressable
            onPress={handleDelete}
            style={({ pressed }) => [
              tw`w-10 h-10 bg-red-50 border border-red-100 rounded-full justify-center items-center shadow-sm`,
              pressed ? { transform: [{ scale: 0.9 }] } : {},
            ]}
          >
            <Trash2 color="#ff3b30" size={18} />
          </Pressable>
        </View>

        {/* Dynamic Big Value Box */}
        <GlassCard intensity="high" style={tw`items-center py-8 mb-5`}>
          <View style={[tw`w-12 h-12 rounded-full justify-center items-center mb-3`, tw`${config.bg}`]}>
            <IconComp style={tw`${config.text}`} size={24} />
          </View>

          <Text style={tw`text-[14px] text-on-surface-variant font-bold uppercase tracking-wider mb-1`}>
            {transaction.title}
          </Text>

          <Text
            style={[
              tw`text-[38px] font-bold tracking-tighter`,
              transaction.type === "income" ? tw`text-secondary` : tw`text-on-background`,
            ]}
          >
            {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
          </Text>

          <View style={tw`bg-white/60 border border-white/50 px-3.5 py-1.5 rounded-full mt-3 shadow-sm flex-row items-center`}>
            <CheckCircle color="#34c759" size={13} style={tw`mr-1.5`} />
            <Text style={tw`text-[11px] text-secondary font-bold uppercase`}>
              Verified Entry
            </Text>
          </View>
        </GlassCard>

        {/* Transaction Metadata Breakdown */}
        <GlassCard style={tw`mb-5 p-4.5 gap-4`}>
          <View style={tw`flex-row items-center`}>
            <Tag size={16} style={tw`text-primary mr-3.5`} />
            <View>
              <Text style={tw`text-[11px] text-on-surface-variant font-bold uppercase`}>
                Financial Category
              </Text>
              <Text style={tw`text-[14px] text-on-background font-semibold mt-0.5`}>
                {transaction.category}
              </Text>
            </View>
          </View>

          <View style={tw`h-[1px] bg-black/5`} />

          <View style={tw`flex-row items-center`}>
            <Calendar size={16} style={tw`text-primary mr-3.5`} />
            <View>
              <Text style={tw`text-[11px] text-on-surface-variant font-bold uppercase`}>
                Transaction Date
              </Text>
              <Text style={tw`text-[14px] text-on-background font-semibold mt-0.5`}>
                {transaction.date}
              </Text>
            </View>
          </View>

          <View style={tw`h-[1px] bg-black/5`} />

          <View style={tw`flex-row items-start`}>
            <FileText size={16} style={tw`text-primary mr-3.5 mt-0.5`} />
            <View style={tw`flex-1`}>
              <Text style={tw`text-[11px] text-on-surface-variant font-bold uppercase`}>
                Audit Trail Notes
              </Text>
              <Text style={tw`text-[13px] text-on-background leading-4.5 mt-1 font-medium italic`}>
                {transaction.notes || "No notes attached to this ledger entry."}
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Document Scanned Attachment */}
        <GlassCard style={tw`mb-6 p-4`}>
          <View style={tw`flex-row items-center justify-between mb-2`}>
            <View style={tw`flex-row items-center`}>
              <Paperclip size={16} style={tw`text-primary mr-2`} />
              <Text style={tw`text-[14px] font-bold text-on-background`}>
                Scanned Receipt Attachment
              </Text>
            </View>
          </View>
          <View style={tw`border border-dashed border-black/10 rounded-xl py-6 items-center justify-center bg-white/30`}>
            <Text style={tw`text-[12.5px] text-on-surface-variant font-medium`}>
              No digital receipt files attached.
            </Text>
          </View>
        </GlassCard>
      </View>
    </SafeAreaView>
  );
}
