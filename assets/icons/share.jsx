import React from 'react';
import Svg, { Path } from 'react-native-svg';

// eslint-disable-next-line react/prop-types
const SvgComponent = ({ style }) => (
  <Svg
    width={22}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.35 1.251a.904.904 0 0 0-.79-.445L1.264.82a.914.914 0 0 0-.86.594.894.894 0 0 0 .056.765c.051.084.117.163.196.232l7.436 6.366 1.813 9.563a.88.88 0 0 0 .744.714.932.932 0 0 0 .948-.445l9.75-16.453a.885.885 0 0 0 .004-.905Zm-18.774.947h15.713L8.83 7.557 2.576 2.198Zm8.469 14.592L9.52 8.754l9.474-5.364-7.95 13.4Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgComponent;
