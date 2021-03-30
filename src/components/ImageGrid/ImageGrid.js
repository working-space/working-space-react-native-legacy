import React, { useState, useCallback } from 'react';
import { Text } from 'react-native';
import FBCollage from 'react-native-fb-collage';
import Slick from 'react-native-slick';
import Modal from 'react-native-modal';
import { ImageWrapper } from './ImageGrid.styles';

const ImageGrid = (props) => {
  const { cardImages } = props;
  const [visibleInput, setVisibleInput] = useState(null);
  const handleCloseBtn = useCallback(() => {
    setVisibleInput(null);
  }, []);

  return (
    <>
      <ImageWrapper>
        <FBCollage
          images={cardImages}
          imageOnPress={(index) => {
            setVisibleInput(index);
          }}
          width={window.innerWidth}
          height={150}
          spacing={2}
          borderRadius={2}
        />
      </ImageWrapper>
      <Modal
        style={{ width: '100%', margin: 0, backgroundColor: '#ffffff' }}
        backdropOpacity={0}
        isVisible={visibleInput !== null}
        onBackButtonPress={handleCloseBtn}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}>
        <Slick showsButtons={true}>
          {cardImages.map((cardImage) => (
            <Text>{cardImage}</Text>
          ))}
        </Slick>
      </Modal>
    </>
  );
};

ImageGrid.defaultProps = {
  cardImages: [
    'https://cdn.inflearn.com/wp-content/uploads/web3-1.png',
    'https://cdn.inflearn.com/wp-content/uploads/web3-1.png',
    'https://cdn.inflearn.com/wp-content/uploads/web3-1.png',
    'https://cdn.inflearn.com/wp-content/uploads/web3-1.png',
    'https://cdn.inflearn.com/wp-content/uploads/web3-1.png',
    'https://cdn.inflearn.com/wp-content/uploads/web3-1.png',
  ],
};

export default ImageGrid;
