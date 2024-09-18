import React, { useEffect, useState } from 'react'
import Post from './Post'
import axios from 'axios'

function pastDeadline(post) {
  let datetime = post.type == 'mogako' ? post.datetime : post.deadline
  return Date.now() > new Date(datetime)
}

function beforeDeadline(post) {
  let datetime = post.type == 'mogako' ? post.datetime : post.deadline
  return Date.now() < new Date(datetime)
}

function PostList(props) {
  const [posts, setPosts] = useState([])
  let endpoints = ['/api/mogakos/get', '/api/studyContests/get']

  useEffect(() => {
    axios
      .all(endpoints.map(endpoint => axios.get(endpoint)))

      .then(function (response) {
        let combinedPosts = response[0].data.concat(response[1].data)
        combinedPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        )

        if (props.pastDeadline == 'all') {
          setPosts(combinedPosts)
        } else if (props.pastDeadline) {
          setPosts(combinedPosts.filter(pastDeadline))
        } else {
          setPosts(combinedPosts.filter(beforeDeadline))
        }
      })

      .catch(function (error) {
        console.log(error)
      })
  }, [])

  return (
    <>
      {posts.map(post => {
        return (
          <Post
            key={post.title}
            postType={post.type}
            title={post.title}
            content={post.content}
            location={post.location}
            datetime={post.type == 'mogako' ? post.datetime : post.deadline}
            method={post.type != 'mogako' ? post.method : ''}
          />
        )
      })}
    </>
  )
}

export default PostList
