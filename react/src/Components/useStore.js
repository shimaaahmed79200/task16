import create from 'zustand';

const useStore = create((set) => ({
  posts: [
    {
      id: 1,
      userProfilePicture: '../../../public/assets/image-amyrobson.webp', 
      text:'Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You\'ve nailed the design and the responsiveness at various breakpoints works really well',
      time: '1 month ago', 
      Likes: 350,
      comments: []
    },
    {
      id: 2,
      userProfilePicture: '../../../public/assets/image-maxblagun.webp',
      time: '2 weeks ago',
      text: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      Likes: 150,
      comments: [
        {
          id: 1,
          userProfilePicture: '../../../public/assets/image-ramsesmiron.webp',
          time: '5 hours ago',
          Likes: 17,
          user:'@maxblagun',
          text: " If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          replies: [
            {
              id: 2,
              time: '2 minutes ago',
              user:'@ramsesmiron',
              userProfilePicture: '../../../public/assets/image-juliusomo.webp',
              text: " I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/ framework. But the fundamentals are what stay constant."
            }
          ]
        }
      ]
    }
  ],
  addPost: (post) => set((state) => ({
    posts: [...state.posts, post]
  })),

  deletePost: (postId) => set((state) => ({
    posts: state.posts.filter(post => post.id !== postId)
  })),

  incrementLikes: (postId) => set((state) => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? { ...post, Likes: (post.Likes || 0) + 1 }
        : post
    )
  })),

  decrementLikes: (postId) => set((state) => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? { ...post, Likes: (post.Likes || 0) > 0 ? (post.Likes || 0) - 1 : 0 }
        : post
    )
  })),

  incrementLikesComments: (commentId) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === commentId
        ? { ...comment, Likes: (comment.Likes || 0) + 1 }
        : comment
    )
  })),

  decrementLikesComments: (commentId) => set((state) => ({
    comments: state.comments.map(comment =>
      comment.id === commentId
        ? { ...comment, Likes: (comment.Likes || 0) > 0 ? (comment.Likes || 0) - 1 : 0 }
        : comment
    )
  })),

  addComment: (postId, comment) => set((state) => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    )
  })),
  deleteComment: (postId, commentId) => set((state) => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? { ...post, comments: post.comments.filter(comment => comment.id !== commentId) }
        : post
    )
  })),
  editComment: (postId, commentId, text) => set((state) => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId ? { ...comment, text } : comment
            )
          }
        : post
    )
  })),
  replyComment: (postId, commentId, reply) => set((state) => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, replies: [...(comment.replies || []), reply] }
                : comment
            )
          }
        : post
    )
  })),
  editReply: (postId, commentId, replyId, newText) => set((state) => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? {
                    ...comment,
                    replies: comment.replies.map(reply =>
                      reply.id === replyId
                        ? { ...reply, text: newText }
                        : reply
                    )
                  }
                : comment
            )
          }
        : post
    )
  })),
  deleteReply: (postId, commentId, replyId) => set((state) => ({
    posts: state.posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? {
                    ...comment,
                    replies: comment.replies.filter(reply => reply.id !== replyId)
                  }
                : comment
            )
          }
        : post
    )
  })),


}));

export default useStore;

