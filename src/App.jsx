import React, { useState } from 'react';
import useFetch from './hooks/useFetch.js';

const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=6';
const ACCENTS = ['mint', 'lilac', 'peach', 'blue', 'yellow', 'rose'];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M10 5l5 5-5 5" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M16 7a6.5 6.5 0 0 0-11.2-2L3 7m0-4v4h4M4 13a6.5 6.5 0 0 0 11.2 2L17 13m0 4v-4h-4" />
    </svg>
  );
}

function PostCard({ post, index }) {
  return (
    <article className="post-card">
      <div className={`card-art ${ACCENTS[index % ACCENTS.length]}`} aria-hidden="true">
        <span className="art-number">{String(index + 1).padStart(2, '0')}</span>
        <span className="art-orbit" />
        <span className="art-shape" />
      </div>
      <div className="post-copy">
        <div className="post-meta">
          <span className="tag">FIELD NOTE</span>
          <span>0{index + 1} / 06</span>
        </div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <a
          className="read-link"
          href={`https://jsonplaceholder.typicode.com/posts/${post.id}`}
          target="_blank"
          rel="noreferrer"
        >
          Read post <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

function LoadingCards() {
  return (
    <div className="post-grid" aria-label="Loading posts" aria-busy="true">
      {ACCENTS.map((accent) => (
        <div className="skeleton-card" key={accent}>
          <div className={`skeleton-art ${accent}`} />
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
          <div className="skeleton-line medium" />
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const url = refreshKey
    ? `${API_URL}&refresh=${refreshKey}`
    : API_URL;
  const { data, loading, error } = useFetch(url);
  const posts = Array.isArray(data) ? data : [];

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Fetch home">
          <span className="brand-mark">f.</span>
          <span>fetch<span className="brand-period">.</span></span>
        </a>
        <div className="topbar-right">
          <span className="live-dot" />
          <span>API playground</span>
          <span className="topbar-divider" />
          <span className="version">REACT HOOKS / 01</span>
        </div>
      </header>

      <section className="intro" id="top">
        <div className="intro-copy">
          <p className="eyebrow"><span>01</span> A SMALLER WAY TO FETCH</p>
          <h1>Good data.<br /><em>Less boilerplate.</em></h1>
          <p className="intro-description">
            A tiny custom hook doing the heavy lifting. See it fetch, handle loading,
            and recover from errors — all in one reusable place.
          </p>
        </div>
        <aside className="hook-note">
          <span className="note-index">THE HOOK</span>
          <code><span>const</span> {'{ data, loading, error }'} = <b>useFetch</b>(url)</code>
          <span className="note-caption">One URL in. Three useful states out.</span>
        </aside>
      </section>

      <section className="feed-section" aria-labelledby="feed-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span>01—06</span> THE LATEST FROM THE API</p>
            <h2 id="feed-title">A few things worth a read<span>.</span></h2>
          </div>
          <button
            className="refresh-button"
            type="button"
            onClick={() => setRefreshKey((key) => key + 1)}
            disabled={loading}
          >
            <RefreshIcon />
            {loading ? 'Fetching…' : 'Refresh data'}
          </button>
        </div>

        <div className="endpoint-bar">
          <span className="method">GET</span>
          <code>{API_URL}</code>
          <span className={`request-state ${error ? 'has-error' : loading ? 'is-loading' : 'is-ready'}`}>
            <span />
            {error ? 'REQUEST FAILED' : loading ? 'FETCHING' : 'CONNECTED'}
          </span>
        </div>

        {error ? (
          <div className="error-panel" role="alert">
            <span className="error-icon">!</span>
            <div>
              <h3>Couldn’t reach the API</h3>
              <p>{error.message}. Check your connection and try again.</p>
            </div>
            <button type="button" onClick={() => setRefreshKey((key) => key + 1)}>
              Try again <ArrowIcon />
            </button>
          </div>
        ) : loading ? (
          <LoadingCards />
        ) : posts.length > 0 ? (
          <div className="post-grid">
            {posts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="empty-panel">No posts were returned by this request.</div>
        )}
      </section>

      <footer className="footer">
        <span>BUILT WITH <b>useFetch</b></span>
        <span>DATA FROM JSONPLACEHOLDER</span>
        <a href="https://jsonplaceholder.typicode.com/" target="_blank" rel="noreferrer">
          VISIT THE API <ArrowIcon />
        </a>
      </footer>
    </main>
  );
}
