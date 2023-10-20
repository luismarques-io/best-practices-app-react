import { Link } from 'react-router-dom';

type PaginationProps = {
  limit: number;
  skip: number;
  total: number;
  onPageChange?: (index: number) => void;
};

export function Pagination({ limit, skip, total, onPageChange }: PaginationProps) {
  const pages = Math.ceil(total / limit);
  const currentPage = Math.ceil(skip / limit) + 1;

  const arrayOfPages = [...Array(pages)].map((_, index) => ({ index: index }));

  return (
    <nav>
      <ul className='pagination justify-content-center'>
        {arrayOfPages.map(({ index }) => (
          <li key={index} className={`page-item${index + 1 === currentPage ? ' active' : ''}`}>
            <Link
              to={`?skip=${index * limit}&limit=${limit}`}
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
