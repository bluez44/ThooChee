import React from "react";
import { View, Text } from "react-native";
import tw from "../theme/tailwind";

interface BudgetProgressProps {
  spent: number;
  limit: number;
}

export const BudgetProgress: React.FC<BudgetProgressProps> = ({ spent, limit }) => {
  const percentage = Math.min(Math.round((spent / limit) * 100), 100);
  const isOver = spent > limit;

  // Determine progress bar color based on usage
  const getProgressColor = () => {
    if (isOver) return "bg-tertiary";
    if (percentage >= 85) return "bg-orange-500";
    return "bg-primary";
  };

  const getPercentageColor = () => {
    if (isOver) return "text-tertiary";
    if (percentage >= 85) return "text-orange-500";
    return "text-primary";
  };

  return (
    <View style={tw`w-full my-3`}>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <Text style={tw`text-on-surface-variant font-medium text-[14px]`}>
          Monthly Budget Spent
        </Text>
        <Text style={[tw`font-bold text-[15px]`, tw`${getPercentageColor()}`]}>
          {percentage}%
        </Text>
      </View>

      {/* Progress Track Container */}
      <View style={tw`w-full h-4 bg-white/40 rounded-full overflow-hidden border border-white/30 p-[2px]`}>
        {/* Animated Inner Bar */}
        <View
          style={[
            tw`h-full rounded-full`,
            tw`${getProgressColor()}`,
            { width: `${percentage}%` },
          ]}
        />
      </View>

      <View style={tw`flex-row justify-between items-center mt-2`}>
        <Text style={tw`text-[13px] text-on-surface-variant`}>
          ${spent.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} spent
        </Text>
        <Text style={tw`text-[13px] text-on-surface-variant`}>
          Budget: ${limit.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </Text>
      </View>

      {isOver && (
        <View style={tw`mt-2 flex-row items-center bg-tertiary/10 border border-tertiary/20 p-2.5 rounded-lg`}>
          <Text style={tw`text-[12px] text-tertiary font-medium`}>
            ⚠️ Budget Limit Exceeded! Consider reviewing your expenditures.
          </Text>
        </View>
      )}
    </View>
  );
};

export default BudgetProgress;
