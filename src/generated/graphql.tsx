import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  body: Scalars['String'];
  createdAt: Scalars['String'];
  username: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
  comments: Array<Maybe<Comment>>;
  likes: Array<Maybe<Like>>;
  likeCount: Scalars['Int'];
  commentCount: Scalars['Int'];
  displayname: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  url: Scalars['String'];
};

export type PaginatedPost = {
  __typename?: 'PaginatedPost';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  username: Scalars['String'];
  body: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  username: Scalars['String'];
};

export type RoomChat = {
  __typename?: 'RoomChat';
  id: Scalars['ID'];
  from: Scalars['String'];
  to: Scalars['String'];
  content: Array<Maybe<Chat>>;
};

export type GroupChat = {
  __typename?: 'GroupChat';
  id: Scalars['ID'];
  body: Scalars['String'];
  leader: Scalars['String'];
  members: Array<Maybe<Member>>;
  content: Array<Maybe<Chat>>;
};

export type Chat = {
  __typename?: 'Chat';
  id: Scalars['ID'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
  content: Scalars['String'];
};

export type Member = {
  __typename?: 'Member';
  id: Scalars['ID'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  displayname?: Maybe<Scalars['String']>;
  friends?: Maybe<Array<Scalars['String']>>;
  profile?: Maybe<Profile>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  error?: Maybe<Array<FieldError>>;
  user: User;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  id?: Maybe<Scalars['ID']>;
  avatar?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  story?: Maybe<Scalars['String']>;
  follower?: Maybe<Scalars['String']>;
  following?: Maybe<Scalars['String']>;
};

export type Friend = {
  __typename?: 'Friend';
  id: Scalars['ID'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  displayname: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getPosts: PaginatedPost;
  getPost: Post;
  getMyPosts: PaginatedPost;
  getChats?: Maybe<Array<Maybe<RoomChat>>>;
  getChat?: Maybe<RoomChat>;
  getUsers?: Maybe<Array<Maybe<User>>>;
  getUser?: Maybe<User>;
  getRoomChat?: Maybe<Array<Maybe<RoomChat>>>;
  getGroups?: Maybe<Array<Maybe<GroupChat>>>;
  getGroup?: Maybe<GroupChat>;
  getGroupChat?: Maybe<Array<Maybe<GroupChat>>>;
};


export type QueryGetPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetPostArgs = {
  postId: Scalars['ID'];
};


export type QueryGetMyPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetChatArgs = {
  roomId: Scalars['ID'];
};


export type QueryGetRoomChatArgs = {
  username: Scalars['String'];
};


export type QueryGetGroupArgs = {
  groupId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  Upload?: Maybe<Scalars['String']>;
  createPost: Post;
  deletePost: Scalars['String'];
  createComment: Post;
  deleteComment: Post;
  likePost: Post;
  createRoomChat: RoomChat;
  createContentChat: RoomChat;
  createGroupChat: GroupChat;
  createContentGroupChat: GroupChat;
  createMember: GroupChat;
  addFriend: User;
  editProfile: User;
};


export type MutationRegisterArgs = {
  registerInput?: Maybe<RegisterInput>;
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUploadArgs = {
  file: Scalars['String'];
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  image: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID'];
};


export type MutationCreateCommentArgs = {
  postId: Scalars['String'];
  body: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  postId: Scalars['ID'];
  commentId: Scalars['ID'];
};


export type MutationLikePostArgs = {
  postId: Scalars['ID'];
};


export type MutationCreateRoomChatArgs = {
  username: Scalars['String'];
};


export type MutationCreateContentChatArgs = {
  roomId: Scalars['String'];
  content: Scalars['String'];
};


export type MutationCreateGroupChatArgs = {
  body: Scalars['String'];
};


export type MutationCreateContentGroupChatArgs = {
  groupId: Scalars['String'];
  content: Scalars['String'];
};


export type MutationCreateMemberArgs = {
  groupId: Scalars['String'];
  username: Scalars['String'];
};


export type MutationAddFriendArgs = {
  username: Scalars['String'];
};


export type MutationEditProfileArgs = {
  avatar: Scalars['String'];
  dateOfBirth: Scalars['String'];
  fullName: Scalars['String'];
  story: Scalars['String'];
  displayname: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newPost: Post;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'body' | 'createdAt' | 'username' | 'displayname' | 'verified' | 'image' | 'likeCount' | 'commentCount'>
  & { likes: Array<Maybe<(
    { __typename?: 'Like' }
    & Pick<Like, 'username'>
  )>>, comments: Array<Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'username' | 'createdAt' | 'body'>
  )>> }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email' | 'token' | 'displayname'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { error?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user: (
    { __typename?: 'User' }
    & RegularUserFragment
  ) }
);

export type CreatePostMutationVariables = Exact<{
  body: Scalars['String'];
  image: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'body' | 'createdAt' | 'username' | 'image' | 'likeCount' | 'commentCount'>
  ) }
);

export type LikeMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type LikeMutation = (
  { __typename?: 'Mutation' }
  & { likePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type RegisterMutationVariables = Exact<{
  registerInput?: Maybe<RegisterInput>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type PostQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'Post' }
    & PostSnippetFragment
  ) }
);

export type PostsQueryVariables = Exact<{
  cursor: Scalars['String'];
  limit: Scalars['Int'];
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { getPosts: (
    { __typename?: 'PaginatedPost' }
    & Pick<PaginatedPost, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  ) }
);

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  body
  createdAt
  username
  displayname
  verified
  image
  likeCount
  likes {
    username
  }
  commentCount
  comments {
    username
    createdAt
    body
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  token
  displayname
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  error {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const CreatePostDocument = gql`
    mutation createPost($body: String!, $image: String!) {
  createPost(body: $body, image: $image) {
    id
    body
    createdAt
    username
    image
    likeCount
    commentCount
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      body: // value for 'body'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const LikeDocument = gql`
    mutation Like($id: ID!) {
  likePost(postId: $id) {
    id
  }
}
    `;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, options);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput) {
  register(registerInput: $registerInput) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const PostDocument = gql`
    query Post($id: ID!) {
  getPost(postId: $id) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($cursor: String!, $limit: Int!) {
  getPosts(cursor: $cursor, limit: $limit) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;