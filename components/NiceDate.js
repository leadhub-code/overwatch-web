export default (props) => {
  const date = new Date(props.date);
  const now = new Date();
  const dateStr = `${date.year}-${date.month}`;
  const ds = Math.round((now - date) / 1000);
  const agoStr = `${ds} s ago`;
  return (
    <span className="niceDate">
      {date.toISOString()}{' '}
      <span style={{ fontWeight: 300 }}>({agoStr})</span>
    </span>
  );
}
