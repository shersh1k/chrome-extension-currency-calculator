import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  handleClose: () => void;
}

export const CloseButton: React.FC<IProps> = ({ handleClose }) => {
  const handlePropagation = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <Tooltip placement="top" slotProps={{ popper: { disablePortal: true } }} title="Закрыть">
      <IconButton
        color="secondary"
        size="small"
        onClick={handleClose}
        onMouseDown={handlePropagation}
        onMouseUp={handlePropagation}
      >
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
};
