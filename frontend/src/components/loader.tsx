import ContentLoader from 'react-content-loader';

export const PostLoader = () => (
  <div style={{ width: '78%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh', marginBottom: 55, pointerEvents: 'none' }}>
    <ContentLoader
      viewBox="0 0 947 144"
      height={144}
      width={947}
      foregroundColor={"#E5E7EB"}
      speed={1}
    >
      <circle cx="15" cy="20" r="11" />
      <rect x="40" y="16" rx="5" ry="5" width="90" height="11" />
      <rect x="850" y="16" rx="5" ry="5" width="80" height="11" />
      <rect x="6" y="45" rx="15" ry="15" width="464" height="24" />
      <rect x="6" y="84" rx="7" ry="7" width="400" height="12" />
      <rect x="6" y="102" rx="7" ry="7" width="400" height="12" />
      <rect x="6" y="130" rx="7" ry="7" width="80" height="10" />
    </ContentLoader>
  </div>
)

export const ArticleLoader = () => (
  <div style={{}}>
    <ContentLoader
      viewBox="0 0 1380 432"
      height={432}
      width={1380}
      foregroundColor={"#E5E7EB"}
    >
      <rect x="5" y="35" rx="25" ry="25" width="700" height="55" />

      <rect x="15" y="173" rx="7" ry="7" width="378" height="60" />

      <rect x="475" y="155" rx="10" ry="10" width="700" height="22" />
      <rect x="475" y="185" rx="10" ry="10" width="760" height="22" />
      <rect x="475" y="215" rx="10" ry="10" width="710" height="22" />
      <rect x="475" y="245" rx="10" ry="10" width="750" height="22" />
      <rect x="475" y="275" rx="10" ry="10" width="780" height="22" />
      <rect x="475" y="305" rx="10" ry="10" width="730" height="22" />
      <rect x="475" y="335" rx="10" ry="10" width="340" height="22" />
    </ContentLoader>
  </div>
)