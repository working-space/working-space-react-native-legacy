import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { Container, Header, Item, SubmitButton } from './SelectModal.styles';

import RadioOnIcon from '~/assets/icons/icon_radio_on.svg';
import RadioOffIcon from '~/assets/icons/icon_radio_off.svg';

const SelectModal = (props) => {
  const { cafes, isVisible, onToggle, onSubmit } = props;
  const [selectedCafe, setSelectedCafe] = useState(null);

  useEffect(() => {
    setSelectedCafe(cafes[0]);
  }, [cafes]);

  return (
    <Modal isVisible={isVisible} onBackdropPress={onToggle} backdropOpacity={0.1}>
      <Container>
        <Header>
          <Header.Text>카페를 선택해주세요</Header.Text>
        </Header>
        {cafes.map((cafe) => {
          const { id, name } = cafe;

          return (
            <Item key={id} onPress={() => setSelectedCafe(cafe)}>
              {selectedCafe === cafe ? <RadioOnIcon /> : <RadioOffIcon />}
              <Item.Text>{name}</Item.Text>
            </Item>
          );
        })}
        <SubmitButton onPress={() => onSubmit(selectedCafe)}>
          <SubmitButton.Text>완료</SubmitButton.Text>
        </SubmitButton>
      </Container>
    </Modal>
  );
};

export default SelectModal;
