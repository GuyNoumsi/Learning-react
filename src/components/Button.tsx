

interface Props {
  children: string
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  type? : 'submit' | 'reset' | 'button' | undefined
  onClick: () => void
}

export default function Button({ children, color = 'primary', type = undefined, onClick }: Props) {
  return <button className = {`btn btn-${color}`} type={type} onClick = {onClick}>{children}</button>
}
