import { useEffect } from 'react'
import Head from 'next/head'

import netlifyIdentity from 'netlify-identity-widget'
import netlifyAuth from '../netlifyAuth.js'

import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home({ loggedIn }) {
  useEffect(() => {
    window.netlifyIdentity = netlifyIdentity
    netlifyIdentity.init()
  }, [])

  let login = () => {
    netlifyAuth.authenticate(() => {
      console.log('logged in!')
    })
  }

  return (
    <div className="container">
      <Head>
        <title>Members Only</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header text={'Welcome to the Public Space™'} />
        <p className="description">
          We are in a public space, for the people who aren't able to access the super fancy
          members-only area. You hear snobbish laughter in the distance.
        </p>
        {loggedIn ? (
          <div>
            You're logged in! Please do visit{' '}
            <Link href="/">
              <a>the special, members-only space.</a>
            </Link>
          </div>
        ) : (
          <button onClick={login}>Log in here to access the members-only area.</button>
        )}
      </main>

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

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-family: Menlo, Monaco, Lucida Console, Courier New, monospace;
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

export async function getStaticProps() {
  return {
    props: {
      loggedIn: netlifyAuth.isAuthenticated,
    },
  }
}
