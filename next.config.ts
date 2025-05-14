import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  // webpack(config, {isServer}) {
  //   // Buffer polyfill: 브라우저에서 Buffer 사용 시
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       buffer: require.resolve('buffer/')
  //     }
  //     config.plugins.push(
  //       new (require('webpack').ProvidePlugin)({
  //         Buffer: ['buffer', 'Buffer']
  //       })
  //     )
  //   }
  //   // 캐시 설정: 커스텀 cache 전략 (고급 사용자용)
  //   config.cache = {
  //     // type: 'filesystem'
  //     compression: 'brotli', // 속도 향상을 위한 압축 설정
  //     buildDependencies: {
  //       config: ['./next.config.ts']
  //     }
  //   }
  //   return config
  // }
}

export default nextConfig
