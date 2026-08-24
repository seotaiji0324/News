import { useCallback, useEffect, useMemo, useState } from "react";
import { DESCRIPTIONS, fallbackArticles, NAV_ITEMS, PUBLISHERS } from "./data.js";

const HERO_IMAGES = {
  stand: "/assets/hero-reader.png",
  edit: "/assets/category-press-v2.png",
  ent: "/assets/category-entertainment-v2.png",
  sports: "/assets/category-sports-v2.png",
  game: "/assets/category-game-v2.png",
  economy: "/assets/category-economy-v2.png",
  shopping: "/assets/category-shopping-v2.png",
};

const CATEGORY_IMAGE_ALTS = {
  stand: "카페에서 스마트폰으로 뉴스를 읽는 독자",
  edit: "신문 편집면을 검토하는 언론사 편집자",
  ent: "무대 뒤에서 공연 소식을 확인하는 엔터테이너",
  sports: "경기장에서 실시간 결과를 확인하는 육상 선수",
  game: "게임 스튜디오에서 경기 소식을 확인하는 게이머",
  economy: "태블릿으로 경제 지표를 살펴보는 금융 저널리스트",
  shopping: "매장에서 스마트폰으로 상품 정보를 확인하는 쇼핑객",
};

const FEATURE_IMAGES = {
  stand: ["/assets/editor-reporter.png", "/assets/sports-reader.png"],
  edit: ["/assets/category-press-v2.png", "/assets/editor-reporter.png"],
  ent: ["/assets/category-entertainment-v2.png", "/assets/editor-reporter.png"],
  sports: ["/assets/category-sports-v2.png", "/assets/sports-reader.png"],
  game: ["/assets/category-game-v2.png", "/assets/sports-reader.png"],
  economy: ["/assets/category-economy-v2.png", "/assets/hero-reader.png"],
  shopping: ["/assets/category-shopping-v2.png", "/assets/editor-reporter.png"],
};

function Icon({ name, size = 18, color = "63301d" }) {
  return <img className="ui-icon" src={`https://api.iconify.design/ph/${name}.svg?color=%23${color}`} width={size} height={size} alt="" aria-hidden="true" />;
}

function publisherLogo(domain) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
}

function splitNewsTitle(rawTitle = "") {
  const parts = rawTitle.split(" - ");
  if (parts.length < 2) return { title: rawTitle, source: "Google 뉴스" };
  const source = parts.pop();
  return { title: parts.join(" - "), source };
}

function formatRelative(value) {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 60000));
  if (!Number.isFinite(minutes) || minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  return new Intl.DateTimeFormat("ko-KR", { month: "numeric", day: "numeric" }).format(new Date(value));
}

async function fetchNews(category) {
  const item = NAV_ITEMS.find((nav) => nav.id === category);
  const query = category === "stand" ? "대한민국" : item.query;
  const feed = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=ko&gl=KR&ceid=KR%3Ako`;
  const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("news feed unavailable");
  const data = await response.json();
  if (data.status !== "ok" || !data.items?.length) throw new Error("empty news feed");
  return data.items.slice(0, 10).map((article) => ({ ...splitNewsTitle(article.title), link: article.link, pubDate: article.pubDate, live: true }));
}

function Masthead({ selected, onSelect, headline, status }) {
  const today = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "short" }).format(new Date());
  return (
    <header className="masthead">
      <div className="brand-row">
        <a href="#top" className="brand-mark" aria-label="나우스탠드 홈">NOW<br />STAND</a>
        <div className="edition">
          <span>WEEKLY LIVE EDITION</span>
          <strong>{today}</strong>
        </div>
      </div>
      <nav className="main-nav" aria-label="뉴스 카테고리">
        {NAV_ITEMS.map((item) => (
          <button key={item.id} type="button" className={selected === item.id ? "active" : ""} aria-current={selected === item.id ? "page" : undefined} onClick={() => onSelect(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="live-ribbon">
        <span className={`live-badge ${status === "loading" ? "loading" : ""}`}><i /> LIVE</span>
        <p>{headline}</p>
        <button type="button" onClick={() => onSelect("stand")}>전체뉴스 <Icon name="arrow-right" size={15} color="f7e7d0" /></button>
      </div>
    </header>
  );
}

function Hero({ selected, article }) {
  const nav = NAV_ITEMS.find((item) => item.id === selected);
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="overline">CURATED IN REAL TIME · SEOUL</p>
        <h1><em>오늘의</em><br />{nav.label}</h1>
        <p className="hero-summary">{DESCRIPTIONS[selected]} 지금의 흐름을 놓치지 않도록 여러 출처의 보도를 한 편집면에 담았습니다.</p>
        <a className="ink-button" href={article.link} target={article.live ? "_blank" : undefined} rel={article.live ? "noreferrer" : undefined}>
          헤드라인 읽기 <Icon name="arrow-up-right" size={16} color="f7e7d0" />
        </a>
      </div>
      <div className="hero-media">
        <img src={HERO_IMAGES[selected]} alt={CATEGORY_IMAGE_ALTS[selected]} />
        <div className="hero-caption">
          <span>01</span>
          <p>{article.title}</p>
        </div>
      </div>
    </section>
  );
}

function PressStand() {
  const [page, setPage] = useState(0);
  const [view, setView] = useState("grid");
  const pageCount = Math.ceil(PUBLISHERS.length / 24);
  const visible = PUBLISHERS.slice(page * 24, (page + 1) * 24);
  return (
    <section className="press-section" aria-labelledby="press-heading">
      <div className="section-label">
        <div><span>THE PRESS ROOM</span><h2 id="press-heading">언론사 편집</h2></div>
        <p>오늘의 편집면을<br />직접 골라보세요.</p>
      </div>
      <div className={`press-grid ${view === "list" ? "list-view" : ""}`}>
        {visible.map((publisher) => (
          <a className="publisher-card" key={publisher.name} href={`https://${publisher.domain}`} target="_blank" rel="noreferrer">
            <img src={publisherLogo(publisher.domain)} width="28" height="28" alt="" />
            <span>{publisher.name}</span>
          </a>
        ))}
      </div>
      <div className="press-toolbar">
        <div className="view-switch" role="group" aria-label="언론사 보기 방식">
          <button type="button" className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} aria-label="격자 보기"><Icon name="squares-four" size={21} color={view === "grid" ? "63301d" : "b78f72"} /></button>
          <button type="button" className={view === "list" ? "active" : ""} onClick={() => setView("list")} aria-label="목록 보기"><Icon name="list" size={21} color={view === "list" ? "63301d" : "b78f72"} /></button>
        </div>
        <div className="pager">
          <button type="button" aria-label="이전 언론사" disabled={page === 0} onClick={() => setPage((value) => value - 1)}><Icon name="arrow-left" size={18} /></button>
          <span>PRESS {page + 1} / {pageCount}</span>
          <button type="button" aria-label="다음 언론사" disabled={page === pageCount - 1} onClick={() => setPage((value) => value + 1)}><Icon name="arrow-right" size={18} /></button>
        </div>
      </div>
    </section>
  );
}

function MarketStrip({ market }) {
  const items = [
    ["USD / KRW", market.usdKrw ? `${market.usdKrw.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}원` : "연결 중", market.fxDate || "Frankfurter"],
    ["JPY / KRW", market.usdKrw && market.usdJpy ? `${((market.usdKrw / market.usdJpy) * 100).toLocaleString("ko-KR", { maximumFractionDigits: 2 })}원` : "연결 중", "100엔 기준"],
    ["BITCOIN", market.bitcoin ? `${Math.round(market.bitcoin).toLocaleString("ko-KR")}원` : "연결 중", market.btcChange == null ? "CoinGecko" : `${market.btcChange >= 0 ? "+" : ""}${market.btcChange.toFixed(2)}%`],
    ["ETHEREUM", market.ethereum ? `${Math.round(market.ethereum).toLocaleString("ko-KR")}원` : "연결 중", market.ethChange == null ? "CoinGecko" : `${market.ethChange >= 0 ? "+" : ""}${market.ethChange.toFixed(2)}%`],
  ];
  return <section className="market-strip" aria-label="실시간 경제 지표">{items.map(([label, value, meta]) => <article key={label}><span>{label}</span><strong>{value}</strong><small>{meta}</small></article>)}</section>;
}

function NewsDesk({ selected, articles, status, lastUpdated, onRefresh }) {
  const [lead, second, third, ...rest] = articles;
  const statusText = status === "loading" ? "불러오는 중" : status === "live" ? `${formatRelative(lastUpdated)} 업데이트` : "연결 복구 중 · 예시 데이터";
  const featureCards = [
    { article: second, image: FEATURE_IMAGES[selected][0], label: "SPECIAL REPORT" },
    { article: third, image: FEATURE_IMAGES[selected][1], label: "ONLY THIS WEEK" },
  ];
  return (
    <section className="news-desk" id="realtime-news" aria-labelledby="desk-heading">
      <div className="desk-title">
        <div><span>SELECTED FOR YOU</span><h2 id="desk-heading">오늘의 편집 노트</h2></div>
        <button type="button" onClick={onRefresh} disabled={status === "loading"}><Icon name="arrows-clockwise" size={17} /> {statusText}</button>
      </div>
      <div className="feature-stack">
        {featureCards.map(({ article, image, label }, index) => (
          <article className={`feature-card feature-${index + 1}`} key={article.title}>
            <img src={image} alt={`${NAV_ITEMS.find((item) => item.id === selected).label} 소식을 확인하는 독자`} />
            <div className="feature-copy">
              <span>{label}</span>
              <h3>{article.title}</h3>
              <p>{DESCRIPTIONS[selected]} 다양한 관점의 기사를 함께 읽고 오늘의 흐름을 빠르게 살펴보세요.</p>
              <div className="feature-meta"><strong>{article.source}</strong><small>{formatRelative(article.pubDate)}</small></div>
              <a href={article.link} target={article.live ? "_blank" : undefined} rel={article.live ? "noreferrer" : undefined}>Read story <Icon name="arrow-up-right" size={14} color="f7e7d0" /></a>
            </div>
          </article>
        ))}
      </div>
      <div className="briefing-list">
        {rest.slice(0, 5).map((article, index) => (
          <a href={article.link} target={article.live ? "_blank" : undefined} rel={article.live ? "noreferrer" : undefined} key={`${article.title}-${index}`}>
            <span>{String(index + 3).padStart(2, "0")}</span>
            <div><strong>{article.title}</strong><small>{article.source} · {formatRelative(article.pubDate)}</small></div>
            <Icon name="arrow-right" size={18} />
          </a>
        ))}
      </div>
      <aside className="membership-note">
        <div><span>LIVE BRIEFING</span><strong>매 5분마다 새로워지는<br />당신만의 뉴스 편집면</strong></div>
        <a href="#top">맨 위로 <Icon name="arrow-up" size={15} color="f7e7d0" /></a>
      </aside>
      <span className="lead-source">Lead story · {lead.source}</span>
    </section>
  );
}

export function App() {
  const [selected, setSelected] = useState("stand");
  const [articlesByCategory, setArticlesByCategory] = useState(() => Object.fromEntries(NAV_ITEMS.map((item) => [item.id, fallbackArticles(item.id)])));
  const [status, setStatus] = useState("loading");
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());
  const [market, setMarket] = useState({});
  const articles = articlesByCategory[selected] || fallbackArticles(selected);

  const loadCategory = useCallback(async (category, quiet = false) => {
    if (!quiet) setStatus("loading");
    try {
      const latest = await fetchNews(category);
      const timestamp = new Date().toISOString();
      setArticlesByCategory((current) => ({ ...current, [category]: latest }));
      setLastUpdated(timestamp);
      setStatus("live");
      localStorage.setItem(`nowstand:${category}`, JSON.stringify({ articles: latest, timestamp }));
    } catch {
      const cached = localStorage.getItem(`nowstand:${category}`);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setArticlesByCategory((current) => ({ ...current, [category]: parsed.articles }));
          setLastUpdated(parsed.timestamp);
          setStatus("live");
          return;
        } catch { localStorage.removeItem(`nowstand:${category}`); }
      }
      setStatus("fallback");
    }
  }, []);

  useEffect(() => { loadCategory(selected); }, [selected, loadCategory]);
  useEffect(() => {
    const interval = window.setInterval(() => loadCategory(selected, true), 5 * 60 * 1000);
    const onVisibility = () => { if (document.visibilityState === "visible") loadCategory(selected, true); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { window.clearInterval(interval); document.removeEventListener("visibilitychange", onVisibility); };
  }, [selected, loadCategory]);

  useEffect(() => {
    async function loadMarket() {
      try {
        const [ratesResponse, cryptoResponse] = await Promise.all([
          fetch("https://api.frankfurter.dev/v2/rates?base=USD&quotes=KRW,JPY,EUR"),
          fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=krw&include_24hr_change=true"),
        ]);
        if (!ratesResponse.ok || !cryptoResponse.ok) throw new Error("market unavailable");
        const [rates, crypto] = await Promise.all([ratesResponse.json(), cryptoResponse.json()]);
        const byQuote = Object.fromEntries(rates.map((rate) => [rate.quote, rate]));
        setMarket({ usdKrw: byQuote.KRW?.rate, usdJpy: byQuote.JPY?.rate, fxDate: byQuote.KRW?.date, bitcoin: crypto.bitcoin?.krw, btcChange: crypto.bitcoin?.krw_24h_change, ethereum: crypto.ethereum?.krw, ethChange: crypto.ethereum?.krw_24h_change });
      } catch { setMarket({}); }
    }
    loadMarket();
    const interval = window.setInterval(loadMarket, 5 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  const headline = useMemo(() => `${articles[0].source} · ${articles[0].title}`, [articles]);
  return (
    <div className="page-frame">
      <Masthead selected={selected} onSelect={setSelected} headline={headline} status={status} />
      <main>
        <Hero selected={selected} article={articles[0]} />
        {(selected === "stand" || selected === "edit") && <PressStand />}
        {selected === "economy" && <MarketStrip market={market} />}
        <NewsDesk selected={selected} articles={articles} status={status} lastUpdated={lastUpdated} onRefresh={() => loadCategory(selected)} />
      </main>
      <footer><div><strong>NOWSTAND</strong><p>오늘의 뉴스를 한 편집면으로.</p></div><p>News by Google News RSS<br />Markets by Frankfurter & CoinGecko</p><p>Seoul, Korea<br />© 2026 Nowstand</p></footer>
    </div>
  );
}
