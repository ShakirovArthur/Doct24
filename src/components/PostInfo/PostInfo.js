import { fetchPokemon, likePost, deletePost } from "../../store/slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components'

const LiGroup = styled.li`
  h2:first-letter{
    text-transform: uppercase;
  }
  
`

const UlGroup = styled.ul`
display: flex;
justify-content: space-around;
user-select: none;
list-style-type : none;
background-color: white;
border:solid;
border-color:white;
border-radius: 8px;
.button {
    dispay: flex;
    padding:20px;
}
.trash {
    color: red;
    float:right;
    cursor: pointer;
}
.trash: hover {
    color:black;
}
.like {
    line-height: 35px;
    color: red;
    transform: translateX(30px);
    float:right;
    cursor: pointer;
}
.notLike {
    line-height: 35px;
    color: black;
    transform: translateX(30px);
    float:right;
    cursor: pointer;
}
.notLike : hover {
    color:red;
}
`

export default function PostInfo({ name }) {
    const postsInfo = useSelector(state => state.postInfo);
    const postInfo = postsInfo.find(postsInfo => postsInfo.name === name)
    const isLikedPost = useSelector(state => state.likedPosts[name])

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPokemon(name))
    }, [name, dispatch])

    return (
        <div>
            <UlGroup>
                <LiGroup ><h2>{postInfo?.name}</h2></LiGroup>
                <LiGroup>height: {postInfo?.height}</LiGroup>
                <LiGroup>weight: {postInfo?.weight}</LiGroup>
                <LiGroup><img src={postInfo?.sprites.front_default} alt='' /></LiGroup>
                <div className="button">
                    <FontAwesomeIcon icon={faHeart} onClick={() => dispatch(likePost(name))} className={isLikedPost ? 'like' : 'notLike'} />
                </div>
                <div className="button">
                    <FontAwesomeIcon icon={faTrash} onClick={() => dispatch(deletePost(name))} className='trash' />
                </div>
            </UlGroup>
        </div>
    )
}