import React, { useEffect, useState } from 'react'
import Post from './Post'
import axios from 'axios'

function PostList(props) {
  const [posts, setPosts] = useState([])
  let endpoints = ['/api/mogakos/get', '/api/studyContests/get']

  const recruitingClosed = post => {
    let datetime = post.type == 'mogako' ? post.datetime : post.deadline
    return (
      Date.now() > new Date(datetime) || post.registeredNum == post.maximumNum
    )
  }

  const recruiting = post => {
    let datetime = post.type == 'mogako' ? post.datetime : post.deadline
    return (
      Date.now() < new Date(datetime) && post.registeredNum < post.maximumNum
    )
  }

  useEffect(() => {
    axios
      .all(endpoints.map(endpoint => axios.get(endpoint)))

      .then(function (response) {
        let combinedPosts = response[0].data.concat(response[1].data)
        if (props.sorting == '최신순')
          combinedPosts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          )
        else
          combinedPosts.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
          )

        if (props.pastDeadline == 'all') {
          setPosts(combinedPosts)
        } else if (props.pastDeadline) {
          setPosts(combinedPosts.filter(recruitingClosed))
        } else {
          setPosts(combinedPosts.filter(recruiting))
        }
      })

      .catch(function (error) {
        console.log(error)
      })
  }, [props.sorting, props.gatheringType])

  return (
    <>
      {posts.map(post => {
        return (
          props.gatheringType.includes(post.type) && (
            <Post
              key={post.title}
              id={post._id}
              postType={post.type}
              title={post.title}
              content={post.content}
              location={post.location}
              registeredNum={post.registeredNum}
              maximumNum={post.maximumNum}
              datetime={post.type == 'mogako' ? post.datetime : post.deadline}
              method={post.type != 'mogako' ? post.method : ''}
            />
          )
        )
      })}
    </>
  )
}

export default PostList
