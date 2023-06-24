<template>
  <div class="max-w-md mx-auto my-8">
    <h1 class="text-2xl font-bold mb-6">Welcome</h1>
    <ul class="flex my-6 gap-6">
      <li>
        <NuxtLink to="/" class="text-blue-500">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/test" class="text-blue-500">Test Page</NuxtLink>
      </li>
    </ul>
    <div v-if="!user" class="flex flex-col gap-3">
      <div>You're not logged in</div>
      <div class="flex gap-3">
        <UButton to="/auth/sign-up">Sign Up</UButton>
        <UButton to="/auth/sign-in" variant="ghost">Sign In</UButton>
      </div>
    </div>
    <div v-else class="flex flex-col gap-3">
      <div>You're logged in as {{ user.email }}</div>
      <form @submit.prevent="logout">
        <UButton type="submit">Logout</UButton>
      </form>
    </div>
  </div>
</template>

<script setup>
  import useForm from '~/utilities/form'

  const toast = useToast()
  
  const { $api } = useNuxtApp()
  const headers = useRequestHeaders(['cookie'])
  const { data: user } = await useFetch($api('/auth'), { headers, credentials: 'include' })

  const logoutForm = useForm({}, toast)
  const logout = async () => {
    await logoutForm.value.post($api('/auth/sign-out')) 
    toast.add({ title: 'You have been logged out', timeout: 6000 })
    user.value = null
  }
</script>