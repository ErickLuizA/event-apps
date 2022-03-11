import { OriginalButton } from './styles'

function Button ({ className, children }) {
  return (
    <OriginalButton className={className}>
      {children}
    </OriginalButton>
  )
}

export default Button
