/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        USERNAME: 'serhii3001',
        PASSWORD: 'aT82hHlTExxS4p5L',
        CLUSTERNAME: 'cluster0',
        DATABASE: 'mobile-dev'
      }
    }
  }

  return {
    env: {
      USERNAME: 'serhii3001',
      PASSWORD: 'aT82hHlTExxS4p5L',
      CLUSTERNAME: 'cluster0',
      DATABASE: 'mobile'
    }
  }
}
