import { Link } from 'react-router-dom';

export type PaginationLinkData = {
  index: number;
  limit: number;
};

const generatePaginationLink = ({ index, limit }: PaginationLinkData) => {
  const searchParams = new URLSearchParams({ skip: (index * limit).toString(), limit: limit.toString() });
  return `?${searchParams.toString()}`;
};

type PaginationProps = {
  limit: number;
  skip: number;
  total: number;
  onPageChange?: (index: number) => void;
  generateLink?: ({ index, limit }: PaginationLinkData) => string;
};

export function Pagination({
  limit,
  skip,
  total,
  onPageChange,
  generateLink = generatePaginationLink,
}: PaginationProps) {
  const pages = Math.ceil(total / limit);
  const currentPage = Math.ceil(skip / limit) + 1;

  const arrayOfPages = [...Array(pages)].map((_, index) => ({ index: index }));

  return (
    <nav>
      <ul className='pagination justify-content-center'>
        {arrayOfPages.map(({ index }) => (
          <li key={index} className={`page-item${index + 1 === currentPage ? ' active' : ''}`}>
            <Link
              to={generateLink({ index, limit })}
              className='page-link'
              onClick={onPageChange && (() => onPageChange(index))}
            >
              {index + 1}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
