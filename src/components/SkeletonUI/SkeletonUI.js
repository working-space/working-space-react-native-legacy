import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { SkeletonUIWrapper, SkeletonUIBox } from './SkeletonUI.styles';

const SkeletonUI = ({ currentPage }) => {
  const [count, setCount] = useState(0);
  const [colorTop, setColorTop] = useState('#fff');
  const [colorBottom, setColorBottom] = useState('#eee');

  /*
  const incrementColor = (color, step) => {
    const intColor = parseInt(color.substr(1), 16);
    const newIntColor = (intColor + step).toString(16);
    console.log(`#${'0'.repeat(6 - newIntColor.length)}${newIntColor}`);
    return `#${'c'.repeat(6 - newIntColor.length)}${newIntColor}`;
  };

  useEffect(() => {
    setInterval(() => {
      setCount((prev) => {
        return prev + 10;
      });
      setColorTop(incrementColor(colorTop, 5));
      setColorBottom(incrementColor(colorBottom, -5));
    }, 5);
  }, [colorTop, colorBottom, count]);
  */

  return (
    <SkeletonUIWrapper>
      <SkeletonUIBox page={currentPage}>
        <LinearGradient colors={[colorTop, colorBottom]} style={{ width: 200, height: 200 }} />
        <SkeletonUIBox.Box>
          <SkeletonUIBox.Box1 />
          <SkeletonUIBox.Box2 />
        </SkeletonUIBox.Box>
        <SkeletonUIBox.Box3 />
        <SkeletonUIBox.Box4 />
        <SkeletonUIBox.Box5 />
      </SkeletonUIBox>
      <SkeletonUIBox page={currentPage}>
        <SkeletonUIBox.Box>
          <SkeletonUIBox.Box1 />
          <SkeletonUIBox.Box2 />
        </SkeletonUIBox.Box>
        <SkeletonUIBox.Box3 />
        <SkeletonUIBox.Box4 />
        <SkeletonUIBox.Box5 />
      </SkeletonUIBox>
      <SkeletonUIBox page={currentPage}>
        <SkeletonUIBox.Box>
          <SkeletonUIBox.Box1 />
          <SkeletonUIBox.Box2 />
        </SkeletonUIBox.Box>
        <SkeletonUIBox.Box3 />
        <SkeletonUIBox.Box4 />
        <SkeletonUIBox.Box5 />
      </SkeletonUIBox>
    </SkeletonUIWrapper>
  );
};

export default SkeletonUI;
