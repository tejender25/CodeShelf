export default function Pagination({
    pagination,
    onPageChange,
}) {
    if (
        !pagination ||
        pagination.totalPages <= 1
    ) {
        return null;
    }

    const {
        page,
        totalPages,
        hasPrev,
        hasNext,
    } = pagination;

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
            <button
                disabled={!hasPrev}
                onClick={() =>
                    onPageChange(page - 1)
                }
                className={`px-4 py-2 rounded-lg border transition ${
                    hasPrev
                        ? "border-border hover:bg-primary hover:text-white"
                        : "border-border opacity-50 cursor-not-allowed"
                }`}
            >
                Previous
            </button>

            {pages.map((number) => (
                <button
                    key={number}
                    onClick={() =>
                        onPageChange(number)
                    }
                    className={`w-10 h-10 rounded-lg border transition ${
                        page === number
                            ? "bg-primary text-white border-primary"
                            : "border-border hover:bg-background"
                    }`}
                >
                    {number}
                </button>
            ))}

            <button
                disabled={!hasNext}
                onClick={() =>
                    onPageChange(page + 1)
                }
                className={`px-4 py-2 rounded-lg border transition ${
                    hasNext
                        ? "border-border hover:bg-primary hover:text-white"
                        : "border-border opacity-50 cursor-not-allowed"
                }`}
            >
                Next
            </button>
        </div>
    );
}