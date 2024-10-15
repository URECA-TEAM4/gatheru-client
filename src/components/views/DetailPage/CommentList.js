import React from "react";
import UserIcon from "../../constants/userIcon";
import { Box, Typography } from "@mui/material";
import Replies from "./Replies";

function CommentList(props) {
  const comments = props.displayComments;

  return (
    <>
      {comments.map((comment) => {
        return (
          <Box key={comment._id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 1,
                width: "100%",
              }}
              key={comment._id}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <UserIcon />
                <Typography sx={{ mx: 1, fontSize: 13, fontWeight: "bold" }}>
                  {comment.writer}
                </Typography>
                <Typography sx={{ mx: 1, fontSize: 15 }}>
                  {comment.content}
                </Typography>
              </Box>

              <Typography
                sx={{
                  mx: 1,
                  fontSize: 12,
                  color: "gray",
                  textAlign: "right",
                }}
              >
                {new Date(comment.createdAt).toLocaleString()}
              </Typography>
            </Box>
            <Replies comment={comment} postId={props.postId} />
          </Box>
        );
      })}
    </>
  );
}

export default CommentList;
