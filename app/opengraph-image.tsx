import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  const title = 'SpotCare Healthcare Provider Directory';
  const caption = 'Search real-time provider availability powered by ISR.';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #053B63 0%, #1A7B96 60%, #5AD2C7 100%)',
          padding: '72px 96px',
          color: '#F8FAFC',
        }}
      >
        <div style={{ fontSize: 42, fontWeight: 500, opacity: 0.9 }}>SpotCare</div>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 86,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              marginTop: 28,
              fontSize: 32,
              fontWeight: 400,
              maxWidth: '70%',
              lineHeight: 1.35,
            }}
          >
            {caption}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
