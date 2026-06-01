import React from "react";
import { View, ViewProps } from "react-native";
import tw from "../theme/tailwind";

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  intensity?: "low" | "medium" | "high";
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  intensity = "medium",
  style,
  ...props
}) => {
  const bgOpacity =
    intensity === "low"
      ? "bg-white/50"
      : intensity === "high"
      ? "bg-white/85"
      : "bg-white/70";

  return (
    <View
      style={[
        tw`${bgOpacity} rounded-[24px] border border-white/30 px-5 py-4 shadow-sm`,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default GlassCard;
