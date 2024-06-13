import Pageable from "../shared/pageable/Pageable";

export default function Leaderboard({ users, totalPages }) {
    return (
        <>
            <Pageable totalPages={totalPages} />
            INSERT CONTENT HERE
            <Pageable totalPages={totalPages} />
        </>
    );
}
