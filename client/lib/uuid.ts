// @ts-expect-error
export const uuid = (): string => window.crypto.randomUUID()
