import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Value, cond, eq, or } from "react-native-reanimated";
import { useSafeArea, useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";
import {
  PinchGestureHandler,
  ScrollView,
  State,
} from "react-native-gesture-handler";

import { Post } from "./components";
import { posts } from "./components/data";
import { FOOTER_HEIGHT } from "./components/Footer";
import { HEADER_HEIGHT } from "./components/Header";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const { height } = Dimensions.get("window");
const bottom =
  height -
  FOOTER_HEIGHT +
  // In this app, the status bar on Android is translucent
  (Platform.OS === "android" ? Constants.statusBarHeight : 0);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default function Insta() {
  const scrollView = useRef<ScrollView>(null);
  // This animation value needs to come from Vanilla Animated
  const y = new Animated.Value(0);
  const insets = useSafeAreaInsets();
  const paddingTop = HEADER_HEIGHT + insets.top;
  const paddingBottom = FOOTER_HEIGHT + insets.bottom;
  const items = posts.map((post) => ({
    post,
    state: new Value(State.UNDETERMINED),
    pinchRef: useRef<PinchGestureHandler>(null),
  }));
  const pinchRefs = items.map(({ pinchRef }) => pinchRef);
  const isActive = or(
    ...(items.map(({ state }) => eq(state, State.ACTIVE)) as Parameters<
      typeof or
    >)
  );
  const opacity = cond(isActive, 0.5, 0);
  return (
    <View style={styles.container}>
      <AnimatedScrollView
        ref={scrollView}
        pinchGestureEnabled={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        waitFor={pinchRefs}
        simultaneousHandlers={pinchRefs}
        contentContainerStyle={{
          paddingTop,
          paddingBottom,
        }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
          useNativeDriver: true,
        })}
      >
        {items.map(({ post, state, pinchRef }) => (
          <Post
            key={post.id}
            {...{ post, state, scrollView, pinchRef, pinchRefs }}
          />
        ))}
      </AnimatedScrollView>
    </View>
  );
};