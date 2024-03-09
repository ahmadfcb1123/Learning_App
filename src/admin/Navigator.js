import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';

const categories = [
  {
    id: 'Questions',
    children: [
      { id: 'ListeningQuestion', icon: <PermMediaOutlinedIcon /> },
      { id: 'WritingQuestion', icon: <PublicIcon /> },
      { id: 'ReadingQuestion', icon: <SettingsEthernetIcon /> },
      { id: 'GrammarQuestion', icon: <SettingsInputComponentIcon /> },
      { id: 'SpeakingQuestion', icon: <PhonelinkSetupIcon /> },
    ],
  },
  {
    id: 'chapters',
    children: [
      { id: 'Chapters', icon: <DnsRoundedIcon />,},
      { id: 'Vocabulary', icon: <SettingsIcon /> },
      { id: 'Grammar', icon: <TimerIcon /> },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const navigate = useNavigate();

  const handleChapterClick = (childId) => {
    const path = `/${childId.toLowerCase()}-page`;
    navigate(path,{state:{SkillType:childId}});
  };


  const goHome = ()=>
  {
    navigate("/admin");
  }

  return (
    <Drawer variant="permanent" {...props} >
      <List disablePadding style={{backgroundColor:"#1b2037"}}>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          Admin
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText onClick={goHome}>Home</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item} onClick={() => handleChapterClick(childId)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 9.9 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}