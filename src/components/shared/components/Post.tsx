import React, { RefObject, createRef, useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Value,
  block,
  cond,
  eq,
  set,
  useCode,
} from "react-native-reanimated";
import {
  PinchGestureHandler,
  ScrollView,
  State,
} from "react-native-gesture-handler";
import {
  onGestureEvent,
  pinchActive,
  pinchBegan,
  timing,
  transformOrigin,
  translate,
  useGestureHandler,
  useValue,
  vec,
} from "react-native-redash";
import NftHeader from "../../home/timeline/nft/header";
import NftFooter from "../../home/timeline/nft/footer";
import styles from "../../home/timeline/nft/styles";
import { useNavigation } from '@react-navigation/native';



interface nftProps {
  image: string;
  tokenId: number;
}
interface PostProps {
  nft: nftProps;
  state: Animated.Value<State>;
  pinchRef: RefObject<PinchGestureHandler>;
  pinchRefs: RefObject<PinchGestureHandler>[];
  scrollView: RefObject<ScrollView>;
}

export default ({
  nft,
  state,
  pinchRef,
  pinchRefs,
  scrollView,
}: PostProps) => {

  const { width } = Dimensions.get("window");
  const SIZE = width;
  const origin = vec.createValue(0, 0);
  const pinch = vec.createValue(0, 0);
  const focal = vec.createValue(0, 0);
  const scale = useValue(1);
  const numberOfPointers = useValue(0);
  const pinchGestureHandler = useGestureHandler({
    numberOfPointers,
    scale,
    state,
    focalX: focal.x,
    focalY: focal.y,
  });
  const zIndex = cond(eq(state, State.ACTIVE), 3, 0);
  const adjustedFocal = vec.add(
    {
      x: -SIZE / 2,
      y: -SIZE / 2,
    },
    focal
  );

  const navigation = useNavigation();
  useEffect(() => {
    
  }, []);
  useCode(
    () =>
      block([
        cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
        cond(
          pinchActive(state, numberOfPointers),
          vec.set(pinch, vec.minus(vec.sub(origin, adjustedFocal)))
        ),
        cond(eq(state, State.END), [
          set(pinch.x, timing({ from: pinch.x, to: 0 })),
          set(pinch.y, timing({ from: pinch.y, to: 0 })),
          set(scale, timing({ from: scale, to: 1 })),
        ]),
      ]),
    [adjustedFocal, numberOfPointers, origin, pinch, scale, state]
  );
const a = createRef<PinchGestureHandler>();
  return (
  <View style={styles.headerContainer}>
    <NftHeader nft={nft}/>
      <Animated.View style={{ width: SIZE, height: SIZE, zIndex }}>
        <PinchGestureHandler
          ref={a}
          simultaneousHandlers={[
            scrollView,
            ...pinchRefs.filter((ref) => ref !== pinchRef),
          ]}
          {...pinchGestureHandler}
        >
          <Animated.View style={StyleSheet.absoluteFill}>
          <Pressable onPress={() => navigation.navigate(
          "NFTDetail",
          { nftTokenId: nft.tokenId },
        )}
        >
            <Animated.Image
              style={[
                styles.nftNFTPhoto,
                {
                  transform: [
                    ...translate(pinch),
                    ...transformOrigin(origin, { scale }),
                  ],
                },
              ]}
              source={{ uri: nft.image }}
            />
            </Pressable>
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
      <NftFooter nft={nft}/>
  </View>
  );
};
