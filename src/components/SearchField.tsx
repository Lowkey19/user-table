import React, { ChangeEvent, KeyboardEvent, FunctionComponent, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchBar = styled.input`
  width: 250px;
  height: 30px;
  padding-left: 10px;
  border-radius: 6px;
  border: 1px solid gray;
  margin-left: 15px;
`;

interface Props {
  onChange?: (s: string) => void;
  onEnterPress?: () => void;
}

const SearchField: FunctionComponent<Props> = ({ onChange, onEnterPress }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (typeof onChange === 'function') onChange(e.target.value);
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (typeof onEnterPress === 'function') onEnterPress();
    }
  }

  return (
    <Container>
      <SearchBar
        type={'text'}
        value={searchText}
        placeholder={'Grid Filter'}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </Container>
  )
}

export default SearchField;