import React from 'react';

import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { appSelectors } from 'optionsCore';

export const MainTab = () => {
  const tab = useSelector(appSelectors.getTab);

  return (
    <Box hidden={tab !== 0} p={3}>
      <Typography>
        Почта разработчика: <Link href="mailto:shershnev942@gmail.com">shershnev942@gmail.com</Link>
      </Typography>
      {/* <Typography>
        Telegramm: <Link href="https://t.me/anshersh">anshersh</Link>
      </Typography> */}
    </Box>
  );
};
