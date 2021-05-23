const Word = (props) => {
  if (props.word.startsWith('@')) {
    return <span style={ { color: '#bf00ff' } }> { props.word.replace(/_/g, ' ') }</span>
  } else {
    return ` ${props.word}`
  }
}

export default Word;