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
    name: '콘센트가 있는',
    icon: <ConcentIcon />,
  },
  QUIET: {
    name: '분위기가 조용한',
    icon: <QuietIcon />,
  },
  PARKING_LOT: {
    name: '주차장이 있는',
    icon: <ParkingLotIcon />,
  },
  CLEAN_TOILET: {
    name: '화장실이 깨끗한',
    icon: <ToiletIcon />,
  },
  TWENTY_FOUR: {
    name: '24시간 열린',
    icon: <TwentyFourIcon />,
  },
  STUDY_ROOM: {
    name: '스터디룸이 있는',
    icon: <StudyIcon />,
  },
  VARIOUS_DESSERTS: {
    name: '디저트가 다양한',
    icon: <DessertIcon />,
  },
  SMOKING: {
    name: '흡연구역이 마련된',
    icon: <SmokingIcon />,
  },
  TIME_LIMIT: {
    name: '시간제한이 있는',
    icon: <TimerIcon />,
  },
  MANY_SEATS: {
    name: '빈자리가 많은',
    icon: <SeatIcon />,
  },
  FAST_WIFI: {
    name: '와이파이가 빠른',
    icon: <WifiIcon />,
  },
  FLUFFY_CHAIR: {
    name: '의자가 푹신한',
    icon: <ChairIcon />,
  },
};

export default TAG;
