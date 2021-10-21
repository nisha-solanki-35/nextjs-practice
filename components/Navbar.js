import Link from 'next/link'

export default function Navbar() {
  return (
    <div>
      <Link href='/'>Login</Link>
      <Link href='/about' as='/about-us'><a>About</a></Link>
      <Link href='/contact' as='/contact-us'><a>Contact</a></Link>
      <Link href='/users'><a>Users</a></Link>
      <Link href='/products'><a>Products</a></Link>
    </div>
  )
}