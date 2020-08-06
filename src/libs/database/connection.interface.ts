export interface ConnectionInterface {
    connect<T extends Credentials>(params: DbConnectionParams<T>): Promise<boolean>

    disconnect(): Promise<void>
}

export interface DbConnectionParams<T extends Credentials> {
    host: string
    port: number
    protocol?: string
    instance?: string
    credential?: T
}

interface Credentials {
    type: string
}
export interface BasicCredentials extends Credentials {
    type: 'user-name'
    userName: string
    password: string
}

export interface KeyCredentials extends Credentials {
    type: 'secret-key'
    clientId: string
    key: Map<string, string>
}
