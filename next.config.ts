import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  webpack(config) {
    config.cache = {
      type: 'filesystem',
      compression: 'gzip', // 속도 향상을 위한 압축 설정
      allowCollectingMemory: true // 메모리 사용 허용
    }
    return config
  }
}

export default nextConfig
