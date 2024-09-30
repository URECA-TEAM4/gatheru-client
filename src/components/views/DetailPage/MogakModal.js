import React, { useEffect, useState } from 'react'
import {
    TextField,
    Modal,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    Box,
  } from '@mui/material'
import { secondary_color } from '../../constants/colors';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { updateMogakoPost } from '../../_actions/post_action';
import { useDispatch } from 'react-redux';

function MogakModal({ open, handleClose, onUpdateSuccess }) {
    const dispatch = useDispatch();

    const { type, postId } = useParams()
    const [editedTitle, setEditedTitle] = useState('')

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`/api/mogakos/${postId}`)
            setEditedTitle(response.data.title); // 가져온 데이터를 수정 가능한 상태로 설정
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, [type, postId]);
    

      const onClickUpdate = () => {
        const body = {
          postId: postId,
          title: editedTitle,
        };
        dispatch(updateMogakoPost(body)).then(res => {
          if (res.payload.success) {
            onUpdateSuccess(editedTitle); // 상위 컴포넌트로 업데이트된 제목 전달
            handleClose();
        } else {
            alert('글 수정에 실패했습니다.');
          }
        });
      };

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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <TextField
          label="제목"
          variant="outlined"
          fullWidth
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
          required
          sx={{ mb: 3 }}
        />
        <Button
          type="submit"
          onClick={onClickUpdate} // 이 부분에서 전달된 onSubmit 함수 호출
          variant="contained"
          sx={{
            borderRadius: 2,
            backgroundColor: secondary_color,
            fontWeight: 700,
            display: 'block',
            margin: '20px auto',
          }}
        >
          확인
        </Button>
      </Box>
    </Modal>
  );
}

export default MogakModal;
