import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Search, ArrowUpDown, Filter } from "lucide-react-native";
import { useAppState, Transaction } from "../../store/AppContext";
import { getCategoryConfig } from "./index";
import GlassCard from "../../components/GlassCard";
import tw from "../../theme/tailwind";

export default function LedgerScreen() {
  const { transactions } = useAppState();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [isSortedDesc, setIsSortedDesc] = useState(true);

  // Apply filters and search queries
  const filteredTransactions = transactions
    .filter((tx) => {
      // Type Tab Filter
      if (activeTab === "income" && tx.type !== "income") return false;
      if (activeTab === "expense" && tx.type !== "expense") return false;

      // Text Search Query
      const query = searchQuery.toLowerCase();
      const matchTitle = tx.title.toLowerCase().includes(query);
      const matchCategory = tx.category.toLowerCase().includes(query);
      const matchNotes = tx.notes?.toLowerCase().includes(query) || false;

      return matchTitle || matchCategory || matchNotes;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return isSortedDesc ? dateB - dateA : dateA - dateB;
      } else {
        return isSortedDesc ? b.amount - a.amount : a.amount - b.amount;
      }
    });

  const toggleSort = () => {
    if (sortBy === "date") {
      setSortBy("amount");
      setIsSortedDesc(true);
    } else if (sortBy === "amount" && isSortedDesc) {
      setIsSortedDesc(false);
    } else {
      setSortBy("date");
      setIsSortedDesc(true);
    }
  };

  const getSortLabel = () => {
    if (sortBy === "date") return "Date (Newest)";
    return isSortedDesc ? "Amount (High-Low)" : "Amount (Low-High)";
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-background`}>
      <View style={tw`px-5 pt-4 pb-28 flex-1`}>
        {/* Header Block */}
        <View style={tw`flex-row justify-between items-center mb-5`}>
          <Text style={tw`text-[24px] font-bold text-on-background tracking-tight`}>
            Financial Ledger
          </Text>
          <Pressable
            onPress={toggleSort}
            style={tw`flex-row items-center bg-white/70 border border-white/50 px-3 h-9 rounded-full shadow-sm`}
          >
            <ArrowUpDown size={14} style={tw`text-primary mr-1.5`} />
            <Text style={tw`text-[12px] text-on-surface font-semibold`}>
              {getSortLabel()}
            </Text>
          </Pressable>
        </View>

        {/* Search Input Box */}
        <View style={tw`flex-row items-center bg-white/70 border border-white/40 h-12 rounded-xl px-3.5 mb-4 shadow-sm`}>
          <Search size={18} style={tw`text-on-surface-variant mr-2`} />
          <TextInput
            placeholder="Search transactions, notes..."
            placeholderTextColor="#717786"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={tw`flex-1 h-full text-[14px] text-on-background`}
          />
        </View>

        {/* Ethereal Segmented Controls */}
        <View style={tw`flex-row bg-white/50 border border-white/30 p-1 rounded-full mb-5 shadow-sm`}>
          {(["all", "income", "expense"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  tw`flex-1 py-2.5 rounded-full items-center justify-center`,
                  isActive ? tw`bg-white shadow-sm border border-black/5` : {},
                ]}
              >
                <Text
                  style={[
                    tw`text-[13px] font-semibold tracking-wide capitalize`,
                    isActive ? tw`text-primary` : tw`text-on-surface-variant`,
                  ]}
                >
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Filter Summary */}
        <View style={tw`flex-row justify-between mb-3 px-1`}>
          <Text style={tw`text-[13px] text-on-surface-variant font-medium`}>
            Showing {filteredTransactions.length} items
          </Text>
        </View>

        {/* Ledger Transaction FlatList */}
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tw`pb-12`}
          ListEmptyComponent={
            <GlassCard style={tw`py-12 items-center justify-center`}>
              <Text style={tw`text-[14px] text-on-surface-variant font-medium`}>
                No transactions match your search.
              </Text>
            </GlassCard>
          }
          renderItem={({ item, index }) => {
            const config = getCategoryConfig(item.category);
            const IconComp = config.icon;
            return (
              <GlassCard style={tw`mb-3.5 p-3.5`}>
                <Pressable
                  onPress={() => router.push(`/details/${item.id}`)}
                  style={tw`flex-row items-center`}
                >
                  <View style={[tw`w-10 h-10 rounded-full justify-center items-center mr-3.5`, tw`${config.bg}`]}>
                    <IconComp style={tw`${config.text}`} size={20} />
                  </View>

                  <View style={tw`flex-1 mr-2`}>
                    <Text style={tw`font-bold text-[15px] text-on-background`} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={tw`text-[12px] text-on-surface-variant mt-0.5`}>
                      {item.category} • {item.date}
                    </Text>
                  </View>

                  <View style={tw`items-end`}>
                    <Text
                      style={[
                        tw`font-bold text-[16px]`,
                        item.type === "income" ? tw`text-secondary` : tw`text-on-background`,
                      ]}
                    >
                      {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
                    </Text>
                    {item.notes ? (
                      <Text style={tw`text-[10px] text-on-surface-variant mt-0.5 italic`} numberOfLines={1}>
                        has notes
                      </Text>
                    ) : null}
                  </View>
                </Pressable>
              </GlassCard>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
