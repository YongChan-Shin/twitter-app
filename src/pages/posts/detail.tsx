import Loader from "components/loader/Loader";
import PostBox from "components/posts/PostBox";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostHeader from "components/posts/Header";

const PostDetail = () => {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  
  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);

      setPost({...docSnap.data() as PostProps, id: docSnap.id})
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) getPost();
  }, []);

  return (
    <div className="post">
      <PostHeader />
      {post ? <PostBox post={post} /> : <Loader />}
    </div>
  );
};

export default PostDetail;