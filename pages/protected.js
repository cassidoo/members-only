import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Header from '@components/Header'
import Footer from '@components/Footer'

import netlifyAuth from '../netlifyAuth.js'

export default function Protected() {
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated)
  let [user, setUser] = useState(null)

  useEffect(() => {
    let isCurrent = true
    netlifyAuth.initialize((user) => {
      if (isCurrent) {
        setLoggedIn(!!user)
        setUser(user)
      }
    })

    return () => {
      isCurrent = false
    }
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Members Only</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loggedIn ? (
        <main>
          <Header text={'Welcome to the Private Space™'} />
          <p className="description">
            Wow, secrets are super cool. Welcome {user?.user_metadata.full_name}!
          </p>
          <button
            onClick={() => {
              netlifyAuth.signout(() => {
                setLoggedIn(false)
                setUser(null)
              })
            }}
          >
            Log out.
          </button>
        </main>
      ) : (
        <main>
          <p>YOU ARE NOT ALLOWED HERE.</p>
          <Link href="/">
            <a>Go back to the grody public space.</a>
          </Link>
        </main>
      )}

      <Footer />

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
