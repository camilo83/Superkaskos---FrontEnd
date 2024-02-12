export function Circle({ filled }: { filled: boolean }) {
  return (
    <div
      className={`circle ${filled ? 'filled' : ''}`}
      data-testid="circle"
    ></div>
  );
}
