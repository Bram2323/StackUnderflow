import { useSearchParams } from "react-router-dom";

export const queryName = "page";
const neighbourAmount = 2;

function Pageable({ totalPages }) {
    if (totalPages <= 1) return <></>;

    const [queryParams, setSearchParams] = useSearchParams();

    const queryPage = Number(queryParams.get(queryName));
    const currentPage = queryPage ? queryPage : 1;

    function handleChangePage(page) {
        queryParams.set("page", page);
        setSearchParams(queryParams);
    }

    const pagesToDisplay = [1];
    let pivotPage = currentPage;
    if (currentPage == 1) pivotPage++;
    else if (currentPage == totalPages) pivotPage--;
    for (let dPage = -neighbourAmount; dPage <= neighbourAmount; dPage++) {
        const page = pivotPage + dPage;
        if (page > 1 && page < totalPages) pagesToDisplay.push(page);
    }
    if (totalPages > 1) pagesToDisplay.push(totalPages);

    return (
        <>
            <div className="flex gap-1">
                {pagesToDisplay.map((page, index) => {
                    const dots =
                        index != 0 && pagesToDisplay[index - 1] < page - 1;
                    return (
                        <div key={index} className="flex gap-1">
                            {dots && <p>...</p>}
                            <button
                                className={
                                    " px-[6px] border border-black border-solid rounded-[5px] " +
                                    (page === currentPage
                                        ? " bg-orange-300"
                                        : "")
                                }
                                onClick={() => handleChangePage(page)}
                            >
                                {page}
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Pageable;
