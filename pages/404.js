import Link from 'next/link'
import React from 'react'

const PageNotFound = () => {
  return (
    <div>
      <h1>404 Page not found</h1>
      <Link href='/'>Go to Home Page</Link>
    </div>
  )
}

export default PageNotFound
