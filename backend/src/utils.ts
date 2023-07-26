import GtfsRealtimeBindings from 'gtfs-realtime-bindings'

const base64encode = (s: string) => Buffer.from(s).toString('base64')

const decodeFeedMessage = (buffer: ArrayBuffer) =>
  GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
    new Uint8Array(buffer)
  )

export { base64encode, decodeFeedMessage }
