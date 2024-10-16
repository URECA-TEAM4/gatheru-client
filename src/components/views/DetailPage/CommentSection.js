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

function CommentSection(props) {
  const [userName, setUserName] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const [postComments, setPostComments] = useState([]);
  const user = useSelector((state) => state.user);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (user.userData && user.userData.isAuth !== undefined) {
      setUserName(user.userData.name);
    }
  }, [user.userData]);

  useEffect(() => {
    axios
      .get(`/api/comments/${props.postId}`)
      .then((res) =>
        /* 대댓글 필터아웃 */
        setPostComments(res.data.filter((comment) => !comment.responseTo))
      )
      .catch((err) => console.log(err));
  }, [state]);

  const onSubmit = (e) => {
    const commentData = {
      content: commentValue,
      writerId: user.userData._id,
      writer: user.userData.name,
      postId: props.postId,
    };

    axios
      .post("/api/comments/save", commentData)
      .then((response) => {
        if (response.status === 200) setState(!state);
      })
      .catch(function (error) {
        console.log(error);
      });

    setCommentValue("");
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
        <UserIcon />{" "}
        <Typography sx={{ mx: 1, fontSize: 15 }}>{userName}</Typography>
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

      <CommentList displayComments={postComments} />
    </>
  );
}

export default CommentSection;
