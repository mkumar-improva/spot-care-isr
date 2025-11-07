import { ImageResponse } from 'next/og';
export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = 'image/png';

export default function TwitterImage() {
  const title = 'SpotCare Healthcare Provider Directory';
  const caption = 'Locate the right care provider in seconds with real-time ISR updates.';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '96px',
          background: '#0B3B60',
          color: '#F8FAFC',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.75,
          }}
        >
          SpotCare
        </div>
        <h1
          style={{
            margin: '32px 0 0 0',
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            marginTop: 24,
            fontSize: 34,
            maxWidth: '75%',
            lineHeight: 1.35,
          }}
        >
          {caption}
        </p>
      </div>
    ),
    {
      ...size,
    },
  );
}
