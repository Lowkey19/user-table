import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, TableBody, TableHead, TableRow, TableCell, Checkbox, Typography } from '@mui/material';
import NodeAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from '@mui/icons-material/Edit';
import CachedIcon from '@mui/icons-material/Cached';
import DeleteIcon from '@mui/icons-material/Delete';
import ImportExportIcon from '@mui/icons-material/ImportExport';

import { assignSearchKeyWord, deleteUsers, getUserList } from '../api/user';
import { filterUserList } from '../helpers/search';
import UserContext from '../providers/users';
import SearchField from './SearchField';
import UserModal from './UserModal';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 100px;
  background-color: #414d59;
  > table {
    border: 1px solid white;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%
`;

const Title = styled(Typography)`
  font-weight: 700 !important;
  font-size: 20px !important;
  padding: 0 20px;
  color: #a7b5c2;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const IconContainer = styled.div<{ selected?: boolean }>`
  cursor: pointer;
  > svg {
    height: 40px;
    width: 40px;
    margin: 0 15px;
    color: ${({ selected }) => (selected ? 'gray' : '#a7b5c2')};
  }
`;

const StyledTableCell = styled(TableCell)`
  color: #a7b5c2 !important;
`;

const UserTable: FunctionComponent = () => {
  const { store, dispatch } = useContext(UserContext);
  const [users, setUsers] = useState(store.userList);
  const [selected, setSelected] = useState<string[]>([]);

  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);

  useEffect(() => {
    getUserList(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setUsers(store.userList);
  }, [store.userList]);

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleAddUser = () => {
    setOpenAddUser(true);
  }

  const handleEditUser = () => {
    if (selected.length !== 1) return;
    setOpenEditUser(true);
  }

  const handleDeleteUser = () => {
    deleteUsers(selected, dispatch);
  }

  const handleSearch = (s: string) => {
    assignSearchKeyWord(s, dispatch);
  };

  const filteredUsers = filterUserList(store.searchKeyword || '', users)

  return (
    <Container>
      <HeaderContainer>
        <Title>
          User Table
        </Title>
        <ActionContainer>
          <IconContainer onClick={handleAddUser}>
            <NodeAddIcon />
          </IconContainer>
          <IconContainer onClick={handleEditUser} selected={selected.length !== 1}>
            <EditIcon />
          </IconContainer>
          <IconContainer>
            <CachedIcon />
          </IconContainer>
          <IconContainer onClick={handleDeleteUser} selected={selected.length === 0}>
            <DeleteIcon />
          </IconContainer>
          <IconContainer>
            <ImportExportIcon />
          </IconContainer>
          <SearchField onChange={handleSearch} />
        </ActionContainer>
      </HeaderContainer>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#414d59' }}>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={selected.length > 0 && selected.length < users.length}
                checked={users.length > 0 && selected.length === users.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <StyledTableCell>User ID</StyledTableCell>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Created On</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => {
            const isItemSelected = isSelected(user.id);

            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, user.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={user.id}
                selected={isItemSelected}
                style={{ backgroundColor: '#36404a' }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                  />
                </TableCell>
                <StyledTableCell>{user.userId}</StyledTableCell>
                <StyledTableCell>{user.firstName}</StyledTableCell>
                <StyledTableCell>{user.lastName}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.status}</StyledTableCell>
                <StyledTableCell>{new Date(user.createdOn).toDateString()}</StyledTableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <UserModal open={openAddUser} handleClose={() => setOpenAddUser(false)} />
      <UserModal open={openEditUser} handleClose={() => setOpenEditUser(false)} id={selected[0] || ''} isEdit/>
    </Container>
  )
}

export default UserTable