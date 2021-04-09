import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Share, Text } from 'react-native';
import Modal from 'react-native-modal';
import { css } from '@emotion/native';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react-lite';
import { DetailWrapper, LinkIconWrapper, ModalEvaluation } from './Detail.styles';
import Header from '~/components/Header/Header';
import DetailTitle from '~/components/DetailInfo/DetailTitle';
import DetailInfo from '~/components/DetailInfo/DetailInfo';
import DetailLocation from '~/components/DetailInfo/DetailLocation';
import TagList from '~/components/TagList/TagList';
import CommentList from '~/components/CommentList/CommentList';
import ImageGrid from '~/components/ImageGrid/ImageGrid';
import SetTags from '~/components/SetTags/SetTags';
import InputComment from '~/components/InputComment/InputComment';
import BackIcon from '~/assets/icons/icon_back.svg';
import ShareIcon from '~/assets/icons/icon_share.svg';
import FavoriteIcon from '~/assets/icons/icon_favorite.svg';
import FavoriteFillIcon from '~/assets/icons/icon_favorite_fill.svg';
import BookmarkIcon from '~/assets/icons/icon_bookmark.svg';
import BookmarkFillIcon from '~/assets/icons/icon_bookmark_fill.svg';
import CloseIcon from '~/assets/icons/icon_close.svg';
import api from '~/api';

const Detail = ({ distance, like, userPreferTags, route, navigation: { goBack } }) => {
  const { cafeId } = route.params;

  const [cafeData, setCafeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleInput, setVisibleInput] = useState(null);
  const [preferTags, setPreferTags] = useState([...userPreferTags]);
  const [selectPreferTags, setSelectPreferTags] = useState([...userPreferTags]);
  const [toggleFavorite, setToggleFavorite] = useState(false);
  const [toggleBookmark, setToggleBookmark] = useState(false);
  const [comment, setComment] = useState(null);
  const inputRef = useRef(null);

  const getCafeDetail = async () => {
    const result = await api.get('/cafes/daum-402974200/');
    return result.data;
  };

  useEffect(() => {
    cafeData === null && setLoading(true);
    getCafeDetail()
      .then((cafe) => {
        loading && setCafeData(cafe);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [cafeData, loading]);

  const handleToggleFavoriteButton = useCallback(() => {
    setToggleFavorite(toggleFavorite ? false : true);
  }, [toggleFavorite]);

  const handleToggleBookmarkButton = useCallback(() => {
    setToggleBookmark(toggleBookmark ? false : true);
  }, [toggleBookmark]);

  const handleShareButton = async () => {
    try {
      const result = await Share.share({
        title: cafeData.name,
        message: '작업하기 좋은 카페를 추천합니다!',
      });
      if (result.action === Share.shareAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleToggleTag = useCallback((tag) => {
    setSelectPreferTags((prevSelectedTagIds) => {
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

  const handleSetTagsModal = useCallback(() => {
    setVisibleInput('Tags');
  }, []);

  const handleSetCommentText = useCallback(async (text) => {
    await setComment(text);
    await setVisibleInput(null);
  }, []);

  const handleSetCommentTextModal = useCallback(() => {
    setVisibleInput('Comments');
  }, []);

  const handleSubmitBtn = useCallback(() => {
    setVisibleInput(null);
    setPreferTags([...selectPreferTags]);
  }, [selectPreferTags]);

  const handleCloseBtn = useCallback(() => {
    setVisibleInput(null);
    setSelectPreferTags([...preferTags]);
  }, [preferTags]);

  return cafeData === null || loading ? (
    <Text>로딩중</Text>
  ) : (
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
            <LinkIconWrapper.Item onPress={handleToggleFavoriteButton}>
              {toggleFavorite ? <FavoriteFillIcon width="24" height="24" /> : <FavoriteIcon width="24" height="24" />}
              <LinkIconWrapper.Text>{like + toggleFavorite}</LinkIconWrapper.Text>
            </LinkIconWrapper.Item>
            <LinkIconWrapper.Item onPress={handleToggleBookmarkButton}>{toggleBookmark ? <BookmarkFillIcon width="24" height="24" /> : <BookmarkIcon width="24" height="24" />}</LinkIconWrapper.Item>
            <LinkIconWrapper.Item onPress={handleShareButton}>
              <ShareIcon width="24" height="24" />
            </LinkIconWrapper.Item>
          </LinkIconWrapper>
        }
      />
      <DetailWrapper>
        <DetailTitle title={cafeData.name} distance={distance} tags={cafeData.tags} />
        <ImageGrid title={cafeData.name} distance={distance} tags={cafeData.tags} />
        <DetailInfo address={cafeData.parcel_addr} phone={cafeData.phone} />
        <DetailLocation />
        <TagList tags={cafeData.tags} preferTags={preferTags} onSetTagsModal={handleSetTagsModal} />
        <CommentList comments={cafeData.comments} onSetCommentTextModal={handleSetCommentTextModal} />
      </DetailWrapper>
      <Modal style={{ width: '100%', margin: 0 }} isVisible={visibleInput === 'Tags'} onBackButtonPress={handleCloseBtn} hideModalContentWhileAnimating={true} useNativeDriver={true}>
        <ModalEvaluation>
          <ModalEvaluation.Header>
            <ModalEvaluation.Top>
              <ModalEvaluation.CloseButton onPress={handleCloseBtn}>
                <CloseIcon style={{ fill: '#222' }} />
              </ModalEvaluation.CloseButton>
            </ModalEvaluation.Top>
            <ModalEvaluation.Bottom>
              <ModalEvaluation.Title>작업공간으로{'\n'}적절한 태그를 선택해주세요!</ModalEvaluation.Title>
            </ModalEvaluation.Bottom>
          </ModalEvaluation.Header>
          <SetTags preferTags={selectPreferTags} onToggleTag={handleToggleTag} />
          <ModalEvaluation.SubmitButton
            onPress={handleSubmitBtn}
            style={css`
              background-color: ${isEmpty(preferTags) && isEmpty(selectPreferTags) ? '#cccccc' : '#ffbb44'};
            `}>
            <ModalEvaluation.Text>
              {isEmpty(preferTags) && isEmpty(selectPreferTags) ? '태그가 선택되지 않았어요.' : `태그 ${selectPreferTags ? selectPreferTags.length : preferTags.length}개 선택! 평가 등록하기`}
            </ModalEvaluation.Text>
          </ModalEvaluation.SubmitButton>
        </ModalEvaluation>
      </Modal>
      <Modal
        style={{ width: '100%', margin: 0 }}
        backdropOpacity={0}
        isVisible={visibleInput === 'Comments'}
        onBackButtonPress={handleCloseBtn}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        onModalShow={() => inputRef.current.focus()}>
        <InputComment onSetCommentText={handleSetCommentText} inputRef={inputRef} />
      </Modal>
    </>
  );
};

Detail.defaultProps = {
  distance: '2.2km',
  like: 23,
  userPreferTags: ['CLEAN_TOILET', 'STUDY_ROOM', 'VARIOUS_DESSERTS', 'SMOKING'],
};

export default observer(Detail);
