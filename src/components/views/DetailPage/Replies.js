import React, { useState, useEffect } from "react";
import UserIcon from "../../constants/userIcon";
import { useSelector } from "react-redux";
import { Box, Typography, Button, InputBase } from "@mui/material";
import {
  gray_color,
  mute_navy_color,
  secondary_color,
} from "../../constants/colors";
import axios from "axios";
import CommentList from "./CommentList";

function Replies(props) {
  const [userName, setUserName] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [replyComments, setReplyComments] = useState([]);
  const user = useSelector((state) => state.user);
  const [openReply, setOpenReply] = useState(false);
  const [state, setState] = useState(false);

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };

  useEffect(() => {
    if (user.userData && user.userData.isAuth !== undefined) {
      setUserName(user.userData.name);
    }
  }, [user.userData]);

  useEffect(() => {
    axios
      .get(`/api/comments/comment/${props.comment._id}`)
      .then((res) => {
        setReplyComments(res.data);
      })
      .catch((err) => console.log(err));
  }, [state]);

  const onSubmit = (e) => {
    const variables = {
      content: commentValue,
      writerId: user.userData._id,
      writer: user.userData.name,
      postId: props.postId,
      responseTo: props.comment._id,
    };

    axios
      .post("/api/comments/save", variables)
      .then((response) => {
        console.log(response.data);
        setState(!state);
      })
      .catch(function (error) {
        console.log(error);
      });

    setCommentValue("");
  };

  return (
    <Box ml="90px">
      <Box
        onClick={onClickReplyOpen}
        key="comment-basic-reply-to"
        style={{ cursor: "pointer", fontSize: 13, color: "gray" }}
      >
        Reply to
      </Box>

      <CommentList displayComments={replyComments} />

      {openReply && (
        <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
          <UserIcon />{" "}
          <Typography sx={{ mx: 1, fontSize: 13, fontWeight: "bold" }}>
            {userName}
          </Typography>
          <InputBase
            sx={{
              flex: 1,
              border: 1,
              borderColor: gray_color,
              borderRadius: 2,
              fontSize: 15,
              color: mute_navy_color,
              px: 1,
              py: 0.2,
              mx: 1,
            }}
            onChange={(e) => {
              setCommentValue(e.currentTarget.value);
            }}
            value={commentValue}
            placeholder="write a comment!"
          />
          <Button
            variant="outlined"
            sx={{
              borderRadius: 2,
              borderColor: secondary_color,
              color: secondary_color,
            }}
            onClick={onSubmit}
          >
            등록
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Replies;
