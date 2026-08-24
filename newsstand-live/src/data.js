export const NAV_ITEMS = [
  { id: "stand", label: "뉴스스탠드", query: "대한민국 주요 뉴스" },
  { id: "edit", label: "언론사편집", query: "대한민국 속보" },
  { id: "ent", label: "엔터", query: "연예 OR 엔터테인먼트" },
  { id: "sports", label: "스포츠", query: "스포츠 OR 프로야구 OR 축구" },
  { id: "game", label: "게임", query: "게임 OR e스포츠" },
  { id: "economy", label: "경제", query: "경제 OR 증시 OR 환율" },
  { id: "shopping", label: "쇼핑투데이", query: "쇼핑 OR 유통 OR 소비" },
];

export const DESCRIPTIONS = {
  stand: "국내 주요 언론사의 최신 보도를 한눈에 확인하세요.",
  edit: "각 언론사가 직접 고른 오늘의 핵심 기사를 모았습니다.",
  ent: "방송·영화·음악계에서 지금 가장 빠르게 움직이는 소식입니다.",
  sports: "경기 결과부터 이적 시장까지, 스포츠 현장을 실시간으로 전합니다.",
  game: "신작·업데이트·e스포츠 소식을 빠르게 모아봅니다.",
  economy: "시장과 생활경제의 흐름을 뉴스와 데이터로 함께 읽습니다.",
  shopping: "유통가 소식과 소비 트렌드, 오늘의 쇼핑 이슈를 전합니다.",
};

export const PUBLISHERS = [
  ["한국경제TV", "wowtv.co.kr"], ["조선일보", "chosun.com"], ["경향신문", "khan.co.kr"],
  ["동아일보", "donga.com"], ["일간스포츠", "isplus.com"], ["채널A", "ichannela.com"],
  ["헤럴드경제", "heraldcorp.com"], ["ZDNET Korea", "zdnet.co.kr"], ["국민일보", "kmib.co.kr"],
  ["문화일보", "munhwa.com"], ["이데일리", "edaily.co.kr"], ["시사IN", "sisain.co.kr"],
  ["KBS NEWS", "news.kbs.co.kr"], ["YTN", "ytn.co.kr"], ["스포츠서울", "sportsseoul.com"],
  ["디지털데일리", "ddaily.co.kr"], ["한경비즈니스", "hankyung.com"], ["Byline Network", "byline.network"],
  ["여성신문", "womennews.co.kr"], ["동아IT", "it.donga.com"], ["Newsen", "newsen.com"],
  ["주간경향", "weekly.khan.co.kr"], ["TV리포트", "tvreport.co.kr"], ["월간중앙", "jmagazine.joins.com"],
  ["연합뉴스", "yna.co.kr"], ["한겨레", "hani.co.kr"], ["중앙일보", "joongang.co.kr"],
  ["SBS NEWS", "news.sbs.co.kr"], ["MBC NEWS", "imnews.imbc.com"], ["한국일보", "hankookilbo.com"],
  ["매일경제", "mk.co.kr"], ["서울경제", "sedaily.com"], ["파이낸셜뉴스", "fnnews.com"],
  ["전자신문", "etnews.com"], ["아이뉴스24", "inews24.com"], ["머니투데이", "mt.co.kr"],
  ["뉴스1", "news1.kr"], ["뉴시스", "newsis.com"], ["오마이뉴스", "ohmynews.com"],
  ["JTBC NEWS", "news.jtbc.co.kr"], ["MBN", "mbn.co.kr"], ["TV조선", "tvchosun.com"],
  ["스포츠조선", "sports.chosun.com"], ["OSEN", "osen.co.kr"], ["게임메카", "gamemeca.com"],
  ["인벤", "inven.co.kr"], ["벤처스퀘어", "venturesquare.net"], ["블로터", "bloter.net"],
].map(([name, domain]) => ({ name, domain }));

const FALLBACK = {
  stand: [
    ["전국 곳곳 늦더위 이어져…도심 속 시민들 저녁 나들이", "연합뉴스"],
    ["오늘부터 달라지는 생활 정책, 꼭 알아둘 핵심 내용", "KBS 뉴스"],
    ["지역과 산업을 잇는 새로운 교통망 논의 본격화", "경향신문"],
    ["소비자 체감물가 안정 위한 현장 점검 확대", "한국경제"],
    ["가을 학기 앞둔 대학가, 청년 지원 프로그램 늘린다", "한겨레"],
    ["주말 문화행사 풍성…전국 공연장 관람객 북적", "YTN"],
  ],
  edit: [
    ["편집국이 고른 오늘의 장면, 변화의 현장을 가다", "중앙일보"],
    ["데이터로 읽는 대한민국의 오늘", "동아일보"],
    ["현장 연결: 지금 가장 주목받는 지역 이슈", "SBS 뉴스"],
    ["기후와 도시, 달라지는 일상의 풍경", "MBC 뉴스"],
    ["세대가 함께 만드는 새로운 동네 실험", "한겨레"],
    ["하루를 정리하는 저녁 종합뉴스", "KBS 뉴스"],
  ],
  ent: [
    ["이번 주 극장가 기대작, 관객과 만날 준비 마쳤다", "연합뉴스"],
    ["새 앨범으로 돌아온 아티스트들의 색다른 변신", "SBS 뉴스"],
    ["OTT 신작 공개…주말 정주행 작품은", "YTN"],
    ["공연계 가을 시즌 개막, 대형 무대 잇따라", "KBS 뉴스"],
    ["화제의 드라마 제작진이 전한 비하인드", "MBC 뉴스"],
    ["K-콘텐츠, 세계 시청자와 접점 넓힌다", "중앙일보"],
  ],
  sports: [
    ["막판 순위 경쟁 뜨거워진 프로야구, 오늘의 빅매치", "KBS 뉴스"],
    ["유럽 무대 누비는 태극전사, 주말 경기 출격", "연합뉴스"],
    ["대표팀 소집 명단 발표…세대교체에 시선", "YTN"],
    ["신예 선수들의 도전, 팬들의 응원 이어져", "SBS 뉴스"],
    ["프로농구 새 시즌 준비 본격화", "MBC 뉴스"],
    ["생활 체육 인구 늘었다…도심 운동 명소 인기", "한겨레"],
  ],
  game: [
    ["하반기 대작 경쟁 시작…국내 게임사 신작 공개", "전자신문"],
    ["e스포츠 결승전 앞두고 팬 열기 고조", "게임메카"],
    ["인디게임 개발자들의 아이디어 축제 열린다", "ZDNET Korea"],
    ["게임 업데이트로 새로워진 세계관과 전투", "인벤"],
    ["콘솔·모바일 경계 허무는 크로스플레이 확산", "블로터"],
    ["AI 기술이 바꾸는 게임 제작 현장", "전자신문"],
  ],
  economy: [
    ["원·달러 환율 변동성 확대…시장 흐름 주목", "한국경제"],
    ["수출 기업 실적 발표 앞두고 증시 관망세", "매일경제"],
    ["생활물가 안정 대책, 현장에선 어떻게", "연합뉴스"],
    ["기술 스타트업 투자 심리 회복 신호", "벤처스퀘어"],
    ["금리 전망에 촉각…가계 대출 전략은", "중앙일보"],
    ["소상공인 디지털 전환 지원 확대", "동아일보"],
  ],
  shopping: [
    ["가을 신상품 출시…유통가 시즌 마케팅 돌입", "매일경제"],
    ["온라인 장보기 경쟁, 배송보다 중요한 것은", "한국경제"],
    ["친환경 포장 찾는 소비자 늘었다", "한겨레"],
    ["백화점 문화센터, 체험형 강좌 확대", "중앙일보"],
    ["중소 브랜드 팝업스토어 인기", "연합뉴스"],
    ["이번 주 알뜰 소비를 위한 가격 정보", "YTN"],
  ],
};

export function fallbackArticles(category) {
  return FALLBACK[category].map(([title, source], index) => ({
    title,
    source,
    link: "#realtime-news",
    pubDate: new Date(Date.now() - index * 17 * 60 * 1000).toISOString(),
    live: false,
  }));
}
