import React from "react"
import "./styles.css"
import { withMainScrollView } from '@hocs';
import { View } from 'react-native';

const StartScreen = () => (
  <View>
    <div className="start-screen flex-col-hstart-vstart">
      <div className="home-screen flex-col-hstart-vstart clip-contents">
        <div className="group-7107">
          <div className="group-323">
            <p className="txt-7610">NEFT ME</p>
          </div>
        </div>
      </div>
    </div>
    </View>
  );

export default withMainScrollView(StartScreen);
