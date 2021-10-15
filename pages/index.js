import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link href='/'>Home</Link>
      <Link href='/about'><a>About</a></Link>
      <Link href='/contact'><a>Contact</a></Link>
    </div>
  )
}