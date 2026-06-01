import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import tw from "../theme/tailwind";

interface VoiceWaveProps {
  isListening: boolean;
}

export const VoiceWave: React.FC<VoiceWaveProps> = ({ isListening }) => {
  // Bouncing animations for 5 lines
  const anim1 = useRef(new Animated.Value(1)).current;
  const anim2 = useRef(new Animated.Value(1)).current;
  const anim3 = useRef(new Animated.Value(1)).current;
  const anim4 = useRef(new Animated.Value(1)).current;
  const anim5 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    if (isListening) {
      const createPulse = (anim: Animated.Value, duration: number, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(anim, {
              toValue: 2.8,
              duration: duration,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0.6,
              duration: duration,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 1.5,
              duration: duration * 0.8,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        );
      };

      animation = Animated.parallel([
        createPulse(anim1, 400, 0),
        createPulse(anim2, 500, 100),
        createPulse(anim3, 450, 200),
        createPulse(anim4, 520, 50),
        createPulse(anim5, 480, 150),
      ]);

      animation.start();
    } else {
      // Reset values smoothly when not listening
      Animated.parallel([
        Animated.spring(anim1, { toValue: 1, useNativeDriver: true }),
        Animated.spring(anim2, { toValue: 1, useNativeDriver: true }),
        Animated.spring(anim3, { toValue: 1, useNativeDriver: true }),
        Animated.spring(anim4, { toValue: 1, useNativeDriver: true }),
        Animated.spring(anim5, { toValue: 1, useNativeDriver: true }),
      ]).start();
    }

    return () => {
      if (animation) animation.stop();
    };
  }, [isListening]);

  return (
    <View style={tw`flex-row justify-center items-center h-28 w-full gap-3`}>
      <Animated.View
        style={[
          tw`w-2 h-8 rounded-full bg-primary-container`,
          { transform: [{ scaleY: anim1 }] },
        ]}
      />
      <Animated.View
        style={[
          tw`w-2 h-14 rounded-full bg-primary`,
          { transform: [{ scaleY: anim2 }] },
        ]}
      />
      <Animated.View
        style={[
          tw`w-2 h-20 rounded-full bg-secondary-container border border-secondary/30`,
          { transform: [{ scaleY: anim3 }] },
        ]}
      />
      <Animated.View
        style={[
          tw`w-2 h-14 rounded-full bg-primary`,
          { transform: [{ scaleY: anim4 }] },
        ]}
      />
      <Animated.View
        style={[
          tw`w-2 h-8 rounded-full bg-primary-container`,
          { transform: [{ scaleY: anim5 }] },
        ]}
      />
    </View>
  );
};

export default VoiceWave;
