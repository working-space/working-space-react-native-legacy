import styled from '@emotion/native';

export const SkeletonUIWrapper = styled.View``;

export const SkeletonUIBox = styled.View`
  flex-direction: column;
  padding: 16px;
  padding-top: 24px;
  border-width: 1px;
  border-style: solid;
  border-color: #e5e5e5;
  border-radius: 4px;
  margin-top: ${({ page }) => (page === 1 ? '0px' : '8px')};
`;

SkeletonUIBox.Box = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

SkeletonUIBox.Box1 = styled.View`
  width: 60%;
  height: 30px;
  background-color: #eee;
  border-radius: 10px;
`;

SkeletonUIBox.Box2 = styled.View`
  width: 20%;
  height: 30px;
  background-color: #eee;
  border-radius: 10px;
`;

SkeletonUIBox.Box3 = styled.View`
  width: 100%;
  height: 20px;
  background-color: #eee;
  border-radius: 10px;
  margin-bottom: 4px;
`;

SkeletonUIBox.Box4 = styled.View`
  width: 80%;
  height: 25px;
  background-color: #eee;
  border-radius: 10px;
  margin-bottom: 20px;
`;

SkeletonUIBox.Box5 = styled.View`
  width: 20%;
  height: 20px;
  background-color: #eee;
  border-radius: 10px;
`;
