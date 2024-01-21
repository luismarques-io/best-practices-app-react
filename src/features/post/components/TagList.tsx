export function TagList({ tags }: Readonly<{ tags: string[] }>) {
  // Remove duplicate tags
  tags = Array.from(new Set(tags));
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
