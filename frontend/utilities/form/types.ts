export type HttpMethods = 'post' | 'put' | 'patch' | 'delete' | 'get'

export type FormError = {
  rule: string
  field: string
  message: string
}

export type Data = { [key: string]: any }
