import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { appSelectors } from 'optionsCore';

export const MainTab = () => {
  const tab = useSelector(appSelectors.getTab);

  return (
    <Box hidden={tab !== 0} sx={{ p: 3 }}>
      <Typography>
        Почта разработчика: <Link href="mailto:shershnev942@gmail.com">shershnev942@gmail.com</Link>
      </Typography>
      {/* <Typography>
        Telegramm: <Link href="https://t.me/anshersh">anshersh</Link>
      </Typography> */}
    </Box>
  );
};
