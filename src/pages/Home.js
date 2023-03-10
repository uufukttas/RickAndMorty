import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../redux/charactersSlice";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import Loading from "../components/Loading";
import Error from "../components/Error";
import '../App.css';

export const Home = () => {
    const characters = useSelector(state => state.characters);
    const isLoading = useSelector(state => state.isLoading);
    const message = useSelector(state => state.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCharacters());
    }, [dispatch]);

    if (isLoading) {
        return <Loading />
    }

    if (message) {
        return <Error message={message} />
    }

    const createSlug = (name) => name.split(' ').join('_');

    return (
        <div>
            <h2>Characters</h2>
            <Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                {
                    characters.items.map((character) => (
                        <Link to={`/${createSlug(character.name)}`}>
                            <img src={character.image} alt={character.name} />
                            <p>{character.name}</p>
                        </Link>
                    ))
                }
            </Masonry>
        </div>

    );
}