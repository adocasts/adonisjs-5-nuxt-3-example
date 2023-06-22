import Errors from "./errors"
import {HttpMethods, Data} from './types'
import {ref} from 'vue'

export default function useForm(defaultData: Data = {}, toast: any) {
  const internal = ref({
    ...defaultData,
    originalData: {...defaultData},
    errors: new Errors(),
    data() {
      return Object
        .keys(internal.value.originalData)
        .reduce((acc, key) => ({
          ...acc,
          // @ts-ignore
          [key]: internal.value[key]
        }), {} as Data)
    },
    formData() {
      return Object
        .keys(internal.value.originalData)
        .reduce((acc, key) => {
          // @ts-ignore
          acc.append(key, internal.value[key])
          return acc
        }, new FormData())
    },
    setValue(data: Object) {
      Object.keys(internal.value.originalData).map(key => {
        //@ts-ignore
        internal.value[key] = data[key]
      })
    },
    reset() {
      //@ts-ignore
      Object.keys(internal.value.originalData).map(key => internal.value[key] = internal.value.originalData[key])
      internal.value.errors.clear()
    },
    post(url: string) {
      return internal.value.submit('post', url)
    },
    put(url: string) {
      return internal.value.submit('put', url)
    },
    patch(url: string) {
      return internal.value.submit('patch', url)
    },
    delete(url: string) {
      return internal.value.submit('delete', url)
    },
    submit(requestType: HttpMethods, url: string) {
      return new Promise(async (resolve, reject) => {
        const response = await fetch(url, {
          method: requestType,
          credentials: "include",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(internal.value.data())
        })

        const data: any = await response.json()

        if (response.ok) {
          internal.value.reset()
          resolve(data)
          return
        }

        if (response.status === 422) {
          internal.value.errors.record(data.validator.errors)
          reject(data.validator.errors)
          return
        }

        if (data?.message) {
          // flash error
          const message = typeof data.message === 'string' ? data.message : data.message.body
          toast.add({ color: 'red', timeout: 6000, title: message })
        }

        reject(data)
      })
    }
  })

  return internal
}
