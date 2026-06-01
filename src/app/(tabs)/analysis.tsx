import React from "react";
import { ScrollView, View, Text, SafeAreaView } from "react-native";
import { TrendingDown, PiggyBank, Target, Award } from "lucide-react-native";
import { useAppState } from "../../store/AppContext";
import { getCategoryConfig } from "./index";
import GlassCard from "../../components/GlassCard";
import tw from "../../theme/tailwind";

export default function AnalysisScreen() {
  const { transactions, budgetLimit } = useAppState();

  // 1. Calculate Income & Expense Sums
  const expenses = transactions.filter((t) => t.type === "expense");
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  const incomes = transactions.filter((t) => t.type === "income");
  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);

  // 2. Sum Expenses by Category
  const categoryMap: { [key: string]: number } = {};
  expenses.forEach((tx) => {
    categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
  });

  // Convert to sorted list of objects
  const categorySpends = Object.keys(categoryMap)
    .map((cat) => ({
      category: cat,
      amount: categoryMap[cat],
    }))
    .sort((a, b) => b.amount - a.amount);

  const highestExpenseCategory = categorySpends[0]?.category || "None";
  const highestExpenseAmount = categorySpends[0]?.amount || 0;

  // 3. Smart Budgeting Insights
  const budgetUtilization = Math.round((totalExpense / budgetLimit) * 100);

  const getBudgetText = () => {
    if (budgetUtilization > 100) {
      return "You have exceeded your monthly limit. We suggest deferring non-essential retail purchases.";
    }
    if (budgetUtilization >= 80) {
      return "Warning: You're approaching your limit. Try cooking at home and minimizing subscription services.";
    }
    if (budgetUtilization >= 50) {
      return "Healthy spending volume. You are on track to save approximately 25% of your income this month.";
    }
    return "Excellent! You are maintaining an exceptionally low expense footprint. Great savings rate!";
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-background`}>
      <ScrollView contentContainerStyle={tw`px-5 pt-4 pb-28`}>
        {/* Header Block */}
        <Text style={tw`text-[24px] font-bold text-on-background tracking-tight mb-1`}>
          Spend Analytics
        </Text>
        <Text style={tw`text-[14px] text-on-surface-variant mb-6`}>
          Interactive breakdowns of your inflows, outflows, and budget compliance.
        </Text>

        {/* Dynamic Inflow vs Outflow Cards */}
        <View style={tw`flex-row gap-3.5 mb-5`}>
          <GlassCard style={tw`flex-1 p-4`}>
            <View style={tw`w-7 h-7 rounded-full bg-emerald-50 justify-center items-center mb-2.5`}>
              <PiggyBank color="#34c759" size={15} />
            </View>
            <Text style={tw`text-[11px] text-on-surface-variant font-bold uppercase`}>
              Total Inflows
            </Text>
            <Text style={tw`text-[20px] font-bold text-secondary mt-1`}>
              ${totalIncome.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </Text>
          </GlassCard>

          <GlassCard style={tw`flex-1 p-4`}>
            <View style={tw`w-7 h-7 rounded-full bg-red-50 justify-center items-center mb-2.5`}>
              <TrendingDown color="#ff3b30" size={15} />
            </View>
            <Text style={tw`text-[11px] text-on-surface-variant font-bold uppercase`}>
              Total Outflows
            </Text>
            <Text style={tw`text-[20px] font-bold text-on-background mt-1`}>
              ${totalExpense.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </Text>
          </GlassCard>
        </View>

        {/* Spend Category Distribution Card */}
        <GlassCard intensity="high" style={tw`mb-5`}>
          <Text style={tw`text-[16px] font-bold text-on-background mb-1`}>
            Category Distribution
          </Text>
          <Text style={tw`text-[12px] text-on-surface-variant mb-5`}>
            Expenses sorted by total volume spent
          </Text>

          {categorySpends.length === 0 ? (
            <View style={tw`py-6 items-center`}>
              <Text style={tw`text-on-surface-variant text-[14px]`}>
                No expense data available for analysis.
              </Text>
            </View>
          ) : (
            categorySpends.map((item, index) => {
              const config = getCategoryConfig(item.category);
              const percentage = Math.round((item.amount / totalExpense) * 100);
              const IconComp = config.icon;
              return (
                <View key={item.category} style={tw`mb-4`}>
                  <View style={tw`flex-row justify-between items-center mb-1.5`}>
                    <View style={tw`flex-row items-center`}>
                      <View style={[tw`w-7 h-7 rounded-full justify-center items-center mr-2`, tw`${config.bg}`]}>
                        <IconComp style={tw`${config.text}`} size={14} />
                      </View>
                      <Text style={tw`text-[13.5px] font-semibold text-on-background`}>
                        {item.category}
                      </Text>
                    </View>
                    <View style={tw`flex-row items-center`}>
                      <Text style={tw`text-[13.5px] font-bold text-on-background mr-1`}>
                        ${item.amount.toFixed(0)}
                      </Text>
                      <Text style={tw`text-[11px] text-on-surface-variant`}>
                        ({percentage}%)
                      </Text>
                    </View>
                  </View>

                  {/* Ethereal Glass Progress Bar */}
                  <View style={tw`w-full h-2.5 bg-white/40 border border-white/30 rounded-full overflow-hidden`}>
                    <View
                      style={[
                        tw`h-full rounded-full`,
                        tw`${config.text.replace("text-", "bg-")}`,
                        { width: `${percentage}%` },
                      ]}
                    />
                  </View>
                </View>
              );
            })
          )}
        </GlassCard>

        {/* AI Smart Savings Insights Card */}
        <GlassCard style={tw`mb-6 p-4.5`}>
          <View style={tw`flex-row items-center mb-3`}>
            <View style={tw`w-8 h-8 rounded-full bg-primary/10 justify-center items-center mr-2.5`}>
              <Target color="#0058bc" size={16} />
            </View>
            <Text style={tw`text-[15px] font-bold text-on-background`}>
              Smart Financial Advice
            </Text>
          </View>
          <Text style={tw`text-[13px] text-on-surface-variant leading-5 mb-4`}>
            {getBudgetText()}
          </Text>

          {/* Core Outflow Advice */}
          {highestExpenseAmount > 0 && (
            <View style={tw`flex-row items-start bg-primary/5 border border-primary/10 p-3 rounded-xl`}>
              <Award color="#0058bc" size={16} style={tw`mr-2 mt-0.5`} />
              <Text style={tw`text-[12px] text-on-surface leading-4.5 flex-1`}>
                Your biggest expense category is <Text style={tw`font-bold text-primary`}>{highestExpenseCategory}</Text> with <Text style={tw`font-bold text-primary`}>${highestExpenseAmount.toFixed(0)}</Text> spent. Trimming this category by 10% next month saves you <Text style={tw`font-bold text-primary`}>${(highestExpenseAmount * 0.1).toFixed(0)}</Text>!
              </Text>
            </View>
          )}
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}
