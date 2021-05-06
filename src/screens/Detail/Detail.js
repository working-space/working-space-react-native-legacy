import React, { useState, useCallback, useRef } from 'react';
import { Share } from 'react-native';
import Modal from 'react-native-modal';
import { css } from '@emotion/native';
import { isEmpty } from 'lodash';
import useStore from '~hooks/useStore';
import { useFetchDetailCafeData, useFetchCommentsList } from '~hooks/useDetailData';
import api from '../../api';

import { DetailWrapper, LinkIconWrapper, ModalEvaluation } from './Detail.styles';
import Header from '~/components/Header/Header';
import DetailTitle from '~/components/DetailInfo/DetailTitle';
import DetailInfo from '~/components/DetailInfo/DetailInfo';
import DetailLocation from '~/components/DetailInfo/DetailLocation';
import TagList from '~/components/TagList/TagList';
import CommentList from '~/components/CommentList/CommentList';
import ImageGrid from '~/components/ImageGrid/ImageGrid';
import SetTags from '~/components/SetTags/SetTags';
import InputText from '~/components/InputText/InputText';
import LoadingBar from '~/components/LoadingBar/LoadingBar';
import BackIcon from '~/assets/icons/icon_back.svg';
import ShareIcon from '~/assets/icons/icon_share.svg';
import FavoriteIcon from '~/assets/icons/icon_favorite.svg';
import FavoriteFillIcon from '~/assets/icons/icon_favorite_fill.svg';
import BookmarkIcon from '~/assets/icons/icon_bookmark.svg';
import BookmarkFillIcon from '~/assets/icons/icon_bookmark_fill.svg';
import CloseIcon from '~/assets/icons/icon_close.svg';
import useSelectedTags from '../../hooks/useSelectedTags';

const Detail = ({ userId, route, navigation: { goBack } }) => {
  const { cafeId } = route.params;
  const { GeoLocationStore } = useStore();
  const { currentLocation } = GeoLocationStore;
  const { latitude, longitude } = currentLocation;

  const [visibleInput, setVisibleInput] = useState(null);
  const [preferredTags, setpreferredTags] = useState(userPreferredTags);
  const { selectedTags, setSelectedTags, toggleTag } = useSelectedTags(userPreferredTags);
  const inputRef = useRef(null);

  const { detailCafeData, cafeLikeCount, userPreferredTags, userToggleLikeCount, userToggleBookmarkCount, userCommentsData, isDetailCafeDataLoading, isDetailCafeDataError } = useFetchDetailCafeData(
    cafeId,
    userId,
    latitude,
    longitude,
  );
  const { comments, hasNextComments, isCommentsLoading, isCommentsError } = useFetchCommentsList(cafeId);

  const handleToggleLikeButton = useCallback(() => {
    console.log('Change Like');
  }, []);

  const handleToggleBookmarkButton = useCallback(() => {
    api
      .post('/bookmarks/', {
        id: `${cafeId}_${userId}`,
        cafe_id: cafeId,
        user_id: userId,
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, [cafeId, userId]);

  const handleShareButton = async () => {
    try {
      const result = await Share.share({
        title: detailCafeData.data.name,
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

  const handleSetTagsModal = useCallback(() => {
    setVisibleInput('Tags');
  }, []);

  const handleSetCommentText = useCallback(async (text) => {
    await console.log(text);
    await setVisibleInput(null);
  }, []);

  const handleSetCommentTextModal = useCallback(() => {
    setVisibleInput('Comments');
  }, []);

  const handleSubmitBtn = () => {
    setVisibleInput(null);
    setpreferredTags([...selectedTags]);
  };

  const handleCloseBtn = () => {
    setVisibleInput(null);
    setSelectedTags([...preferredTags]);
  };

  if (isDetailCafeDataError || isCommentsError) {
    return <div>에러가 발생했습니다. 다시 시도해주세요!</div>;
  }

  if (detailCafeData.data === null || isDetailCafeDataLoading) {
    return <LoadingBar />;
  }

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
            <LinkIconWrapper.Item onPress={handleToggleLikeButton}>
              {userToggleLikeCount.data ? <FavoriteFillIcon width="24" height="24" /> : <FavoriteIcon width="24" height="24" />}
              <LinkIconWrapper.Text>{cafeLikeCount.data}</LinkIconWrapper.Text>
            </LinkIconWrapper.Item>
            <LinkIconWrapper.Item onPress={handleToggleBookmarkButton}>
              {userToggleBookmarkCount.data ? <BookmarkFillIcon width="24" height="24" /> : <BookmarkIcon width="24" height="24" />}
            </LinkIconWrapper.Item>
            <LinkIconWrapper.Item onPress={handleShareButton}>
              <ShareIcon width="24" height="24" />
            </LinkIconWrapper.Item>
          </LinkIconWrapper>
        }
      />
      <DetailWrapper>
        <DetailTitle title={detailCafeData.data.name} distance={`${Math.floor(detailCafeData.data.dist.calculated)}m`} tags={detailCafeData.data.tags} />
        <ImageGrid title={detailCafeData.data.name} distance={`${Math.floor(detailCafeData.data.dist.calculated)}m`} tags={detailCafeData.data.tags} />
        <DetailInfo address={detailCafeData.data.parcel_addr} phone={detailCafeData.data.phone} />
        <DetailLocation />
        <TagList tags={detailCafeData.data.tags} preferTags={preferredTags} onSetTagsModal={handleSetTagsModal} />
        <CommentList
          comments={comments}
          hasNextComments={hasNextComments}
          userComments={userCommentsData.data}
          isCommentsLoading={isCommentsLoading}
          onSetCommentTextModal={handleSetCommentTextModal}
          onMoreCommentsButtonClick={() => {
            console.log('pageIndex +1');
          }}
        />
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
          <SetTags preferTags={selectedTags} onToggleTag={toggleTag} />
          <ModalEvaluation.SubmitButton
            onPress={handleSubmitBtn}
            style={css`
              background-color: ${isEmpty(preferredTags) && isEmpty(selectedTags) ? '#cccccc' : '#ffbb44'};
            `}>
            <ModalEvaluation.Text>
              {isEmpty(preferredTags) && isEmpty(selectedTags) ? '태그가 선택되지 않았어요.' : `태그 ${selectedTags ? selectedTags.length : preferredTags.length}개 선택! 평가 등록하기`}
            </ModalEvaluation.Text>
          </ModalEvaluation.SubmitButton>
        </ModalEvaluation>
      </Modal>
      <Modal
        style={{ width: '100%', margin: 0 }}
        backdropOpacity={0.3}
        isVisible={visibleInput === 'Comments'}
        onBackButtonPress={handleCloseBtn}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}
        onModalShow={() => inputRef.current.focus()}>
        <InputText usage="comment" onSetInputText={handleSetCommentText} inputRef={inputRef} />
      </Modal>
    </>
  );
};

Detail.defaultProps = {
  userId: 'jiwon',
};

export default Detail;
