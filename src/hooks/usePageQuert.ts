import {useSearchParams} from "react-router-dom";

export const usePageQuery = (): {
    page: number;
    prevPage: () => void;
    nextPage: () => void;
} => {
    const [query, setQuery] = useSearchParams({page: "1"});
    const page = Number(query.get("page"));

    return {
        page,
        prevPage: () => {
            setQuery({page: (page - 1).toString()});
        },
        nextPage: () => {
            setQuery({page: (page + 1).toString()});
        },
    };
};