import React from "react";
import {
  Pressable,
  Text,
  PressableProps,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import tw from "../theme/tailwind";

interface GlassButtonProps extends PressableProps {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "glass" | "danger";
  loading?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  title,
  variant = "primary",
  loading = false,
  style,
  disabled,
  ...props
}) => {
  const getStyles = (pressed: boolean): ViewStyle[] => {
    const baseStyle = tw`h-14 rounded-full justify-center items-center px-6 flex-row shadow-sm`;

    let variantStyle = tw`bg-primary`;
    let textStyle = tw`text-white font-semibold text-[16px]`;

    if (variant === "secondary") {
      variantStyle = tw`bg-secondary`;
    } else if (variant === "outline") {
      variantStyle = tw`bg-transparent border border-primary`;
      textStyle = tw`text-primary font-semibold text-[16px]`;
    } else if (variant === "danger") {
      variantStyle = tw`bg-tertiary`;
    } else if (variant === "glass") {
      variantStyle = tw`bg-white/80 border border-white/50`;
      textStyle = tw`text-on-background font-semibold text-[16px]`;
    }

    const pressStyle = pressed ? { transform: [{ scale: 0.97 }], opacity: 0.9 } : {};
    const disabledStyle = disabled ? tw`opacity-50` : {};

    return [baseStyle, variantStyle, pressStyle, disabledStyle, style as ViewStyle];
  };

  const getTextStyle = () => {
    if (variant === "outline") return tw`text-primary font-semibold text-[16px]`;
    if (variant === "glass") return tw`text-on-background font-semibold text-[16px]`;
    return tw`text-white font-semibold text-[16px]`;
  };

  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => getStyles(pressed)}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" || variant === "glass" ? "#0058bc" : "#ffffff"}
          size="small"
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </Pressable>
  );
};

export default GlassButton;
