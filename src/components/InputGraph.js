import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const InputGraph = () => {
  //   const [data, setData] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function Levels() {
    let response;
    let responseJson;
    try {
      response = await fetch(
        'http://fews.ideam.gov.co/colombia/jsonH/0021209920Hobs.json'
      );
      responseJson = await response.json();
      //   setData(responseJson.data.split(','));
    } catch (error) {
      console.error(error);
    }
    console.log(responseJson);
  }
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Button
        onClick={() => {
          Levels();
        }}
      >
        view data
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default InputGraph;
