import { fetchPokemons, filterLiked } from "../../store/slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostInfo from "../PostInfo/PostInfo";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components'

const Divgroup = styled.div`
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    button {
        width: auto;
        height: 35px;
        margin: auto;
        font-size: 17px;
        border: solid;
        border-radius: 8px;
        cursor: pointer;
    };
    button :focus{
        box-shadow: none;
        outline: none;
    };
`

const Ulgroup = styled.ul`
    margin-top: 50px;
    list-style-type : none;
`
const LiGroup = styled.li`
    padding: 20px 35px 10px 35px;
    margin-top: 10px;
`
export default function Posts() {
    const dispatch = useDispatch();
    const list = useSelector(state => state.characterList)
    const isLiked = useSelector(state => state.filters.isLiked)
    const likedPosts = useSelector(state => state.likedPosts)
    const filteredList = isLiked ? list.filter(posts => likedPosts[posts.name]) : list

    useEffect(() => {
        dispatch(fetchPokemons())
    }, [])

    return (
        <Divgroup>
            <button onClick={() => dispatch(filterLiked())}>Только <FontAwesomeIcon icon={faHeart} /></button>
            <Ulgroup className="app-list list-group">
                {filteredList.map((item) => (
                    <LiGroup key={item.name} >
                        <PostInfo name={item.name} liked={isLiked} />
                    </LiGroup>
                ))}
            </Ulgroup>
        </Divgroup>
    )
}

