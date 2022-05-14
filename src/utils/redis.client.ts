import * as redis from 'redis'

export const redisClient = redis.createClient({
    url: process.env.REDIS_ENDPOINT
});

(async () => {
    redisClient.on('error', (err) => console.error(err))
    await redisClient.connect()
})()

export const redisGet = async (key): Promise<string | null> => {
    return await redisClient.get(key)
}

export const redisAdd = async (key, value) => {
    await redisClient.set(key, value)
}

export const redisDel = async (key) => {
    await redisClient.del(key)
}

export const redisExists = async (key): Promise<boolean> => {
    return await redisClient.exists(key) === 1
}

export const redisDelSuffix = async (suffix) => {
    const keys = await redisClient.keys(`${suffix}*`)

    return keys.map(async key => {
        return await redisDel(key)
    })
}