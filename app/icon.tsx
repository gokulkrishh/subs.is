import { ImageResponse } from 'next/og'

import { LogoSvg } from '@/components/icons'

export const runtime = 'edge'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(<LogoSvg />, { ...size })
}
