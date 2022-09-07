import React, { FunctionComponent, useContext, useState, useEffect, useCallback, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import styled from 'styled-components';

import UserContext from '../providers/users';
import { createUser, editUser } from '../api/user';

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    background-color: #414d59;
    color: white;
  }
`;

const FormContainer = styled.div``;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  width: 200px;
  margin-right: 50px;
  font-size: 20px;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  text-align: left;
  display: inline-block;
  position: relative;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  > div {
    border-radius: 10px;
    color: white;
  }
`;

const StyledDialogActions = styled(DialogActions)`
  > button {
    color: white;
  }
`;

interface Props {
  open: boolean;
  handleClose: () => void;
  isEdit?: boolean;
  id?: string;
}

const UserModal: FunctionComponent<Props> = ({ open, handleClose, isEdit, id }) => {
  const { store, dispatch } = useContext(UserContext);
  const initialState = {
    id: '',
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    status: '',
    createdOn: new Date(),
  }

  const [user, setUser] = useState(initialState);

  useEffect(() => {
    if (isEdit) {
      const selectedUser = store.userList.find(u => u.id === id);
      if (selectedUser) setUser(selectedUser);
    } else {
      setUser({
        id: '',
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        status: '',
        createdOn: new Date(),
      });
    }
  }, [id, store.userList, isEdit]);

  const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [key]: e.target.value,
    })
  }

  const handleClick = () => {
    if (isEdit) editUser(user, dispatch);
    else createUser({...user, id: Math.random().toString(16).slice(2)}, dispatch);
    handleClose();
  }

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="scroll-dialog-title">{isEdit ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent dividers>
        <FormContainer>
          <FieldContainer>
            <Label>User ID:</Label>
            <StyledTextField placeholder='Input User ID' label='User ID' value={user?.userId} onChange={handleChange('userId')}/>
          </FieldContainer>
          <FieldContainer>
            <Label>First Name:</Label>
            <StyledTextField placeholder='Input First Name' label='First Name' value={user?.firstName} onChange={handleChange('firstName')} />
          </FieldContainer>
          <FieldContainer>
            <Label>Last Name:</Label>
            <StyledTextField placeholder='Input Last Name' label='Last Name' value={user?.lastName} onChange={handleChange('lastName')}/>
          </FieldContainer>
          <FieldContainer>
            <Label>Email:</Label>
            <StyledTextField placeholder='Input Email' label='Email' value={user?.email} onChange={handleChange('email')}/>
          </FieldContainer>
          <FieldContainer>
            <Label>Status:</Label>
            <StyledTextField placeholder='Input Status' label='Status' value={user?.status} onChange={handleChange('status')}/>
          </FieldContainer>
        </FormContainer>
      </DialogContent>
      <StyledDialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClick}>{isEdit ? 'Edit' : 'Create'}</Button>
      </StyledDialogActions>
    </StyledDialog>
  )
}

export default UserModal;