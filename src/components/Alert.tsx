
interface Props {
  children: string
  onClick: () => void
}

export default function Alert({ children, onClick }: Props) {
  return (
  <div className = "alert alert-warning alert-dismissible fade show" role="alert">
  {children}
  <button type="button" className = "btn-close" data-bs-dismiss="alert" aria-label="Close"
  onClick = {onClick}></button>
</div>
);}
