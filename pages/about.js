import React from 'react'
import Link from 'next/link'

const about = () => {
    return (
        <div>
            <p>This is about us page</p>
            <Link href='/'>Back to home</Link>
        </div>
    )
}

export default about
