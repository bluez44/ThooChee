import React from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import {
  ArrowUpRight,
  ArrowDownRight,
  Mic,
  Plus,
  Zap,
  TrendingUp,
  ShoppingBag,
  Car,
  Coffee,
  Tv,
  Heart,
  Briefcase,
  HelpCircle,
} from "lucide-react-native";
import { useAppState, Transaction } from "../../store/AppContext";
import GlassCard from "../../components/GlassCard";
import BudgetProgress from "../../components/BudgetProgress";
import tw from "../../theme/tailwind";

// Helper to resolve category icons & colors dynamically
export const getCategoryConfig = (category: string) => {
  const normalized = category.toLowerCase();
  if (normalized.includes("salary")) {
    return { icon: TrendingUp, bg: "bg-emerald-50", text: "text-emerald-600" };
  } else if (normalized.includes("groceries")) {
    return { icon: ShoppingBag, bg: "bg-amber-50", text: "text-amber-600" };
  } else if (normalized.includes("food") || normalized.includes("drinks") || normalized.includes("coffee")) {
    return { icon: Coffee, bg: "bg-orange-50", text: "text-orange-600" };
  } else if (normalized.includes("transport")) {
    return { icon: Car, bg: "bg-indigo-50", text: "text-indigo-600" };
  } else if (normalized.includes("entertainment") || normalized.includes("subscription")) {
    return { icon: Tv, bg: "bg-purple-50", text: "text-purple-600" };
  } else if (normalized.includes("utilities") || normalized.includes("electric")) {
    return { icon: Zap, bg: "bg-blue-50", text: "text-blue-600" };
  } else if (normalized.includes("health") || normalized.includes("gym")) {
    return { icon: Heart, bg: "bg-red-50", text: "text-red-600" };
  } else if (normalized.includes("freelance") || normalized.includes("work")) {
    return { icon: Briefcase, bg: "bg-teal-50", text: "text-teal-600" };
  }
  return { icon: HelpCircle, bg: "bg-slate-50", text: "text-slate-600" };
};

export default function OverviewScreen() {
  const { transactions, budgetLimit } = useAppState();
  const router = useRouter();

  // Calculations for current metrics
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  // Recent transactions list (limit to 4)
  const recentTransactions = transactions.slice(0, 4);

  return (
    <SafeAreaView style={tw`flex-1 bg-background`}>
      <ScrollView contentContainerStyle={tw`px-5 pt-4 pb-28`}>
        {/* Header Block */}
        <View style={tw`flex-row justify-between items-center mb-6`}>
          <View>
            <Text style={tw`text-[14px] text-on-surface-variant font-medium`}>
              Welcome back,
            </Text>
            <Text style={tw`text-[24px] font-bold text-on-background tracking-tight`}>
              ThooChee User
            </Text>
          </View>
          <Pressable onPress={() => router.push("/profile")}>
            <View style={tw`w-12 h-12 rounded-full border border-white/50 bg-white/70 overflow-hidden shadow-sm justify-center items-center`}>
              <Text style={tw`text-primary font-bold text-[16px]`}>TC</Text>
            </View>
          </Pressable>
        </View>

        {/* Ethereal Balance Card */}
        <GlassCard intensity="high" style={tw`mb-5`}>
          <Text style={tw`text-[13px] text-on-surface-variant font-medium mb-1`}>
            TOTAL NET BALANCE
          </Text>
          <Text style={tw`text-[36px] font-bold text-on-background tracking-tighter mb-4`}>
            ${netBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </Text>

          {/* Income vs Expenses Divider */}
          <View style={tw`flex-row border-t border-white/30 pt-4`}>
            <View style={tw`flex-1 flex-row items-center`}>
              <View style={tw`w-8 h-8 rounded-full bg-emerald-50 justify-center items-center mr-2.5`}>
                <ArrowUpRight color="#34c759" size={16} />
              </View>
              <View>
                <Text style={tw`text-[11px] text-on-surface-variant font-medium`}>
                  INCOME
                </Text>
                <Text style={tw`text-[15px] font-bold text-secondary`}>
                  +${totalIncome.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </Text>
              </View>
            </View>

            <View style={tw`w-[1px] bg-white/20 h-8 mx-2`} />

            <View style={tw`flex-1 flex-row items-center pl-2`}>
              <View style={tw`w-8 h-8 rounded-full bg-red-50 justify-center items-center mr-2.5`}>
                <ArrowDownRight color="#ff3b30" size={16} />
              </View>
              <View>
                <Text style={tw`text-[11px] text-on-surface-variant font-medium`}>
                  EXPENSES
                </Text>
                <Text style={tw`text-[15px] font-bold text-tertiary`}>
                  -${totalExpense.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </Text>
              </View>
            </View>
          </View>
        </GlassCard>

        {/* Budget Progress Tracker */}
        <GlassCard style={tw`mb-6`}>
          <BudgetProgress spent={totalExpense} limit={budgetLimit} />
        </GlassCard>

        {/* Dynamic Voice Prompt CTA */}
        <Pressable onPress={() => router.push("/voice")} style={tw`mb-6`}>
          <GlassCard style={tw`bg-primary-container border-primary-container/20 flex-row items-center py-4`}>
            <View style={tw`bg-white/25 w-12 h-12 rounded-full justify-center items-center mr-4`}>
              <Mic color="#ffffff" size={24} />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-white font-bold text-[15px]`}>
                Add Expense via Voice
              </Text>
              <Text style={tw`text-white/80 text-[12px] mt-0.5`}>
                "Spent $45 on dinner at Olive Garden"
              </Text>
            </View>
            <View style={tw`bg-white/20 px-3 py-1.5 rounded-full`}>
              <Text style={tw`text-white text-[11px] font-bold`}>TRY</Text>
            </View>
          </GlassCard>
        </Pressable>

        {/* Recent Transactions List */}
        <View style={tw`flex-row justify-between items-center mb-3`}>
          <Text style={tw`text-[18px] font-bold text-on-background`}>
            Recent Activity
          </Text>
          <Link href="/transactions" asChild>
            <Pressable>
              <Text style={tw`text-[14px] text-primary font-semibold`}>
                See All
              </Text>
            </Pressable>
          </Link>
        </View>

        <GlassCard style={tw`px-3`}>
          {recentTransactions.length === 0 ? (
            <View style={tw`py-6 items-center`}>
              <Text style={tw`text-on-surface-variant text-[14px]`}>
                No transactions recorded yet.
              </Text>
            </View>
          ) : (
            recentTransactions.map((tx, idx) => {
              const config = getCategoryConfig(tx.category);
              const IconComp = config.icon;
              return (
                <Pressable
                  key={tx.id}
                  onPress={() => router.push(`/details/${tx.id}`)}
                  style={[
                    tw`flex-row items-center py-3.5 px-2`,
                    idx !== recentTransactions.length - 1
                      ? tw`border-b border-black/5`
                      : {},
                  ]}
                >
                  {/* Category Circle */}
                  <View style={[tw`w-10 h-10 rounded-full justify-center items-center mr-3`, tw`${config.bg}`]}>
                    <IconComp style={tw`${config.text}`} size={20} />
                  </View>

                  {/* Transaction Metadata */}
                  <View style={tw`flex-1`}>
                    <Text style={tw`font-semibold text-[15px] text-on-background`}>
                      {tx.title}
                    </Text>
                    <Text style={tw`text-[12px] text-on-surface-variant mt-0.5`}>
                      {tx.category} • {tx.date}
                    </Text>
                  </View>

                  {/* Transaction Value */}
                  <Text
                    style={[
                      tw`font-bold text-[16px]`,
                      tx.type === "income" ? tw`text-secondary` : tw`text-on-background`,
                    ]}
                  >
                    {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </Text>
                </Pressable>
              );
            })
          )}
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}
