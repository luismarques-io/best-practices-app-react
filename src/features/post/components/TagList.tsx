export function TagList({ tags }: { tags: string[] }) {
  return (
    <>
      {tags.map((tag) => (
        <span key={tag} className='badge text-bg-secondary me-1'>
          {tag}
        </span>
      ))}
    </>
  );
}
