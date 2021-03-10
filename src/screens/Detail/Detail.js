import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import Modal from 'react-native-modal';
import { isEmpty } from 'lodash';
import { css } from '@emotion/native';
import { DetailWrapper, LinkIconWrapper, ModalEvaluation } from './Detail.styles';
import Header from '~/components/Header/Header';
import DetailTitle from '~/components/DetailInfo/DetailTitle';
import DetailInfo from '~/components/DetailInfo/DetailInfo';
import DetailLocation from '~/components/DetailInfo/DetailLocation';
import TagList from '~/components/TagList/TagList';
import CommentList from '~/components/CommentList/CommentList';
import ImageGrid from '~/components/ImageGrid/ImageGrid';
import SetTags from '~/components/SetTags/SetTags';
import BackIcon from '~/assets/icons/icon_back.svg';
import ShareIcon from '~/assets/icons/icon_share.svg';
import FavoriteIcon from '~/assets/icons/icon_favorite.svg';
import BookmarkIcon from '~/assets/icons/icon_bookmark.svg';
import CloseIcon from '~/assets/icons/icon_close.svg';

const Detail = ({ like, userPreferTags, route, navigation: { goBack } }) => {
  const { cardData } = route.params;
  const { title, distance, tags, address } = cardData;

  const [visibleInput, setVisibleInput] = useState(false);
  const [preferTags, setPreferTags] = useState([]);
  const [selectPreferTags, setSelectPreferTags] = useState([]);

  useEffect(() => {
    setPreferTags(userPreferTags);
  }, [selectPreferTags, userPreferTags]);

  useEffect(() => {
    console.log('preferTags', preferTags);
    console.log('\n');
    console.log('selectPreferTags', selectPreferTags);
  }, [preferTags, selectPreferTags]);

  const handleToggleTag = useCallback((tag) => {
    setPreferTags((prevSelectedTagIds) => {
      const ids = [...prevSelectedTagIds];
      const index = ids.findIndex((id) => tag.id === id);
      if (index > -1) {
        ids.splice(index, 1);
      } else {
        ids.push(tag.id);
      }
      return ids;
    });
  }, []);

  const handleModalEvaluation = useCallback(() => {
    setVisibleInput(true);
  }, []);

  const handleSubmitBtn = useCallback(() => {
    setVisibleInput(false);
    setSelectPreferTags([]);
  }, []);

  const handleCloseBtn = useCallback(() => {
    setVisibleInput(false);
    setSelectPreferTags([]);
  }, []);

  return (
    <>
      <Header
        showBorderBottom={true}
        left={
          <Header.Button onPress={() => goBack()}>
            <BackIcon />
          </Header.Button>
        }
        right={
          <LinkIconWrapper>
            <LinkIconWrapper.Item>
              <FavoriteIcon width="24" height="24" />
              <LinkIconWrapper.Text>{like}</LinkIconWrapper.Text>
            </LinkIconWrapper.Item>
            <LinkIconWrapper.Item>
              <BookmarkIcon width="24" height="24" />
            </LinkIconWrapper.Item>
            <LinkIconWrapper.Item>
              <ShareIcon width="24" height="24" />
            </LinkIconWrapper.Item>
          </LinkIconWrapper>
        }
      />
      <DetailWrapper>
        <DetailTitle title={title} distance={distance} tags={tags} />
        <ImageGrid />
        <DetailInfo address={address} />
        <DetailLocation />
        <TagList tags={tags} preferTags={preferTags} onModalEvaluation={handleModalEvaluation} />
        <CommentList />
      </DetailWrapper>
      <Modal style={{ width: '100%', margin: 0 }} isVisible={visibleInput} onBackButtonPress={handleCloseBtn} hideModalContentWhileAnimating={true} useNativeDriver={true}>
        <ModalEvaluation>
          <ModalEvaluation.Header>
            <ModalEvaluation.Top>
              <ModalEvaluation.CloseButton onPress={handleCloseBtn}>
                <CloseIcon />
              </ModalEvaluation.CloseButton>
            </ModalEvaluation.Top>
            <ModalEvaluation.Bottom>
              <ModalEvaluation.Title>작업공간으로{'\n'}적절한 태그를 선택해주세요!</ModalEvaluation.Title>
            </ModalEvaluation.Bottom>
          </ModalEvaluation.Header>
          <SetTags preferTags={preferTags.concat(selectPreferTags)} onToggleTag={handleToggleTag} />
          <ModalEvaluation.SubmitButton
            onPress={handleSubmitBtn}
            style={css`
              background-color: ${isEmpty(preferTags) && isEmpty(selectPreferTags) ? '#cccccc' : '#ffbb44'};
            `}>
            <ModalEvaluation.Text>
              {isEmpty(preferTags) && isEmpty(selectPreferTags) ? '태그가 선택되지 않았어요.' : `태그 ${preferTags.length + selectPreferTags.length}개 선택! 평가 등록하기`}
            </ModalEvaluation.Text>
          </ModalEvaluation.SubmitButton>
        </ModalEvaluation>
      </Modal>
    </>
  );
};

Detail.defaultProps = {
  like: 23,
  userPreferTags: ['CLEAN_TOILET', 'STUDY_ROOM', 'VARIOUS_DESSERTS', 'SMOKING'],
};

export default observer(Detail);
