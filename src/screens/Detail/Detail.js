import React, { useState, useCallback, useRef } from 'react';
import { Share } from 'react-native';
import Modal from 'react-native-modal';
import { css } from '@emotion/native';
import { isEmpty } from 'lodash';
import { useFetchDetailCafeData, useFetchCommentsList } from '~hooks/useDetailData';
import api from '../../api';

import { DetailWrapper, ErrorWrapper, LinkIconWrapper, ModalEvaluation } from './Detail.styles';
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
import CommentOptionModal from '~/components/CommentOptionModal/CommentOptionModal';
import BackIcon from '~/assets/icons/icon_back.svg';
import ShareIcon from '~/assets/icons/icon_share.svg';
import FavoriteIcon from '~/assets/icons/icon_favorite.svg';
import FavoriteFillIcon from '~/assets/icons/icon_favorite_fill.svg';
import BookmarkIcon from '~/assets/icons/icon_bookmark.svg';
import BookmarkFillIcon from '~/assets/icons/icon_bookmark_fill.svg';
import CloseIcon from '~/assets/icons/icon_close.svg';
import useSelectedTags from '../../hooks/useSelectedTags';
import ErrorBox from '../../components/ErrorBox/ErrorBox';
import useGeolocation from '../../hooks/useGeolocation';

const Detail = ({ userId, route, navigation }) => {
  const { cafeId } = route.params;

  const { geolocation } = useGeolocation();
  const { latitude, longitude } = geolocation;

  const {
    detailCafeData,
    cafeLikeCount,
    userPreferredTagsData,
    userToggleLikeCount,
    userToggleBookmarkCount,
    userCommentsData,
    isDetailCafeDataLoading,
    isDetailCafeDataValidating,
    isDetailCafeDataError,
  } = useFetchDetailCafeData(cafeId, userId, latitude, longitude);

  const { comments, commentsListData, hasNextComments, isCommentsLoading, isCommentsError } = useFetchCommentsList(cafeId);
  const [visibleInput, setVisibleInput] = useState(null);
  const [preferredTags, setPreferredTags] = useState(userPreferredTagsData);
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const { selectedTags, setSelectedTags, toggleTag } = useSelectedTags(userPreferredTagsData);
  const inputRef = useRef(null);

  const handleToggleLikeButton = useCallback(() => {
    console.log('Change Like');
  }, []);

  const handleToggleBookmarkButton = useCallback(async () => {
    if (userToggleBookmarkCount.data) {
      await api
        .delete(`/bookmarks/${cafeId}_${userId}/`)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    } else {
      await api
        .post('/bookmarks/', {
          id: `${cafeId}_${userId}`,
          cafe_id: cafeId,
          user_id: userId,
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    }
    userToggleBookmarkCount.mutate();
  }, [cafeId, userId, userToggleBookmarkCount]);

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
      console.log(error.message);
    }
  };

  const handleSetTagsModal = useCallback(() => {
    setVisibleInput('Tags');
  }, []);

  const handleSetCommentText = useCallback(
    async (text) => {
      handleCloseBtn();
      await api.post('/comments/', {
        id: `${cafeId}_${userId}`,
        cafe_id: cafeId,
        user_id: userId,
        content: text,
      });
      commentsListData.mutate();
    },
    [cafeId, userId, handleCloseBtn, commentsListData],
  );

  const handleSetCommentTextModal = useCallback(() => {
    setVisibleInput('Comments');
  }, []);

  const handleDeleteComment = useCallback(async () => {
    handleCloseBtn();
    await api.delete(`/comments/${currentCommentId}`);
    commentsListData.mutate();
  }, [currentCommentId, handleCloseBtn, commentsListData]);

  const handleCommentOptionModal = useCallback((commentId) => {
    setVisibleInput('CommentOption');
    setCurrentCommentId(commentId);
  }, []);

  const handleSubmitBtn = () => {
    setVisibleInput(null);
    setPreferredTags([...selectedTags]);
  };

  const handleCloseBtn = useCallback(() => {
    setVisibleInput(null);
    setCurrentCommentId(null);
    setSelectedTags([...preferredTags]);
  }, [preferredTags, setSelectedTags]);

  if (isDetailCafeDataError || isCommentsError) {
    return (
      <ErrorWrapper>
        <Header
          showBorderBottom={true}
          left={
            <Header.Button onPress={() => navigation.goBack()}>
              <BackIcon />
            </Header.Button>
          }
        />
        <ErrorBox>
          <ErrorBox.Heading>앗!</ErrorBox.Heading>
          <ErrorBox.Message>카페 정보를 불러오지 못했어요!</ErrorBox.Message>
        </ErrorBox>
      </ErrorWrapper>
    );
  }

  if (detailCafeData.data === null || isDetailCafeDataLoading || isDetailCafeDataValidating) {
    return <LoadingBar />;
  }

  const [cafeLongitude, cafeLatitude] = detailCafeData.data?.location.coordinates;

  return (
    <>
      <Header
        showBorderBottom={true}
        left={
          <Header.Button onPress={() => navigation.goBack()}>
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
        <DetailTitle title={detailCafeData.data.name} distance={`${Math.floor(detailCafeData.data?.dist?.calculated)}m`} tags={detailCafeData.data.tags} />
        <ImageGrid title={detailCafeData.data.name} distance={`${Math.floor(detailCafeData.data?.dist?.calculated)}m`} tags={detailCafeData.data.tags} />
        <DetailInfo address={detailCafeData.data.parcel_addr} phone={detailCafeData.data.phone} />
        <DetailLocation latitude={cafeLatitude} longitude={cafeLongitude} />
        <TagList tags={detailCafeData.data.tags} preferTags={preferredTags} onSetTagsModal={handleSetTagsModal} />
        <CommentList
          comments={comments}
          commentsCount={commentsListData.data[0]?.count}
          hasNextComments={hasNextComments}
          userComments={userCommentsData.data}
          isCommentsLoading={isCommentsLoading}
          onSetCommentTextModal={handleSetCommentTextModal}
          onCommentOptionModal={handleCommentOptionModal}
          onMoreCommentsButtonClick={() => {
            commentsListData.setSize(commentsListData.size + 1);
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
      <Modal
        style={{ width: '100%', margin: 0 }}
        backdropOpacity={0.3}
        onBackButtonPress={handleCloseBtn}
        isVisible={visibleInput === 'CommentOption'}
        hideModalContentWhileAnimating={true}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver={true}>
        <CommentOptionModal onDeleteComment={handleDeleteComment} />
      </Modal>
    </>
  );
};

Detail.defaultProps = {
  userId: 'jiwon3',
};

export default Detail;
