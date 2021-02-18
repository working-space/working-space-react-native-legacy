import React from 'react';
import ConcentIcon from '~/assets/icons/icon_concent.svg';
import TwentyFourIcon from '~/assets/icons/icon_24h.svg';

const TAG = {
  CONCENT: {
    name: '콘센트가 있는',
    icon: <ConcentIcon />,
  },
  QUIET: {
    name: '분위기가 조용한',
  },
  PARKING_LOT: {
    name: '주차장이 있는',
  },
  CLEAN_TOILET: {
    name: '화장실이 깨끗한',
  },
  TWENTY_FOUR: {
    name: '24시간 열린',
    icon: <TwentyFourIcon />,
  },
  STUDY_ROOM: {
    name: '스터디룸이 있는',
  },
  VARIOUS_DESSERTS: {
    name: '디저트가 다양한',
  },
  SMOKING: {
    name: '흡연구역이 마련된',
  },
  TIME_LIMIT: {
    name: '시간제한이 있는',
  },
  MANY_SEATS: {
    name: '빈자리가 많은',
  },
  FAST_WIFI: {
    name: '와이파이가 빠른',
  },
  FLUFFY_CHAIR: {
    name: '의자가 푹신한',
  },
};

export default TAG;
