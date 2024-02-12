type Props = {
  readonly filled: boolean;
};

export function Circle({ filled }: Props) {
  return (
    <div
      className={`circle ${filled ? 'filled' : ''}`}
      data-testid="circle"
    ></div>
  );
}
