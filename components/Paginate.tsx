import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

type Props = {
  currentPage: number;
  pageCount: number;
};

const Paginate = ({ currentPage, pageCount }: Props) => {
  const router = useRouter();

  const handlePageClick = (event: { selected: number }) => {
    const page = event.selected;
    router.push(`/archive/${page + 1}`);
  };
  return (
    <ReactPaginate
      className="paginate"
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={() => null}
      forcePage={currentPage - 1}
    />
  );
};

export default Paginate;
