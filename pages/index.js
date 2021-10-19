import Link from 'next/link'

export default function Home() {
  return (
    <div className='d-flex justify-context-between'>
      <Link href='/'>Home</Link>
      <Link href='/about'><a>About</a></Link>
      <Link href='/contact'><a>Contact</a></Link>
      <Link href='/blog'><a>Blog</a></Link>
    </div>
  )
}