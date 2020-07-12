type contentTypeAlias = 'application/json' | 'text/html'

export function ContentType(type: contentTypeAlias) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        target.setHeader('Content-Type', type)
    }
}
