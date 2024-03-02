import React, {useState, useEffect, PropsWithChildren} from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Header.module.css';

interface Genre {
    id: number;
    name: string;
}

interface HeaderProps extends PropsWithChildren{

}

const Header: React.FC<HeaderProps> = () => {
    const [searchValue, setSearchValue] = useState('');
    const [genres, setGenres] = useState<Genre[]>([]);
    const [theme, setTheme] = useState<string>('light');

    const navigate = useNavigate();

    useEffect(() => {
        // Завантажити список жанрів з API
        fetch('/api/genres')
            .then((res) => res.json())
            .then((data: Genre[]) => setGenres(data));
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate(`/search?q=${searchValue}`);
    };

    const handleThemeChange = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className={css.Header}>
            <div className={css.Search}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Пошук фільмів"
                        value={searchValue}
                        onChange={handleSearch}
                    />
                </form>
            </div>
            <div className={css.Genres}>
                <button onClick={() => { /* Відобразити список жанрів */ }}>Жанри</button>
            </div>
            <div className={css.Theme}>
                <button onClick={handleThemeChange}>Тема: {theme}</button>
            </div>
        </div>
    );
};

export {
    Header
};