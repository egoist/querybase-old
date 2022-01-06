export const Link: React.FC<
  { to: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ to, children, ...props }) => {
  const handleClick = (e: any) => {
    e.preventDefault()
    location.hash = to
  }
  return (
    <a {...props} href={to} onClick={handleClick}>
      {children}
    </a>
  )
}
