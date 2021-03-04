import React from 'react';
import ConcentIcon from '~/assets/icons/icon_concent.svg';
import QuietIcon from '~/assets/icons/icon_quite.svg';
import ParkingLotIcon from '~/assets/icons/icon_parking_lot.svg';
import ToiletIcon from '~/assets/icons/icon_toilet.svg';
import TwentyFourIcon from '~/assets/icons/icon_24h.svg';
import StudyIcon from '~/assets/icons/icon_study.svg';
import DessertIcon from '~/assets/icons/icon_dessert.svg';
import SmokingIcon from '~/assets/icons/icon_smoking.svg';
import TimerIcon from '~/assets/icons/icon_timer.svg';
import SeatIcon from '~/assets/icons/icon_seat.svg';
import WifiIcon from '~/assets/icons/icon_wifi.svg';
import ChairIcon from '~/assets/icons/icon_chair.svg';

const TAG = {
  CONCENT: {
    id: 'concent',
    name: '콘센트가 있는',
    icon: <ConcentIcon />,
  },
  QUIET: {
    id: 'mute',
    name: '분위기가 조용한',
    icon: <QuietIcon />,
  },
  PARKING_LOT: {
    id: 'parking',
    name: '주차장이 있는',
    icon: <ParkingLotIcon />,
  },
  CLEAN_TOILET: {
    id: 'toilet',
    name: '화장실이 깨끗한',
    icon: <ToiletIcon />,
  },
  TWENTY_FOUR: {
    id: 'twentyFour',
    name: '24시간 열린',
    icon: <TwentyFourIcon />,
  },
  STUDY_ROOM: {
    id: 'study',
    name: '스터디룸이 있는',
    icon: <StudyIcon />,
  },
  VARIOUS_DESSERTS: {
    id: 'dessert',
    name: '디저트가 다양한',
    icon: <DessertIcon />,
  },
  SMOKING: {
    id: 'smoking',
    name: '흡연구역이 마련된',
    icon: <SmokingIcon />,
  },
  TIME_LIMIT: {
    id: 'timer',
    name: '시간제한이 있는',
    icon: <TimerIcon />,
  },
  MANY_SEATS: {
    id: 'seat',
    name: '빈자리가 많은',
    icon: <SeatIcon />,
  },
  FAST_WIFI: {
    id: 'wifi',
    name: '와이파이가 빠른',
    icon: <WifiIcon />,
  },
  FLUFFY_CHAIR: {
    id: 'chair',
    name: '의자가 푹신한',
    icon: <ChairIcon />,
  },
};

export default TAG;
