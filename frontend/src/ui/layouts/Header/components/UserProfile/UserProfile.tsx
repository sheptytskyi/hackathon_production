import { FC } from 'react';
import useProfile from '@hooks/useProfile.ts';
import {
  Box,
  Divider,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import { AccountCircle, Logout } from '@mui/icons-material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import useLogout from '@hooks/useLogout.ts';
import { Link } from 'react-router-dom';
import { Routes } from '@router';

const UserProfile: FC = () => {
  const [{ isLogged, first_name = 'User' }] = useProfile();
  const handleLogout = useLogout();

  if (!isLogged) return <Box width={60} />;

  return (
    <PopupState variant="popover" popupId="popup-popover">
      {(popupState) => (
        <div>
          <Stack
            gap={2}
            flexDirection="row"
            alignItems="center"
            sx={{ cursor: 'pointer' }}
            {...bindTrigger(popupState)}
          >
            <Typography color="common.black">{first_name}</Typography>
            <AccountCircle sx={{ color: 'primary.main' }} />
          </Stack>

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem
              component={Link}
              to={Routes.Profile}
              onClick={popupState.close}
            >
              <AssignmentIndIcon fontSize="small" />
              Мій кабінет
            </MenuItem>

            <Divider />

            <MenuItem
              sx={{ color: 'error.main' }}
              onClick={() => {
                handleLogout();
                popupState.close();
              }}
            >
              <Logout fontSize="small" />
              Вийти
            </MenuItem>
          </Popover>
        </div>
      )}
    </PopupState>
  );
};

export default UserProfile;
