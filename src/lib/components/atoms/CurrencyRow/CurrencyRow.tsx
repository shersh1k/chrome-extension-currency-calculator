import Box from '@mui/material/Box';

export const CurrencyRow: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px',
        borderBottom: 2,
        borderColor: 'divider',
      }}
    >
      {children}
    </Box>
  );
};
