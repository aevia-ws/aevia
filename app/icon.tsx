import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: '#09090b',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
      }}
    >
      {/* Left chevron */}
      <div style={{
        position: 'absolute',
        left: 4,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}>
        <div style={{ width: 3, height: 10, background: '#c0c8d8', transform: 'rotate(-35deg)', transformOrigin: 'bottom center' }} />
        <div style={{ width: 3, height: 10, background: '#c0c8d8', transform: 'rotate(35deg)', transformOrigin: 'top center' }} />
      </div>
      {/* A lettermark */}
      <div style={{
        color: '#d4dce8',
        fontSize: 18,
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: -1,
        fontFamily: 'sans-serif',
      }}>
        A
      </div>
      {/* Right chevron */}
      <div style={{
        position: 'absolute',
        right: 4,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}>
        <div style={{ width: 3, height: 10, background: '#c0c8d8', transform: 'rotate(35deg)', transformOrigin: 'bottom center' }} />
        <div style={{ width: 3, height: 10, background: '#c0c8d8', transform: 'rotate(-35deg)', transformOrigin: 'top center' }} />
      </div>
    </div>,
    { ...size }
  )
}
