import {FormError} from './types'

export default class Errors {
  public errors: FormError[] = []

  public has(field: string) {
    return this.errors.some(err => err.field === field)
  }

  public any() {
    return !!this.errors.length
  }

  public get(field: string) {
    return this.errors.find(err => err.field === field)?.message
  }

  public record(errors: FormError[]) {
    this.errors = errors
  }

  public clear(field: string | null = null) {
    if (field) {
      this.errors = this.errors.filter(err => err.field !== field)
      return
    }

    this.errors = []
  }
}
