import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    characterList: [],
    postInfo: [],
    likedPosts: {},
    filters: { isLiked: false }
}

export const fetchPokemons = createAsyncThunk(
    'pokemons/fetchPokemons',
    () => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=5`)
            .then((res) => res.json())
            .then((data) => data.results)
    }
)

export const fetchPokemon = createAsyncThunk(
    'pokemons/fetchPokemon',
    (name) => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            .then((res) => res.json())
            .then((data) => data)
    }
)

const postsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        likePost: (state, action) => {
            if (state.likedPosts[action.payload]) {
                delete state.likedPosts[action.payload]
            } else {
                state.likedPosts[action.payload] = true
            }
        },
        deletePost: (state, action) => {
            state.characterList.splice(state.characterList.findIndex((post) => {
                return post.name === action.payload
            }), 1)
        },
        filterLiked: (state) => {
            state.filters.isLiked = !state.filters.isLiked
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.characterList = action.payload
            })
            .addCase(fetchPokemon.fulfilled, (state, action) => {
                state.postInfo.push(action.payload);
            })
    },
})

const { actions, reducer: postsReducer } = postsSlice;

export { postsReducer };
export const { likePost, deletePost, filterLiked } = actions