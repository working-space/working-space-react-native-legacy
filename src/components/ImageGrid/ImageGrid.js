import React, { useState, useCallback } from 'react';
import FBCollage from 'react-native-fb-collage';
import Slick from 'react-native-slick';
import Modal from 'react-native-modal';
import { css } from '@emotion/native';
import { ImageWrapper, CardImage, TotalView, CloseButton, InfoBox } from './ImageGrid.styles';
import CloseIcon from '~/assets/icons/icon_close.svg';
import SmallLocationFillIcon from '~/assets/icons/icon_small_location_fill.svg';
import SmallTagFillIcon from '~/assets/icons/icon_small_tag_fill.svg';
import NoneImage from '../NoneImage/NoneImage';

const ImageGrid = (props) => {
  const { title, distance, tags, cardImages } = props;
  const [visibleInput, setVisibleInput] = useState(null);

  const handleCloseBtn = useCallback(() => {
    setVisibleInput(null);
  }, []);

  const renderPagination = (index, total, context) => {
    return (
      <TotalView>
        <TotalView.Text>
          {index + 1} / {total}
        </TotalView.Text>
      </TotalView>
    );
  };

  if (cardImages === null) {
    return (
      <ImageWrapper>
        <NoneImage />
      </ImageWrapper>
    );
  }

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
        style={{ width: '100%', margin: 0, backgroundColor: '#222222' }}
        backdropOpacity={0}
        isVisible={visibleInput !== null}
        onBackButtonPress={handleCloseBtn}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}>
        <CloseButton onPress={handleCloseBtn}>
          <CloseIcon style={{ fill: '#fff' }} />
        </CloseButton>
        <Slick index={visibleInput} showsButtons={false} renderPagination={renderPagination}>
          {cardImages.map((cardImage, i) => (
            <CardImage key={i}>
              <CardImage.Image resizeMode={'contain'} source={{ uri: cardImage }} />
            </CardImage>
          ))}
        </Slick>
        <InfoBox>
          <InfoBox.Title>{title}</InfoBox.Title>
          <InfoBox.SubTitle>
            <InfoBox.SubInfo
              style={css`
                border-right-width: 1px;
                border-style: solid;
                border-color: #222;
                padding-left: 0;
              `}>
              <SmallLocationFillIcon style={{ fill: '#fff' }} />
              <InfoBox.Text>{distance}</InfoBox.Text>
            </InfoBox.SubInfo>
            <InfoBox.SubInfo>
              <SmallTagFillIcon style={{ fill: '#fff' }} />
              <InfoBox.Text>태그 {tags.length}개</InfoBox.Text>
            </InfoBox.SubInfo>
          </InfoBox.SubTitle>
        </InfoBox>
      </Modal>
    </>
  );
};

ImageGrid.defaultProps = {
  // cardImages: [
  //   'https://cdn.inflearn.com/wp-content/uploads/web3-1.png',
  //   'https://cdn.inflearn.com/wp-content/uploads/web3-1.png',
  //   'https://cdn.inflearn.com/wp-content/uploads/web3-1.png',
  //   'https://cdn.inflearn.com/wp-content/uploads/web3-1.png',
  //   'https://cdn.inflearn.com/wp-content/uploads/web3-1.png',
  //   'https://cdn.inflearn.com/wp-content/uploads/web3-1.png',
  // ],
  cardImages: null,
};

export default ImageGrid;
