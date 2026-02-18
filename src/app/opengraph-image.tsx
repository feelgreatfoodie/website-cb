import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Christian Bourlier | Architect. Strategist. Operator.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const interBold = await fetch(
    'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf'
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#2E004B',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Top accent border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(to right, #1E90FF, #E2725B, #00FFFF)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <p
            style={{
              fontSize: '64px',
              fontFamily: 'Inter',
              fontWeight: 700,
              color: '#F8F9FA',
              letterSpacing: '0.05em',
              margin: 0,
            }}
          >
            CHRISTIAN BOURLIER
          </p>
          <p
            style={{
              fontSize: '24px',
              fontFamily: 'Inter',
              fontWeight: 700,
              color: '#1E90FF',
              letterSpacing: '0.15em',
              margin: 0,
            }}
          >
            ARCHITECT · STRATEGIST · OPERATOR
          </p>
          <p
            style={{
              fontSize: '22px',
              fontFamily: 'Inter',
              fontWeight: 700,
              color: '#F8F9FA',
              opacity: 0.6,
              margin: 0,
              marginTop: '12px',
            }}
          >
            I build the system AND close the deal.
          </p>
        </div>

        {/* Bottom accent border */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(to right, #00FFFF, #E2725B, #1E90FF)',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
