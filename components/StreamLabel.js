const labelItemStyle = {
  marginRight: 10,
};

export default ({ label }) => !label ? JSON.stringify(label)+'' : (
  <span className='StreamLabel' title={JSON.stringify(label)}>
    {Object.keys(label).map(key => (
      <span key={key} className='labelItem' style={labelItemStyle}>
        <b>{key}:</b> {label[key]}
      </span>
    ))}
  </span>
);
