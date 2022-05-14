export interface CorsConfigProperties {
    origin: Array<RegExp> | boolean
    methods: string
    credentials: boolean
}

export type Environment = "development" | "staging" | "test" | "production"

type EnvironmentConfig<T> = Record<Environment, T>

export type CorsConfig = EnvironmentConfig<CorsConfigProperties>

const corsConfig: CorsConfig = {
    development: {
        origin: true,
        methods: "OPTIONS, POST, GET, PUT, DELETE, PATCH",
        credentials: true,
    },
    staging: {
        origin: true,
        methods: "OPTIONS, POST, GET, PUT, DELETE, PATCH",
        credentials: true,
    },
    production: {
        origin: [/delysium\.com$/],
        methods: "OPTIONS, POST, GET, PUT, DELETE, PATCH",
        credentials: true,
    },
    test: {
        origin: true,
        methods: "OPTIONS, POST, GET, PUT, DELETE, PATCH",
        credentials: true,
    },
}

export default corsConfig
