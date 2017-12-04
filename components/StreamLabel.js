const labelItemStyle = {
  marginRight: 10,
};

const compareLabelItems = (a, b) => {
  if (a.key === 'agent' && b.key !== 'agent') return -1;
  if (a.key !== 'agent' && b.key === 'agent') return 1;
  if (a.key === 'host' && b.key !== 'host') return -1;
  if (a.key !== 'host' && b.key === 'host') return 1;
  if (a.key < b.key) return -1;
  if (a.key > b.key) return 1;
  return 0;
};

export default ({ label }) => {
  if (!label) {
    return (<code>{JSON.stringify(label)+''}</code>);
  }
  const items = Object.keys(label).map(key => ({ key, value: label[key] }));
  // TODO move this sort to fetch function
  items.sort(compareLabelItems);
  return (
    <span className='StreamLabel' title={JSON.stringify(label)}>
      {items.map(({ key, value }) => (
        <span key={key} className='labelItem' style={labelItemStyle}>
          <b>{key}:</b> {value}
        </span>
      ))}
    </span>
  );
};
